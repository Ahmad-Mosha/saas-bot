import { db } from "../config/db";
import { bots } from "../models/bot";
import { eq, and, sql } from "drizzle-orm";
import type { Bot } from "../types/interfaces/bot";
import type { BotDto, UpdateBotDto } from "../types/dtos/bot-dto";

export class BotRepository {
  async findAll(userId: string): Promise<Bot[]> {
    return await db.select().from(bots).where(eq(bots.userId, userId)).all();
  }

  async findById(id: number): Promise<Bot | undefined> {
    return await db.select().from(bots).where(eq(bots.id, id)).get();
  }

  async findByIdAndUserId(
    id: number,
    userId: string
  ): Promise<Bot | undefined> {
    return await db
      .select()
      .from(bots)
      .where(and(eq(bots.id, id), eq(bots.userId, userId)))
      .get();
  }

  async create(userId: string, data: BotDto): Promise<Bot> {
    const insertData = {
      ...data,
      userId: userId,
    };

    const result = await db.insert(bots).values(insertData).returning().get();

    if (!result) {
      throw new Error("Failed to create bot or retrieve the created record.");
    }

    return result;
  }

  async update(userId: string, id: number, data: UpdateBotDto): Promise<Bot> {
    const result = await db
      .update(bots)
      .set({ ...data, updatedAt: sql`(unixepoch())` })
      .where(and(eq(bots.id, id), eq(bots.userId, userId)))
      .returning()
      .get();

    if (!result) {
      throw new Error("Failed to update bot or retrieve the updated record.");
    }

    return result;
  }

  async delete(userId: string, id: number): Promise<void> {
    await db.delete(bots).where(and(eq(bots.id, id), eq(bots.userId, userId)));
  }
}

export const botRepository = new BotRepository();
