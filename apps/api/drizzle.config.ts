import type { Config } from "drizzle-kit";

// We need to cast because TypeScript's type definitions don't match all available drivers
export default {
  schema: "./src/models/*",
  out: "./migrations",
  dialect: "sqlite",
} satisfies Config;
