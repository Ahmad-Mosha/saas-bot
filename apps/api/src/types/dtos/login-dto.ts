// create login dto
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty().email("Invalid email address"),
  password: z
    .string()
    .nonempty()
    .min(8, "Password must be at least 8 characters long"),
});

export type LoginDto = z.infer<typeof loginSchema>;
