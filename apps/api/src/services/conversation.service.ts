import { conversationRepository } from "../repositories/conversation-repository";
import { messageRepository } from "../repositories/message-repository";
import type {
  CreateConversationDto,
  UpdateConversationDto,
} from "../types/dtos/conversation-dto";
import type { Conversation } from "../types/interfaces/conversation";
import type { Message } from "../types/interfaces/message";
import { HTTPException } from "hono/http-exception";

export class ConversationService {
  async createConversation(
    userId: string,
    dto: CreateConversationDto
  ): Promise<Conversation> {
    return await conversationRepository.create(userId, dto);
  }

  async getConversations(userId: string): Promise<Conversation[]> {
    return await conversationRepository.findAll(userId);
  }

  async getConversationsByBot(
    userId: string,
    botId: number
  ): Promise<Conversation[]> {
    return await conversationRepository.findByBot(userId, botId);
  }

  async getConversationById(id: number, userId: string): Promise<Conversation> {
    const conversation = await conversationRepository.findByIdAndUserId(
      id,
      userId
    );
    if (!conversation) {
      throw new HTTPException(404, {
        message: "Conversation not found or access denied",
      });
    }
    return conversation;
  }

  async validateConversationBotMatch(
    conversationId: number,
    botId: number,
    userId: string
  ): Promise<Conversation> {
    // Check if conversation exists and belongs to the user
    const conversation = await this.getConversationById(conversationId, userId);

    // Verify that the conversation belongs to the specified bot
    if (conversation.botId !== botId) {
      throw new HTTPException(400, {
        message: `This conversation belongs to bot #${conversation.botId}, not bot #${botId}. Please use the correct bot ID or start a new conversation.`,
      });
    }

    return conversation;
  }

  async getConversationMessages(
    conversationId: number,
    userId: string
  ): Promise<Message[]> {
    // First verify the user has access to this conversation
    await this.getConversationById(conversationId, userId);

    // Then return the messages
    return await messageRepository.findByConversation(conversationId);
  }

  async updateConversation(
    userId: string,
    id: number,
    dto: UpdateConversationDto
  ): Promise<Conversation> {
    const conversation = await conversationRepository.findByIdAndUserId(
      id,
      userId
    );
    if (!conversation) {
      throw new HTTPException(404, {
        message: "Conversation not found or access denied",
      });
    }
    return await conversationRepository.update(userId, id, dto);
  }

  async transferConversationToBot(
    userId: string,
    conversationId: number,
    newBotId: number
  ): Promise<Conversation> {
    // First check if the conversation exists and belongs to the user
    const conversation = await conversationRepository.findByIdAndUserId(
      conversationId,
      userId
    );
    if (!conversation) {
      throw new HTTPException(404, {
        message: "Conversation not found or access denied",
      });
    }

    // Update the conversation with the new bot ID
    return await conversationRepository.update(userId, conversationId, {
      botId: newBotId,
    });
  }

  async deleteConversation(userId: string, id: number): Promise<void> {
    const conversation = await conversationRepository.findByIdAndUserId(
      id,
      userId
    );
    if (!conversation) {
      throw new HTTPException(404, {
        message: "Conversation not found or access denied",
      });
    }

    // First delete all messages in the conversation
    await messageRepository.deleteByConversation(id);

    // Then delete the conversation
    await conversationRepository.delete(userId, id);
  }
}

export const conversationService = new ConversationService();
