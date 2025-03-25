import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user-repository";
import { AUTH_CONSTANTS } from "../constants/app.constants";
import { ENV } from "../config/env";
import type { UserDto } from "../types/dtos/user-dto";
import type { User } from "../types/interfaces/user";
import type { LoginDto } from "../types/dtos/login-dto";

export class AuthService {
  generateAccessToken(userId: number): string {
    const payload = { userId };
    const secret = Buffer.from(ENV.JWT_SECRET);
    const options = { expiresIn: ENV.JWT_EXPIRES_IN as any };
    return jwt.sign(payload, secret, options);
  }

  generateRefreshToken(userId: number): string {
    const payload = { userId };
    const secret = Buffer.from(ENV.JWT_REFRESH_SECRET);
    const options = { expiresIn: ENV.JWT_REFRESH_EXPIRES_IN as any };
    return jwt.sign(payload, secret, options);
  }

  // Verify JWT token
  verifyAccessToken(token: string): { userId: number } {
    try {
      const secret = Buffer.from(ENV.JWT_SECRET);
      const decoded = jwt.verify(token, secret) as { userId: number };
      return decoded;
    } catch (error) {
      throw new Error(AUTH_CONSTANTS.UNAUTHORIZED_MESSAGE);
    }
  }

  // Verify refresh token
  verifyRefreshToken(token: string): { userId: number } {
    try {
      const secret = Buffer.from(ENV.JWT_REFRESH_SECRET);
      const decoded = jwt.verify(token, secret) as {
        userId: number;
      };
      return decoded;
    } catch (error) {
      throw new Error(AUTH_CONSTANTS.UNAUTHORIZED_MESSAGE);
    }
  }

  // Register a new user
  async register(userDto: UserDto): Promise<{
    user: Omit<User, "password">;
    accessToken: string;
    refreshToken: string;
  }> {
    // Check if user already exists
    const existingUser = await userRepository.findByEmail(userDto.email);

    if (existingUser) {
      throw new Error(AUTH_CONSTANTS.USER_EXISTS);
    }

    // Hash password
    const hashedPassword = await hash(userDto.password, 10);

    // Create user
    const user = await userRepository.create(userDto, hashedPassword);

    // Generate tokens
    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, accessToken, refreshToken };
  }

  // Login user
  async login(loginDto: LoginDto): Promise<{
    user: Omit<User, "password">;
    accessToken: string;
    refreshToken: string;
  }> {
    // Find user
    const user = await userRepository.findByEmail(loginDto.email);

    if (!user) {
      throw new Error(AUTH_CONSTANTS.INVALID_CREDENTIALS);
    }

    // Verify password
    const isPasswordValid = await compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new Error(AUTH_CONSTANTS.INVALID_CREDENTIALS);
    }

    // Generate tokens
    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    console.log(userWithoutPassword);
    console.log(password);

    return { user: userWithoutPassword, accessToken, refreshToken };
  }

  // Refresh token
  async refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { userId } = this.verifyRefreshToken(refreshToken);

    // Generate new tokens
    const newAccessToken = this.generateAccessToken(userId);
    const newRefreshToken = this.generateRefreshToken(userId);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  // Get current user
  async getCurrentUser(userId: number): Promise<Omit<User, "password">> {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}

export const authService = new AuthService();
