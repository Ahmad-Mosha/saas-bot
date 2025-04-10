import { getAuthToken } from "../utils/auth"; // Assuming an auth utility exists
import type { Bot, NewBot } from "@/types/bot"; // Assuming types are defined here

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Or your backend URL

// Helper function for authenticated API requests
async function fetchAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAuthToken(); // Fetch token
  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // Add token if available
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Attempt to parse error message from backend
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      // Ignore if response is not JSON
    }
    const errorMessage =
      errorData?.message || `HTTP error! status: ${response.status}`;
    const error = new Error(errorMessage);
    (error as any).status = response.status;
    (error as any).data = errorData; // Attach full error data if available
    throw error;
  }

  return response;
}

// --- Bot CRUD API Calls ---

export async function createBotApi(
  botData: Omit<NewBot, "id" | "userId" | "createdAt" | "updatedAt">
): Promise<Bot> {
  const response = await fetchAuth("/api/bots", {
    method: "POST",
    body: JSON.stringify(botData),
  });
  return response.json();
}

export async function getUserBotsApi(): Promise<Bot[]> {
  const response = await fetchAuth("/api/bots");
  return response.json();
}

export async function getBotByIdApi(botId: number): Promise<Bot> {
  const response = await fetchAuth(`/api/bots/${botId}`);
  return response.json();
}

export async function updateBotApi(
  botId: number,
  botData: Partial<Omit<Bot, "id" | "userId" | "createdAt" | "updatedAt">>
): Promise<Bot> {
  const response = await fetchAuth(`/api/bots/${botId}`, {
    method: "PUT",
    body: JSON.stringify(botData),
  });
  return response.json();
}

export async function deleteBotApi(botId: number): Promise<void> {
  await fetchAuth(`/api/bots/${botId}`, {
    method: "DELETE",
  });
  // DELETE requests typically return 204 No Content, so no JSON to parse
}

// --- Bot Interaction API Call ---

interface InteractionPayload {
  message: string;
  history?: { role: "user" | "model"; parts: { text: string }[] }[];
}

// Adjust return type based on expected backend response structure
interface InteractionResponse {
  response: any; // Could be string for chat, object/URL for image
}

export async function interactWithBotApi(
  botId: number,
  payload: InteractionPayload
): Promise<InteractionResponse> {
  const response = await fetchAuth(`/api/bots/${botId}/interact`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return response.json();
}
