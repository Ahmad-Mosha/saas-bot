import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import authController from "./src/controllers/auth-controller";

const app = new Hono();

// Middleware
app.use(logger());
app.use(cors());

// Routes
app.get("/", (c) => c.json({ message: "API is running" }));

// Mount auth routes
app.route("/auth", authController);

export default app;
