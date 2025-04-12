import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Bot } from "../types/interfaces/bot";
import type { Message } from "../types/interfaces/message";
import { HTTPException } from "hono/http-exception";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Helper function to delay execution
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Export genAI for use in other services
export { genAI };

export class GeminiService {
  /**
   * Get the appropriate Gemini model based on bot type
   */
  private getModelByBotType(botType: string): string {
    switch (botType) {
      case "chat":
        return "gemini-2.0-flash";
      case "image":
        return "gemini-2.0-flash-exp-image-generation";
      case "code":
        return "gemini-1.5-pro";
      default:
        return "gemini-2.0-flash";
    }
  }

  /**
   * Create a system prompt for the bot
   */
  private createSystemPrompt(bot: Bot): string {
    let systemPrompt = `You are ${bot.name}, ${bot.description}. `;

    // For code bots, always include the coding-specific instructions
    if (bot.botType === "code") {
      const codingInstructions = `You are a specialized coding assistant. Your primary purpose is to help with programming tasks, explain algorithms, generate code, and solve coding problems. 

When asked about coding topics, you should:
1. Write clean, efficient, and well-documented code
2. Explain programming concepts clearly
3. Debug and fix issues when presented with code problems
4. Provide implementation advice and follow best practices
5. Generate complete, working solutions when requested

You should focus exclusively on providing useful coding assistance and technical information.`;

      // Add the custom prompt instructions if provided
      if (bot.promptInstructions && bot.promptInstructions.trim()) {
        systemPrompt += `${bot.promptInstructions}\n\n${codingInstructions}`;
      } else {
        systemPrompt += codingInstructions;
      }
    } else {
      // For non-code bots, use the normal approach
      if (bot.promptInstructions && bot.promptInstructions.trim()) {
        systemPrompt += bot.promptInstructions;
      } else {
        systemPrompt += "You are a helpful assistant.";
      }
    }

    return systemPrompt;
  }

  /**
   * Build a chat with history and system prompt
   */
  private buildChat(bot: Bot, existingMessages: Message[] = []) {
    // Get the appropriate model
    const modelName = this.getModelByBotType(bot.botType);
    const model = genAI.getGenerativeModel({ model: modelName });

    // Create a system prompt with the bot's information
    const systemPrompt = this.createSystemPrompt(bot);
    console.log(`Using model: ${modelName} for bot type: ${bot.botType}`);

    // Create chat generation config
    const generationConfig = {
      temperature: bot.botType === "code" ? 0.2 : 0.7, // Lower temperature for code bots for more precise outputs
      maxOutputTokens: bot.botType === "code" ? 2048 : 1000, // Larger output for code bots
    };

    // Create chat options
    const chatOptions: any = { generationConfig };

    // Add the bot's identity/prompt as the first message instead of using systemInstruction
    // This is more compatible across Gemini models
    const botIdentityMessage = {
      role: "user",
      parts: [
        { text: `${systemPrompt}\n\nPlease confirm you understand your role.` },
      ],
    };

    const botAcknowledgment = {
      role: "model",
      parts: [
        {
          text: `I understand my role${
            bot.botType === "code" ? " as a specialized coding assistant" : ""
          }. I'll act as ${bot.name}, ${
            bot.description
          }, and follow the provided instructions.`,
        },
      ],
    };

    // Initialize chat with identity messages
    if (existingMessages.length === 0) {
      // No history, just use the bot identity
      chatOptions.history = [botIdentityMessage, botAcknowledgment];
    } else {
      // Include conversation history (limited to last 20 messages to avoid token limits)
      const recentMessages = existingMessages.slice(-20);
      const history = recentMessages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

      // Prepend bot identity to existing history for context
      chatOptions.history = [botIdentityMessage, botAcknowledgment, ...history];
    }

    return { chat: model.startChat(chatOptions), model };
  }

  /**
   * Generate a response using the Gemini API
   * @param bot The bot to use for generating the response
   * @param message The user's message
   * @param existingMessages Optional array of existing messages for context
   * @returns The AI-generated response text
   */
  async generateResponse(
    bot: Bot,
    message: string,
    existingMessages: Message[] = []
  ): Promise<string> {
    try {
      console.log(
        `Generating response for bot type: ${
          bot.botType
        }, model: ${this.getModelByBotType(bot.botType)}`
      );
      console.log(
        `System prompt: ${this.createSystemPrompt(bot).substring(0, 100)}...`
      );
      console.log(`User message: ${message.substring(0, 100)}...`);

      const { chat } = this.buildChat(bot, existingMessages);

      // Create the chat and send the message
      const result = await chat.sendMessage(message);
      const responseText = result.response.text();

      // Log response info
      console.log(`Response received, length: ${responseText.length}`);
      if (!responseText || responseText.length === 0) {
        console.warn("Empty response received from Gemini API");
      }

      return responseText;
    } catch (error) {
      console.error("Gemini API error details:", error);

      // Log more details about the error
      if (error instanceof Error) {
        console.error(`Error name: ${error.name}`);
        console.error(`Error message: ${error.message}`);
        console.error(`Error stack: ${error.stack}`);

        if ("status" in error) {
          console.error(`Error status: ${(error as any).status}`);
        }
      }

      throw new HTTPException(500, {
        message: "Error communicating with the AI model",
      });
    }
  }

  /**
   * Generate a streaming response using the Gemini API
   * @param bot The bot to use for generating the response
   * @param message The user's message
   * @param existingMessages Optional array of existing messages for context
   * @returns A readable stream of text chunks
   */
  async generateStreamingResponse(
    bot: Bot,
    message: string,
    existingMessages: Message[] = []
  ): Promise<ReadableStream<string>> {
    try {
      const { chat } = this.buildChat(bot, existingMessages);

      // Create a streaming response
      const result = await chat.sendMessageStream(message);

      // Transform the stream to provide text chunks
      return new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of result.stream) {
              const text = chunk.text();
              if (text) {
                controller.enqueue(text);
              }
            }
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      });
    } catch (error) {
      console.error("Gemini API streaming error:", error);
      throw new HTTPException(500, {
        message: "Error with streaming response from AI model",
      });
    }
  }

  /**
   * Generate an image using the Gemini API with retries
   * @param bot The bot to use for generating the image
   * @param prompt The user's prompt for image generation
   * @returns An object containing the image data as base64 and related metadata
   */
  async generateImage(
    bot: Bot,
    prompt: string
  ): Promise<{ imageData: string; mimeType: string }> {
    // Maximum number of retries
    const maxRetries = 3;
    let lastError: any = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // If this is a retry, add a delay to respect rate limits
        if (attempt > 1) {
          const delayMs = 1000 * attempt; // Exponential backoff: 1s, 2s, 3s
          console.log(
            `Retry attempt ${attempt}/${maxRetries}, waiting ${delayMs}ms...`
          );
          await delay(delayMs);
        }

        // Use the image generation model
        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash-exp-image-generation",
        });

        // Set up generation config for image generation
        const generationConfig = {
          responseModalities: ["Text", "Image"],
          temperature: 0.7,
          maxOutputTokens: 1000,
        };

        // Generate the image
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig,
        });

        // Log the full response structure to help diagnose issues
        console.log(
          "Gemini API response structure:",
          JSON.stringify({
            hasResponse: !!result.response,
            hasCandidates: !!result.response?.candidates,
            candidatesLength: result.response?.candidates?.length || 0,
            firstCandidateHasContent:
              !!result.response?.candidates?.[0]?.content,
          })
        );

        // Extract the image from the response
        const response = result.response;
        const candidates = response.candidates || [];

        if (candidates.length === 0 || !candidates[0]?.content) {
          // Check if there are any error messages or finish reasons
          if (candidates.length > 0 && candidates[0]?.finishReason) {
            const finishReason = candidates[0].finishReason;

            // Special handling for safety filters
            if (String(finishReason).includes("SAFETY")) {
              throw new Error(
                "Image generation was blocked by safety filters. Please modify your prompt to avoid potentially sensitive content. Avoid descriptions of people (especially children), realistic faces, violence, or controversial subjects."
              );
            }

            throw new Error(
              `Response generation finished with reason: ${finishReason}`
            );
          }
          throw new Error("No valid response was generated");
        }

        // Look for the image part containing inlineData (as shown in the Google sample)
        const imagePart = candidates[0]?.content?.parts.find(
          (part) =>
            part.inlineData && part.inlineData.mimeType?.startsWith("image/")
        );

        if (!imagePart || !imagePart.inlineData) {
          console.log(
            "Content parts available:",
            candidates[0]?.content?.parts?.map((part) =>
              Object.keys(part).join(",")
            )
          );
          throw new Error("No image was generated in the response");
        }

        // Successfully generated an image, return it
        return {
          imageData: imagePart.inlineData.data,
          mimeType: imagePart.inlineData.mimeType,
        };
      } catch (error) {
        lastError = error;
        const errorMsg =
          error instanceof Error ? error.message : "Unknown error";
        console.error(`Attempt ${attempt}/${maxRetries} failed: ${errorMsg}`);

        // Only retry on specific errors that might be resolved with a retry
        // If it's not a rate limit/quota issue and we're on the last retry, don't try again
        const isRateLimitError =
          errorMsg.includes("quota") ||
          errorMsg.includes("rate") ||
          errorMsg.includes("limit") ||
          errorMsg.includes("No valid response") ||
          errorMsg.includes("No image was generated");

        if (!isRateLimitError && attempt === maxRetries) {
          break;
        }
      }
    }

    // If we get here, all retries have failed
    const errorMsg =
      lastError instanceof Error
        ? lastError.message
        : "Unknown error after multiple retries";
    console.error("All image generation attempts failed:", lastError);

    // Check for specific error types
    if (
      errorMsg.includes("quota") ||
      errorMsg.includes("rate") ||
      errorMsg.includes("limit")
    ) {
      throw new HTTPException(429, {
        message: "API rate limit or quota exceeded. Please try again later.",
      });
    } else if (errorMsg.includes("safety") || errorMsg.includes("SAFETY")) {
      throw new HTTPException(400, {
        message: errorMsg,
      });
    }

    throw new HTTPException(500, {
      message: "Error generating image with AI model: " + errorMsg,
    });
  }
}

export const geminiService = new GeminiService();
