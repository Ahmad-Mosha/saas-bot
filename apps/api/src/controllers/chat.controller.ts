import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { chatService } from "../services/chat.service";
import { conversationService } from "../services/conversation.service";
import { HTTPException } from "hono/http-exception";

type Variables = {
  userId: string;
};

// Message DTO with just the content field for URL-based routes
const messageContentDto = z.object({
  message: z.string().min(1),
});

const chatController = new Hono<{
  Variables: Variables;
}>();

// Send a chat message to a specific bot (new conversation)
chatController.post(
  "/bot/:botId",
  zValidator("json", messageContentDto),
  async (c) => {
    try {
      const userId = c.var.userId;
      const botIdParam = c.req.param("botId");
      const botId = parseInt(botIdParam, 10);

      if (isNaN(botId)) {
        return c.json({ error: "Invalid bot ID" }, 400);
      }

      const { message } = c.req.valid("json");

      const result = await chatService.processMessage(userId, {
        botId,
        message,
      });

      return c.json(result);
    } catch (error: any) {
      if (error instanceof HTTPException) {
        return error.getResponse();
      }
      console.error("Error in chat endpoint:", error);
      return c.json({ error: "Internal server error" }, 500);
    }
  }
);

// Continue a conversation with a specific bot
chatController.post(
  "/bot/:botId/conversation/:conversationId",
  zValidator("json", messageContentDto),
  async (c) => {
    try {
      const userId = c.var.userId;
      const botIdParam = c.req.param("botId");
      const conversationIdParam = c.req.param("conversationId");

      const botId = parseInt(botIdParam, 10);
      const conversationId = parseInt(conversationIdParam, 10);

      if (isNaN(botId) || isNaN(conversationId)) {
        return c.json({ error: "Invalid ID parameters" }, 400);
      }

      const { message } = c.req.valid("json");

      // Use the ChatService to process the message
      const result = await chatService.processMessage(userId, {
        botId,
        conversationId,
        message,
      });

      return c.json(result);
    } catch (error: any) {
      if (error instanceof HTTPException) {
        return error.getResponse();
      }
      console.error("Error in chat endpoint:", error);
      return c.json({ error: "Internal server error" }, 500);
    }
  }
);

// Get messages for a specific conversation
chatController.get("/conversation/:conversationId/messages", async (c) => {
  try {
    const userId = c.var.userId;
    const conversationIdParam = c.req.param("conversationId");
    const conversationId = parseInt(conversationIdParam, 10);

    if (isNaN(conversationId)) {
      return c.json({ error: "Invalid conversation ID" }, 400);
    }

    // Get messages from a conversation (with authorization check in service)
    const messages = await conversationService.getConversationMessages(
      conversationId,
      userId
    );

    return c.json(messages);
  } catch (error) {
    if (error instanceof HTTPException) {
      return error.getResponse();
    }
    console.error("Error fetching messages:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default chatController;
