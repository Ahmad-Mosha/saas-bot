import { z } from "zod";

export const createConversationDto = z.object({
  botId: z.number().positive(),
  title: z.string().optional(),
});

export type CreateConversationDto = z.infer<typeof createConversationDto>;

export const updateConversationDto = z.object({
  title: z.string().min(1).optional(),
  botId: z.number().positive().optional(),
});

export type UpdateConversationDto = z.infer<typeof updateConversationDto>;
