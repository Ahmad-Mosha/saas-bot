import { db } from "../config/db";
import { users } from "../models/user";
import { eq } from "drizzle-orm";
import type { User } from "../types/interfaces/user";
import type { UserDto } from "../types/dtos/user-dto";

export class UserRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    return await db.select().from(users).where(eq(users.email, email)).get();
  }

  async findById(id: number): Promise<User | undefined> {
    return await db.select().from(users).where(eq(users.id, id)).get();
  }

  async create(userData: UserDto, hashedPassword: string): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    if (!user) {
      throw new Error("Failed to create user");
    }
    return user;
  }
}

export const userRepository = new UserRepository();
