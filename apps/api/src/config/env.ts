import { config } from "dotenv";

config();

export const ENV = {
  JWT_SECRET:
    process.env.JWT_SECRET ?? "your-default-secret-key-for-development",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "1d",
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET ?? "your-default-refresh-secret-key",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ?? "7d",
};
