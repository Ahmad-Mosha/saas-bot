import { z } from "zod";

export const createMessageDto = z.object({
  conversationId: z.number().positive(),
  content: z.string().min(1),
});

export type CreateMessageDto = z.infer<typeof createMessageDto>;

export const chatMessageDto = z.object({
  botId: z.number().positive(),
  conversationId: z.number().positive().optional(),
  message: z.string().min(1),
});

export type ChatMessageDto = z.infer<typeof chatMessageDto>;
