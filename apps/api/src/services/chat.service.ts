import { botService } from "./bot.service";
import { geminiService, genAI } from "./gemini.service";
import { storageService } from "./storage.service";
import { messageRepository } from "../repositories/message-repository";
import { conversationService } from "./conversation.service";
import type { Bot } from "../types/interfaces/bot";
import type { Message } from "../types/interfaces/message";
import type { Conversation } from "../types/interfaces/conversation";
import { HTTPException } from "hono/http-exception";
import type {
  ChatMessageDto,
  ImageGenerationDto,
  CodeGenerationDto,
} from "../types/dtos/message-dto";

export class ChatService {
  /**
   * Handle a chat message with a bot
   * @param userId The user ID
   * @param chatDto The chat data (botId, message, and optional conversationId)
   * @returns The chat response with bot, conversation, and messages
   */
  async processMessage(
    userId: string,
    chatDto: ChatMessageDto
  ): Promise<{
    response: string;
    bot: Bot;
    conversation?: Conversation;
    messages?: Message[];
  }> {
    const { botId, conversationId, message } = chatDto;

    // Get the bot to determine its type and history setting
    const bot = await botService.getBotById(botId, userId);

    let conversation: Conversation | undefined;
    let savedUserMessage: Message | undefined;
    let allMessages: Message[] = [];

    try {
      // Handle conversation based on history setting
      if (bot.enableHistory) {
        if (conversationId) {
          // Validate existing conversation
          conversation = await conversationService.validateConversationBotMatch(
            conversationId,
            botId,
            userId
          );

          // Retrieve existing messages for context
          const existingMessages = await messageRepository.findByConversation(
            conversationId
          );
          allMessages = [...existingMessages];

          // Save user message
          savedUserMessage = await messageRepository.create("user", {
            conversationId,
            content: message,
          });

          if (savedUserMessage) {
            allMessages.push(savedUserMessage);
          }
        } else {
          // Create a new conversation
          conversation = await conversationService.createConversation(userId, {
            botId,
            title:
              message.substring(0, 30) + (message.length > 30 ? "..." : ""),
          });

          // Save user message to the new conversation
          if (conversation) {
            savedUserMessage = await messageRepository.create("user", {
              conversationId: conversation.id,
              content: message,
            });

            if (savedUserMessage) {
              allMessages.push(savedUserMessage);
            }
          }
        }
      }

      // Get AI response from Gemini Service
      const aiResponse = await geminiService.generateResponse(
        bot,
        message,
        bot.enableHistory ? allMessages : []
      );

      // If history is enabled, save assistant response
      if (bot.enableHistory && conversation) {
        const savedAssistantMessage = await messageRepository.create(
          "assistant",
          {
            conversationId: conversation.id,
            content: aiResponse,
          }
        );

        if (savedAssistantMessage) {
          allMessages.push(savedAssistantMessage);
        }
      }

      return {
        response: aiResponse,
        bot,
        conversation: bot.enableHistory ? conversation : undefined,
        messages: bot.enableHistory ? allMessages : undefined,
      };
    } catch (error) {
      console.error("Chat service error:", error);
      if (error instanceof HTTPException) {
        throw error;
      }
      throw new HTTPException(500, {
        message: "Error processing chat message",
      });
    }
  }

  /**
   * Process a streaming chat message with a bot
   * Returns a readable stream of text chunks along with conversation info
   */
  async processStreamingMessage(
    userId: string,
    chatDto: ChatMessageDto
  ): Promise<{
    responseStream: ReadableStream<string>;
    bot: Bot;
    conversation?: Conversation;
    savedUserMessage?: Message;
    finalizeChat: () => Promise<void>; // Function to finalize chat (save assistant response)
  }> {
    const { botId, conversationId, message } = chatDto;

    // Get the bot to determine its type and history setting
    const bot = await botService.getBotById(botId, userId);

    let conversation: Conversation | undefined;
    let savedUserMessage: Message | undefined;
    let allMessages: Message[] = [];
    let completeResponse = "";

    try {
      // Handle conversation based on history setting
      if (bot.enableHistory) {
        if (conversationId) {
          // Validate existing conversation
          conversation = await conversationService.validateConversationBotMatch(
            conversationId,
            botId,
            userId
          );

          // Retrieve existing messages for context
          const existingMessages = await messageRepository.findByConversation(
            conversationId
          );
          allMessages = [...existingMessages];

          // Save user message
          savedUserMessage = await messageRepository.create("user", {
            conversationId,
            content: message,
          });

          if (savedUserMessage) {
            allMessages.push(savedUserMessage);
          }
        } else {
          // Create a new conversation
          conversation = await conversationService.createConversation(userId, {
            botId,
            title:
              message.substring(0, 30) + (message.length > 30 ? "..." : ""),
          });

          // Save user message to the new conversation
          if (conversation) {
            savedUserMessage = await messageRepository.create("user", {
              conversationId: conversation.id,
              content: message,
            });

            if (savedUserMessage) {
              allMessages.push(savedUserMessage);
            }
          }
        }
      }

      // Get streaming response from Gemini Service
      const responseStream = await geminiService.generateStreamingResponse(
        bot,
        message,
        bot.enableHistory ? allMessages : []
      );

      // Create a new stream that collects the complete response while passing through chunks
      const transformedStream = new TransformStream<string, string>({
        transform(chunk, controller) {
          // Collect the complete response for saving later
          completeResponse += chunk;
          // Pass the chunk through
          controller.enqueue(chunk);
        },
      });

      // Chain the streams
      const finalStream = responseStream.pipeThrough(transformedStream);

      // Create a function to finalize the chat (save the assistant's message)
      const finalizeChat = async () => {
        if (bot.enableHistory && conversation) {
          await messageRepository.create("assistant", {
            conversationId: conversation.id,
            content: completeResponse,
          });
        }
      };

      return {
        responseStream: finalStream,
        bot,
        conversation: bot.enableHistory ? conversation : undefined,
        savedUserMessage,
        finalizeChat,
      };
    } catch (error) {
      console.error("Chat service streaming error:", error);
      if (error instanceof HTTPException) {
        throw error;
      }
      throw new HTTPException(500, {
        message: "Error processing streaming chat message",
      });
    }
  }

  /**
   * Process an image generation request with a bot
   * @param userId The user ID
   * @param imageDto The image generation data (botId, prompt, and optional conversationId)
   * @returns The image generation response with bot, conversation, and messages
   */
  async processImageGeneration(
    userId: string,
    imageDto: { botId: number; prompt: string; conversationId?: number }
  ): Promise<{
    imageUrl: string;
    bot: Bot;
    conversation?: Conversation;
    messages?: Message[];
  }> {
    const { botId, conversationId, prompt } = imageDto;

    // Get the bot to validate it's an image generation bot
    const bot = await botService.getBotById(botId, userId);

    // Verify this is an image bot
    if (bot.botType !== "image") {
      throw new HTTPException(400, {
        message: "This bot does not support image generation",
      });
    }

    let conversation: Conversation | undefined;
    let savedUserMessage: Message | undefined;
    let allMessages: Message[] = [];

    try {
      // Handle conversation based on history setting
      if (bot.enableHistory) {
        if (conversationId) {
          // Validate existing conversation
          conversation = await conversationService.validateConversationBotMatch(
            conversationId,
            botId,
            userId
          );

          // Retrieve existing messages for context
          const existingMessages = await messageRepository.findByConversation(
            conversationId
          );
          allMessages = [...existingMessages];

          // Save user message (prompt)
          savedUserMessage = await messageRepository.create("user", {
            conversationId,
            content: prompt,
          });

          if (savedUserMessage) {
            allMessages.push(savedUserMessage);
          }
        } else {
          // Create a new conversation
          conversation = await conversationService.createConversation(userId, {
            botId,
            title: prompt.substring(0, 30) + (prompt.length > 30 ? "..." : ""),
          });

          // Save user message to the new conversation
          if (conversation) {
            savedUserMessage = await messageRepository.create("user", {
              conversationId: conversation.id,
              content: prompt,
            });

            if (savedUserMessage) {
              allMessages.push(savedUserMessage);
            }
          }
        }
      }

      // Enhance the prompt based on bot's configuration before generating the image
      let enhancedPrompt = prompt;

      // If the bot has custom instructions, use them to enhance the prompt
      if (bot.promptInstructions && bot.promptInstructions.trim() !== "") {
        // First get a text response from the chat model to refine the prompt
        const chatModel = genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
        });
        const systemMessage = `You are ${bot.name}, ${bot.description}. ${bot.promptInstructions}`;

        const refinePromptRequest = `${systemMessage}\n\nBased on my instructions, convert this user's prompt into a detailed image generation prompt: "${prompt}"\n\nGive ONLY the refined prompt with no explanations or additional text.`;

        try {
          const refinedPromptResponse = await chatModel.generateContent(
            refinePromptRequest
          );
          const refinedPrompt = refinedPromptResponse.response.text().trim();

          // Only use the refined prompt if it's not empty
          if (refinedPrompt) {
            enhancedPrompt = refinedPrompt;
          }
        } catch (error) {
          console.warn(
            "Failed to refine prompt with instructions, using original prompt",
            error
          );
          // Continue with original prompt if refinement fails
        }
      }

      // Generate the image using Gemini with the enhanced prompt
      const imageResult = await geminiService.generateImage(
        bot,
        enhancedPrompt
      );

      // Save the image to storage
      const storageResult = await storageService.saveBase64Image(
        imageResult.imageData,
        imageResult.mimeType,
        userId
      );

      // If history is enabled, save the assistant response with the image URL
      if (bot.enableHistory && conversation) {
        const savedAssistantMessage = await messageRepository.create(
          "assistant",
          {
            conversationId: conversation.id,
            content: "Generated image based on your prompt",
            mediaType: "image",
            mediaUrl: storageResult.fileUrl,
          }
        );

        if (savedAssistantMessage) {
          allMessages.push(savedAssistantMessage);
        }
      }

      return {
        imageUrl: storageResult.fileUrl,
        bot,
        conversation: bot.enableHistory ? conversation : undefined,
        messages: bot.enableHistory ? allMessages : undefined,
      };
    } catch (error) {
      console.error("Image generation service error:", error);
      if (error instanceof HTTPException) {
        throw error;
      }
      throw new HTTPException(500, {
        message: "Error generating image",
      });
    }
  }

  /**
   * Process a code generation request with a bot
   * @param userId The user ID
   * @param codeDto The code data (botId, message, and optional conversationId)
   * @returns The code response with bot, conversation, and messages
   */
  async processCodeGeneration(
    userId: string,
    codeDto: { botId: number; message: string; conversationId?: number }
  ): Promise<{
    response: string;
    bot: Bot;
    conversation?: Conversation;
    messages?: Message[];
  }> {
    const { botId, conversationId, message } = codeDto;

    // Get the bot to validate it's a code generation bot
    const bot = await botService.getBotById(botId, userId);

    // Verify this is a code bot
    if (bot.botType !== "code") {
      throw new HTTPException(400, {
        message: "This bot does not support code generation",
      });
    }

    let conversation: Conversation | undefined;
    let savedUserMessage: Message | undefined;
    let allMessages: Message[] = [];

    try {
      // Handle conversation based on history setting
      if (bot.enableHistory) {
        if (conversationId) {
          // Validate existing conversation
          conversation = await conversationService.validateConversationBotMatch(
            conversationId,
            botId,
            userId
          );

          // Retrieve existing messages for context
          const existingMessages = await messageRepository.findByConversation(
            conversationId
          );
          allMessages = [...existingMessages];

          // Save user message
          savedUserMessage = await messageRepository.create("user", {
            conversationId,
            content: message,
          });

          if (savedUserMessage) {
            allMessages.push(savedUserMessage);
          }
        } else {
          // Create a new conversation
          conversation = await conversationService.createConversation(userId, {
            botId,
            title:
              message.substring(0, 30) + (message.length > 30 ? "..." : ""),
          });

          // Save user message to the new conversation
          if (conversation) {
            savedUserMessage = await messageRepository.create("user", {
              conversationId: conversation.id,
              content: message,
            });

            if (savedUserMessage) {
              allMessages.push(savedUserMessage);
            }
          }
        }
      }

      // Get AI response from Gemini Service
      const aiResponse = await geminiService.generateResponse(
        bot,
        message,
        bot.enableHistory ? allMessages : []
      );

      // If history is enabled, save assistant response
      if (bot.enableHistory && conversation) {
        const savedAssistantMessage = await messageRepository.create(
          "assistant",
          {
            conversationId: conversation.id,
            content: aiResponse,
          }
        );

        if (savedAssistantMessage) {
          allMessages.push(savedAssistantMessage);
        }
      }

      return {
        response: aiResponse,
        bot,
        conversation: bot.enableHistory ? conversation : undefined,
        messages: bot.enableHistory ? allMessages : undefined,
      };
    } catch (error) {
      console.error("Code generation service error:", error);
      if (error instanceof HTTPException) {
        throw error;
      }
      throw new HTTPException(500, {
        message: "Error generating code",
      });
    }
  }

  /**
   * Process a streaming code generation request with a bot
   * @param userId The user ID
   * @param codeDto The code data (botId, message, and optional conversationId)
   * @returns The streaming response with bot, conversation, and finalize function
   */
  async processStreamingCodeGeneration(
    userId: string,
    codeDto: { botId: number; message: string; conversationId?: number }
  ): Promise<{
    responseStream: ReadableStream<string>;
    bot: Bot;
    conversation?: Conversation;
    savedUserMessage?: Message;
    finalizeChat: () => Promise<void>;
  }> {
    const { botId, conversationId, message } = codeDto;

    // Get the bot to validate it's a code generation bot
    const bot = await botService.getBotById(botId, userId);

    // Verify this is a code bot
    if (bot.botType !== "code") {
      throw new HTTPException(400, {
        message: "This bot does not support code generation",
      });
    }

    let conversation: Conversation | undefined;
    let savedUserMessage: Message | undefined;
    let allMessages: Message[] = [];
    let completeResponse = "";

    try {
      // Handle conversation based on history setting
      if (bot.enableHistory) {
        if (conversationId) {
          // Validate existing conversation
          conversation = await conversationService.validateConversationBotMatch(
            conversationId,
            botId,
            userId
          );

          // Retrieve existing messages for context
          const existingMessages = await messageRepository.findByConversation(
            conversationId
          );
          allMessages = [...existingMessages];

          // Save user message
          savedUserMessage = await messageRepository.create("user", {
            conversationId,
            content: message,
          });

          if (savedUserMessage) {
            allMessages.push(savedUserMessage);
          }
        } else {
          // Create a new conversation
          conversation = await conversationService.createConversation(userId, {
            botId,
            title:
              message.substring(0, 30) + (message.length > 30 ? "..." : ""),
          });

          // Save user message to the new conversation
          if (conversation) {
            savedUserMessage = await messageRepository.create("user", {
              conversationId: conversation.id,
              content: message,
            });

            if (savedUserMessage) {
              allMessages.push(savedUserMessage);
            }
          }
        }
      }

      // Get streaming response from Gemini Service
      const responseStream = await geminiService.generateStreamingResponse(
        bot,
        message,
        bot.enableHistory ? allMessages : []
      );

      // Create a new stream that collects the complete response while passing through chunks
      const transformedStream = new TransformStream<string, string>({
        transform(chunk, controller) {
          // Collect the complete response for saving later
          completeResponse += chunk;
          // Pass the chunk through
          controller.enqueue(chunk);
        },
      });

      // Chain the streams
      const finalStream = responseStream.pipeThrough(transformedStream);

      // Create a function to finalize the chat (save the assistant's message)
      const finalizeChat = async () => {
        if (bot.enableHistory && conversation) {
          await messageRepository.create("assistant", {
            conversationId: conversation.id,
            content: completeResponse,
          });
        }
      };

      return {
        responseStream: finalStream,
        bot,
        conversation: bot.enableHistory ? conversation : undefined,
        savedUserMessage,
        finalizeChat,
      };
    } catch (error) {
      console.error("Code generation streaming error:", error);
      if (error instanceof HTTPException) {
        throw error;
      }
      throw new HTTPException(500, {
        message: "Error processing streaming code generation",
      });
    }
  }
}

export const chatService = new ChatService();
