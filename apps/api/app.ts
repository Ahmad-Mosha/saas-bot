import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import authController from "./src/controllers/auth-controller";
import botController from "./src/controllers/bot.controller";
import conversationController from "./src/controllers/conversation.controller";
import chatController from "./src/controllers/chat.controller";
import { authMiddleware } from "./src/middleware/auth-middleware";
import { serveStatic } from "hono/bun";
const app = new Hono();

// Middleware
app.use(logger());
app.use(cors());

// Static file middleware for public directory
app.use("/public/*", serveStatic({ root: "./" }));

// Routes
app.get("/", (c) => c.json({ message: "API is running" }));

// Mount auth routes
app.route("/auth", authController);

// Protected routes
app.use("/bots/*", authMiddleware);
app.route("/bots", botController);

app.use("/conversations/*", authMiddleware);
app.route("/conversations", conversationController);

app.use("/chat/*", authMiddleware);
app.route("/chat", chatController);

export default app;
