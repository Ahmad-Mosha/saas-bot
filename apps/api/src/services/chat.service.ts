import { botService } from "./bot.service";
import { geminiService } from "./gemini.service";
import { messageRepository } from "../repositories/message-repository";
import { conversationService } from "./conversation.service";
import type { Bot } from "../types/interfaces/bot";
import type { Message } from "../types/interfaces/message";
import type { Conversation } from "../types/interfaces/conversation";
import { HTTPException } from "hono/http-exception";
import type { ChatMessageDto } from "../types/dtos/message-dto";

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
}

export const chatService = new ChatService();
