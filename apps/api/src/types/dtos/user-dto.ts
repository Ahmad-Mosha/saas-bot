import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .nonempty()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
  email: z.string().nonempty().email("Invalid email address"),
  password: z
    .string()
    .nonempty()
    .min(8, "Password must be at least 8 characters long"),
});

export type UserDto = z.infer<typeof userSchema>;
