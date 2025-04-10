import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import authController from "./src/controllers/auth-controller";
import botController from "./src/controllers/bot.controller";
import { authMiddleware } from "./src/middleware/auth-middleware";
const app = new Hono();

// Middleware
app.use(logger());
app.use(cors());

// Static file middleware for public directory

// Routes
app.get("/", (c) => c.json({ message: "API is running" }));

// Mount auth routes
app.route("/auth", authController);

app.use("/bots/*", authMiddleware);
app.route("/bots", botController);

// Mount bot routes

export default app;
