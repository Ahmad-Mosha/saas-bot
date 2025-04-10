/**
 * Authentication service for handling user authentication operations
 */
import { apiClient } from "./api-client";
import {
  User,
  AuthTokens,
  LoginCredentials,
  RegistrationData,
  AuthResponse,
} from "@/types/auth";

/**
 * Auth service responsible for handling authentication operations
 */
class AuthService {
  private readonly ACCESS_TOKEN_KEY = "accessToken";
  private readonly REFRESH_TOKEN_KEY = "refreshToken";
  private readonly USER_KEY = "user";

  /**
   * Login a user with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/login",
        credentials
      );

      // Store auth data
      this.setTokens(response.accessToken, response.refreshToken);
      this.setUser(response.user);

      return response;
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }

  /**
   * Register a new user
   */
  async register(data: RegistrationData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/register",
        data
      );

      // Store auth data
      this.setTokens(response.accessToken, response.refreshToken);
      this.setUser(response.user);

      return response;
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }

  /**
   * Logout the current user
   */
  logout(): void {
    this.clearAuth();
    // If we had a server-side logout endpoint, we would call it here
  }

  /**
   * Get the current authenticated user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      // Try to get user from local storage first
      const storedUser = this.getUser();
      if (storedUser) {
        return storedUser;
      }

      // If no user in storage but we have a token, fetch from API
      if (this.isAuthenticated()) {
        const response = await apiClient.get<{ user: User }>("/auth/me");
        this.setUser(response.user);
        return response.user;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Refresh the access token using the refresh token
   */
  async refreshToken(): Promise<AuthTokens | null> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) return null;

      const response = await apiClient.post<AuthTokens>("/auth/refresh-token", {
        refreshToken,
      });

      this.setTokens(response.accessToken, response.refreshToken);
      return response;
    } catch (error) {
      this.clearAuth();
      return null;
    }
  }

  /**
   * Check if the user is authenticated (has valid token)
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  /**
   * Get the access token
   */
  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Get the refresh token
   */
  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Get the current user from local storage
   */
  getUser(): User | null {
    if (typeof window === "undefined") return null;

    const userJson = localStorage.getItem(this.USER_KEY);
    if (!userJson) return null;

    try {
      return JSON.parse(userJson);
    } catch (error) {
      return null;
    }
  }

  /**
   * Store authentication tokens in local storage
   */
  private setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === "undefined") return;

    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  /**
   * Store user data in local storage
   */
  private setUser(user: User): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Clear all authentication data
   */
  private clearAuth(): void {
    if (typeof window === "undefined") return;

    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}

// Export as a singleton instance
export const authService = new AuthService();
