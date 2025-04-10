/**
 * Core user interface used across the application
 */
export interface User {
  id: number;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  avatar?: string; // Optional avatar URL
}

/**
 * User data shape for UI components that only need basic user info
 */
export interface UserDisplayInfo {
  username: string;
  email: string;
  avatar?: string;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data
 */
export interface RegistrationData {
  username: string;
  email: string;
  password: string;
}

/**
 * Authentication tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Auth API response
 */
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  message: string;
}
