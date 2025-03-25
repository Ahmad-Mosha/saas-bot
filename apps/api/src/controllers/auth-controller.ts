import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { authService } from "../services/auth-service";
import { userSchema } from "../types/dtos/user-dto";
import { loginSchema } from "../types/dtos/login-dto";
import { authMiddleware } from "../middleware/auth-middleware";
import { AUTH_CONSTANTS } from "../constants/app.constants";

// Define custom types for the context
type Variables = {
  userId: number;
};

// Create controller with context type
const authController = new Hono<{
  Variables: Variables;
}>();

// Register a new user
authController.post("/register", zValidator("json", userSchema), async (c) => {
  try {
    const userData = await c.req.json();
    const { user, accessToken, refreshToken } = await authService.register(
      userData
    );

    return c.json(
      {
        message: AUTH_CONSTANTS.USER_CREATED,
        user,
        accessToken,
        refreshToken,
      },
      201
    );
  } catch (error) {
    return c.json(
      {
        message: error instanceof Error ? error.message : "Registration failed",
      },
      400
    );
  }
});

// Login
authController.post("/login", zValidator("json", loginSchema), async (c) => {
  try {
    const loginData = await c.req.json();
    const { user, accessToken, refreshToken } = await authService.login(
      loginData
    );

    return c.json({
      message: AUTH_CONSTANTS.LOGIN_SUCCESS,
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return c.json(
      {
        message: error instanceof Error ? error.message : "Login failed",
      },
      401
    );
  }
});

// Refresh token
authController.post("/refresh-token", async (c) => {
  try {
    const { refreshToken } = await c.req.json();

    if (!refreshToken) {
      return c.json({ message: "Refresh token is required" }, 400);
    }

    const tokens = await authService.refreshToken(refreshToken);

    return c.json(tokens);
  } catch (error) {
    return c.json(
      {
        message:
          error instanceof Error ? error.message : "Token refresh failed",
      },
      401
    );
  }
});

// Get current user (protected route)
authController.get("/me", authMiddleware, async (c) => {
  try {
    const userId = c.get("userId");
    const user = await authService.getCurrentUser(userId);

    return c.json({ user });
  } catch (error) {
    return c.json(
      {
        message: error instanceof Error ? error.message : "Failed to get user",
      },
      400
    );
  }
});

export default authController;
