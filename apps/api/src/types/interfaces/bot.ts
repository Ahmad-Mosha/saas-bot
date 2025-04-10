import type { InferSelectModel } from "drizzle-orm";
import { bots } from "../../models/bot";

export type Bot = InferSelectModel<typeof bots>;
