import type { MiddlewareHandler } from "hono";
import { authService } from "../services/auth-service";
import { AUTH_CONSTANTS } from "../constants/app.constants";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  try {
    // Get authorization header
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith(AUTH_CONSTANTS.BEARER_PREFIX)) {
      return c.json({ message: AUTH_CONSTANTS.UNAUTHORIZED_MESSAGE }, 401);
    }

    // Extract token from header
    const token = authHeader.substring(AUTH_CONSTANTS.BEARER_PREFIX.length);

    // Verify token
    const { userId } = authService.verifyAccessToken(token);

    // Set userId in context
    c.set("userId", userId);

    await next();
  } catch (error) {
    return c.json(
      {
        message:
          error instanceof Error
            ? error.message
            : AUTH_CONSTANTS.UNAUTHORIZED_MESSAGE,
      },
      401
    );
  }
};
