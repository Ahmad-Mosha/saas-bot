import type { InferSelectModel } from "drizzle-orm";
import { conversations } from "../../models/conversation";

export type Conversation = InferSelectModel<typeof conversations>;
