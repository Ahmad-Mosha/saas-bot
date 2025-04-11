import { botRepository } from "../repositories/bot-repository";
import type { BotDto, UpdateBotDto } from "../types/dtos/bot-dto";
import type { Bot } from "../types/interfaces/bot";
import { HTTPException } from "hono/http-exception"; // Import for error handling

export class BotService {
  async createBot(userId: string, botDto: BotDto): Promise<Bot> {
    return await botRepository.create(userId, botDto);
  }

  async getBots(userId: string): Promise<Bot[]> {
    return await botRepository.findAll(userId);
  }

  async getBotById(id: number, userId: string): Promise<Bot> {
    const bot = await botRepository.findByIdAndUserId(id, userId);
    if (!bot) {
      throw new HTTPException(404, {
        message: "Bot not found or access denied",
      });
    }
    return bot;
  }

  async updateBot(
    userId: string,
    id: number,
    botDto: UpdateBotDto
  ): Promise<Bot> {
    const bot = await botRepository.findByIdAndUserId(id, userId);
    if (!bot) {
      throw new HTTPException(404, {
        message: "Bot not found or access denied",
      });
    }
    return await botRepository.update(userId, id, botDto);
  }

  async deleteBot(userId: string, id: number): Promise<void> {
    const bot = await botRepository.findByIdAndUserId(id, userId);
    if (!bot) {
      throw new HTTPException(404, {
        message: "Bot not found or access denied",
      });
    }
    await botRepository.delete(userId, id);
  }
}

export const botService = new BotService();
