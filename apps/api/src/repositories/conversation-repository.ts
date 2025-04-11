import { db } from "../config/db";
import { conversations } from "../models/conversation";
import { eq, and, sql } from "drizzle-orm";
import type { Conversation } from "../types/interfaces/conversation";
import type {
  CreateConversationDto,
  UpdateConversationDto,
} from "../types/dtos/conversation-dto";

export class ConversationRepository {
  async findAll(userId: string): Promise<Conversation[]> {
    return await db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, userId))
      .all();
  }

  async findByBot(userId: string, botId: number): Promise<Conversation[]> {
    return await db
      .select()
      .from(conversations)
      .where(
        and(eq(conversations.userId, userId), eq(conversations.botId, botId))
      )
      .all();
  }

  async findById(id: number): Promise<Conversation | undefined> {
    return await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, id))
      .get();
  }

  async findByIdAndUserId(
    id: number,
    userId: string
  ): Promise<Conversation | undefined> {
    return await db
      .select()
      .from(conversations)
      .where(and(eq(conversations.id, id), eq(conversations.userId, userId)))
      .get();
  }

  async create(
    userId: string,
    data: CreateConversationDto
  ): Promise<Conversation> {
    const insertData = {
      ...data,
      userId: userId,
    };

    const result = await db
      .insert(conversations)
      .values(insertData)
      .returning()
      .get();

    if (!result) {
      throw new Error(
        "Failed to create conversation or retrieve the created record."
      );
    }

    return result;
  }

  async update(
    userId: string,
    id: number,
    data: UpdateConversationDto
  ): Promise<Conversation> {
    const result = await db
      .update(conversations)
      .set({ ...data, updatedAt: sql`(unixepoch())` })
      .where(and(eq(conversations.id, id), eq(conversations.userId, userId)))
      .returning()
      .get();

    if (!result) {
      throw new Error(
        "Failed to update conversation or retrieve the updated record."
      );
    }

    return result;
  }

  async delete(userId: string, id: number): Promise<void> {
    await db
      .delete(conversations)
      .where(and(eq(conversations.id, id), eq(conversations.userId, userId)));
  }
}

export const conversationRepository = new ConversationRepository();
