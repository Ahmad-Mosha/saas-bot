import type { InferSelectModel } from "drizzle-orm";
import { messages } from "../../models/message";

export type Message = InferSelectModel<typeof messages>;
