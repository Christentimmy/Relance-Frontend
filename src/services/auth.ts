import { API_BASE_URL, API_ENDPOINTS } from "./config";

export type UserRole = "buyer" | "seller" | "admin" | "super_admin";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  message?: string;
  role?: UserRole;
}

export interface StoredUser {
  id: string;
  role: UserRole;
}

export const authService = {
  setToken(token: string): void {
    localStorage.setItem("token", token);
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  removeToken(): void {
    localStorage.removeItem("token");
  },

  setRole(role: UserRole): void {
    localStorage.setItem("userRole", role);
  },

  getRole(): UserRole | null {
    const role = localStorage.getItem("userRole") as UserRole;
    return role || null;
  },

  removeRole(): void {
    localStorage.removeItem("userRole");
  },

  clearAuth(): void {
    this.removeToken();
    this.removeRole();
  },

  async isAuthenticated(): Promise<boolean> {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.VALIDATE_TOKEN}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        return true;
      }

      // Token is invalid, clear it
      this.clearAuth();
      return false;
    } catch (error) {
      // If validation fails, assume token is invalid
      this.clearAuth();
      return false;
    }
  },

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
          message: errorData.message || "Login failed",
        };
      }

      const data = await response.json();

      if (data.token && data.role) {
        this.setToken(data.token);
        this.setRole(data.role);
      }

      return data;
    } catch (error) {
      return {
        message:
          error instanceof Error ? error.message : "Network error occurred",
      };
    }
  },
};
