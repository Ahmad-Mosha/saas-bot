import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Bot } from "../types/interfaces/bot";
import type { Message } from "../types/interfaces/message";
import { HTTPException } from "hono/http-exception";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

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
        return "gemini-2.5-pro-preview-03-25";
      default:
        return "gemini-2.0-flash";
    }
  }

  /**
   * Create a system prompt for the bot
   */
  private createSystemPrompt(bot: Bot): string {
    let systemPrompt = `You are ${bot.name}, ${bot.description}. `;

    // Add the custom prompt instructions if provided
    if (bot.promptInstructions) {
      systemPrompt += bot.promptInstructions;
    } else {
      systemPrompt += "You are a helpful assistant.";
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

    // Create chat generation config
    const generationConfig = {
      temperature: 0.7,
      maxOutputTokens: 1000,
    };

    // Create chat options
    const chatOptions: any = { generationConfig };

    // Add the bot's identity/prompt as the first message instead of using systemInstruction
    // This is more compatible across Gemini models
    const botIdentityMessage = {
      role: "user",
      parts: [
        { text: `${systemPrompt}\n\nPlease acknowledge these instructions.` },
      ],
    };

    const botAcknowledgment = {
      role: "model",
      parts: [
        {
          text: `I understand. I'll act as ${bot.name}, ${bot.description}, and follow the provided instructions.`,
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
      const { chat } = this.buildChat(bot, existingMessages);

      // Create the chat and send the message
      const result = await chat.sendMessage(message);
      return result.response.text();
    } catch (error) {
      console.error("Gemini API error:", error);
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
}

export const geminiService = new GeminiService();
