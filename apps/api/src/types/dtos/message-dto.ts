import { z } from "zod";

export const createMessageDto = z.object({
  conversationId: z.number().positive(),
  content: z.string().min(1),
  mediaType: z.enum(["none", "image"]).optional().default("none"),
  mediaUrl: z.string().optional(),
});

export type CreateMessageDto = z.infer<typeof createMessageDto>;

export const chatMessageDto = z.object({
  botId: z.number().positive(),
  conversationId: z.number().positive().optional(),
  message: z.string().min(1),
});

export type ChatMessageDto = z.infer<typeof chatMessageDto>;

export const imageGenerationDto = z.object({
  conversationId: z.number().positive().optional(),
  prompt: z.string().min(1),
});

export type ImageGenerationDto = z.infer<typeof imageGenerationDto>;

export const codeGenerationDto = z.object({
  conversationId: z.number().positive().optional(),
  message: z.string().min(1),
});

export type CodeGenerationDto = z.infer<typeof codeGenerationDto>;
