import { db } from "../config/db";
import { messages } from "../models/message";
import { eq, and } from "drizzle-orm";
import type { Message } from "../types/interfaces/message";
import type { CreateMessageDto } from "../types/dtos/message-dto";

export class MessageRepository {
  async findByConversation(conversationId: number): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .all();
  }

  async create(
    role: "user" | "assistant",
    data: { conversationId: number; content: string }
  ): Promise<Message> {
    const insertData = {
      ...data,
      role,
    };

    const result = await db
      .insert(messages)
      .values(insertData)
      .returning()
      .get();

    if (!result) {
      throw new Error(
        "Failed to create message or retrieve the created record."
      );
    }

    return result;
  }

  async deleteByConversation(conversationId: number): Promise<void> {
    await db
      .delete(messages)
      .where(eq(messages.conversationId, conversationId));
  }
}

export const messageRepository = new MessageRepository();
