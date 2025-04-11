import { Hono } from "hono";
import { botService } from "../services/bot.service";
import { zValidator } from "@hono/zod-validator";
import { botDto, updateBotDto } from "../types/dtos/bot-dto";
import { HTTPException } from "hono/http-exception";

type Variables = {
  userId: string;
};

const botController = new Hono<{
  Variables: Variables;
}>();

botController.post("/", zValidator("json", botDto), async (c) => {
  const userId = c.var.userId;
  const validatedData = c.req.valid("json");
  const newBot = await botService.createBot(userId, validatedData);
  return c.json(newBot, 201);
});

botController.get("/", async (c) => {
  const userId = c.var.userId;
  const bots = await botService.getBots(userId);
  return c.json(bots);
});

botController.get("/:id", async (c) => {
  const userId = c.var.userId;
  const idParam = c.req.param("id");

  const id = parseInt(idParam, 10);
  if (isNaN(id)) {
    return c.json({ error: "Invalid bot ID parameter" }, 400);
  }

  try {
    const bot = await botService.getBotById(id, userId);
    return c.json(bot);
  } catch (error: any) {
    if (error instanceof HTTPException) {
      return error.getResponse();
    }
    console.error("Error fetching bot:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

botController.put("/:id", zValidator("json", updateBotDto), async (c) => {
  const userId = c.var.userId;
  const idParam = c.req.param("id");
  const id = parseInt(idParam, 10);
  const validatedData = c.req.valid("json");
  const updatedBot = await botService.updateBot(userId, id, validatedData);
  return c.json(updatedBot);
});

botController.delete("/:id", async (c) => {
  const userId = c.var.userId;
  const idParam = c.req.param("id");
  const id = parseInt(idParam, 10);
  await botService.deleteBot(userId, id);
  return c.json({ message: "Bot deleted successfully" }, 200);
});

export default botController;
