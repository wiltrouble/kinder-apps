import { AppwriteException } from "appwrite";

import { account } from "@/services/appwrite/client";
import { usersService } from "@/services/appwrite/users";
import {
  mapAppwriteAccountUser,
  type AppwriteSession,
  type AuthContext,
} from "@/types/auth";

export interface LoginPayload {
  email: string;
  password: string;
}

const toError = (error: unknown, fallbackMessage: string): Error => {
  if (error instanceof AppwriteException) {
    return new Error(error.message || fallbackMessage);
  }
  if (error instanceof Error) {
    return error;
  }
  return new Error(fallbackMessage);
};

const isUnauthorized = (error: unknown): boolean =>
  error instanceof AppwriteException &&
  (error.code === 401 || error.type === "general_unauthorized_scope");

export const authService = {
  async login({ email, password }: LoginPayload): Promise<AppwriteSession> {
    try {
      return await account.createEmailPasswordSession({ email, password });
    } catch (error) {
      throw toError(error, "Invalid email or password");
    }
  },

  async logout(): Promise<void> {
    try {
      await account.deleteSession({ sessionId: "current" });
    } catch (error) {
      if (isUnauthorized(error)) return;
      throw toError(error, "Failed to log out");
    }
  },

  async getCurrentUser(): Promise<AuthContext | null> {
    let accountUser;
    try {
      accountUser = await account.get();
    } catch (error) {
      if (isUnauthorized(error)) return null;
      if (process.env.NODE_ENV !== "production") {
        console.error("[auth] account.get failed", error);
      }
      return null;
    }

    const user = mapAppwriteAccountUser(accountUser);

    try {
      const { role, permissions } = await usersService.fetchUserContext(
        user.id,
      );
      return { user, role, permissions };
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[auth] failed to load user context; continuing without role",
          error,
        );
      }
      return { user, role: null, permissions: [] };
    }
  },
};

export type AuthService = typeof authService;
