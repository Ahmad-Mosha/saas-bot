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
}

export const chatService = new ChatService();
