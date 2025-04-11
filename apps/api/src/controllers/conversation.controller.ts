import { Hono } from "hono";
import { conversationService } from "../services/conversation.service";
import { zValidator } from "@hono/zod-validator";
import {
  createConversationDto,
  updateConversationDto,
} from "../types/dtos/conversation-dto";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

type Variables = {
  userId: string;
};

const conversationController = new Hono<{
  Variables: Variables;
}>();

// Transfer DTO
const transferConversationDto = z.object({
  botId: z.number().positive(),
});

conversationController.post(
  "/",
  zValidator("json", createConversationDto),
  async (c) => {
    const userId = c.var.userId;
    const validatedData = c.req.valid("json");
    const newConversation = await conversationService.createConversation(
      userId,
      validatedData
    );
    return c.json(newConversation, 201);
  }
);

conversationController.get("/", async (c) => {
  const userId = c.var.userId;
  const botIdParam = c.req.query("botId");

  let conversations;
  if (botIdParam) {
    const botId = parseInt(botIdParam, 10);
    if (isNaN(botId)) {
      return c.json({ error: "Invalid bot ID parameter" }, 400);
    }
    conversations = await conversationService.getConversationsByBot(
      userId,
      botId
    );
  } else {
    conversations = await conversationService.getConversations(userId);
  }

  return c.json(conversations);
});

conversationController.get("/:id", async (c) => {
  const userId = c.var.userId;
  const idParam = c.req.param("id");

  const id = parseInt(idParam, 10);
  if (isNaN(id)) {
    return c.json({ error: "Invalid conversation ID parameter" }, 400);
  }

  try {
    const conversation = await conversationService.getConversationById(
      id,
      userId
    );
    return c.json(conversation);
  } catch (error: any) {
    if (error instanceof HTTPException) {
      return error.getResponse();
    }
    console.error("Error fetching conversation:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Transfer a conversation to a different bot
conversationController.post(
  "/:id/transfer",
  zValidator("json", transferConversationDto),
  async (c) => {
    const userId = c.var.userId;
    const idParam = c.req.param("id");
    const id = parseInt(idParam, 10);

    if (isNaN(id)) {
      return c.json({ error: "Invalid conversation ID parameter" }, 400);
    }

    const { botId } = c.req.valid("json");

    try {
      const updatedConversation =
        await conversationService.transferConversationToBot(userId, id, botId);
      return c.json({
        message: "Conversation successfully transferred to new bot",
        conversation: updatedConversation,
      });
    } catch (error: any) {
      if (error instanceof HTTPException) {
        return error.getResponse();
      }
      console.error("Error transferring conversation:", error);
      return c.json({ error: "Internal server error" }, 500);
    }
  }
);

conversationController.put(
  "/:id",
  zValidator("json", updateConversationDto),
  async (c) => {
    const userId = c.var.userId;
    const idParam = c.req.param("id");
    const id = parseInt(idParam, 10);
    const validatedData = c.req.valid("json");

    try {
      const updatedConversation = await conversationService.updateConversation(
        userId,
        id,
        validatedData
      );
      return c.json(updatedConversation);
    } catch (error: any) {
      if (error instanceof HTTPException) {
        return error.getResponse();
      }
      console.error("Error updating conversation:", error);
      return c.json({ error: "Internal server error" }, 500);
    }
  }
);

conversationController.delete("/:id", async (c) => {
  const userId = c.var.userId;
  const idParam = c.req.param("id");
  const id = parseInt(idParam, 10);

  try {
    await conversationService.deleteConversation(userId, id);
    return c.json({ message: "Conversation deleted successfully" }, 200);
  } catch (error: any) {
    if (error instanceof HTTPException) {
      return error.getResponse();
    }
    console.error("Error deleting conversation:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default conversationController;
