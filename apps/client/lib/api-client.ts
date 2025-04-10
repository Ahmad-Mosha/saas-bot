/**
 * API Client for making HTTP requests to the backend
 */

// Default API URL - assuming the API is running on port 3000
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Default request options
const defaultOptions: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Core fetch wrapper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Merge default options with provided options
  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // Add auth token to headers if available
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    mergedOptions.headers = {
      ...mergedOptions.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, mergedOptions);
    const data = await response.json();

    // Check if response is not OK (status outside 200-299 range)
    if (!response.ok) {
      // Special case for login errors - don't redirect, just throw the error
      if (endpoint === "/auth/login" && response.status === 401) {
        throw new Error(data.message || "Invalid email or password");
      }

      // For other 401 errors, clear auth and redirect
      if (response.status === 401) {
        // Unauthorized - clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Only redirect if in browser context
        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        }
      }

      throw new Error(data.message || "An error occurred");
    }

    return data;
  } catch (error) {
    // Enhance error with additional context
    if (error instanceof Error) {
      throw error; // Just re-throw the original error with its message
    }
    throw new Error("Unknown API error occurred");
  }
}

// API client with convenience methods for different HTTP verbs
export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit): Promise<T> =>
    fetchApi<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> =>
    fetchApi<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> =>
    fetchApi<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestInit): Promise<T> =>
    fetchApi<T>(endpoint, { ...options, method: "DELETE" }),

  patch: <T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> =>
    fetchApi<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),
};
