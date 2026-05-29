import { API_BASE_URL, API_ENDPOINTS } from "./config";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  error?: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          error: errorData.message || "Login failed",
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        error:
          error instanceof Error ? error.message : "Network error occurred",
      };
    }
  },
};
