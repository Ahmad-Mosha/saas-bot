import { z } from "zod";

export const botDto = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  botType: z.enum(["chat", "image", "code"]),
  promptInstructions: z.string().optional().default("Helpful assistant"),
  integrationType: z.enum(["icon", "page"]),
  enableHistory: z.boolean().optional().default(false),
});

export type BotDto = z.infer<typeof botDto>;
export const updateBotDto = botDto.partial();
export type UpdateBotDto = z.infer<typeof updateBotDto>;