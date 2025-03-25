import { users } from "../../models/user";
import type { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;

