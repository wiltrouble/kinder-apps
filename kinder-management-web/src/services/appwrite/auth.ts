import { AppwriteException } from "appwrite";

import {
  mapAppwriteUser,
  type AppwriteSession,
  type AuthUser,
} from "@/types/auth";

import { account } from "./client";

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

export const authService = {
  async login({ email, password }: LoginPayload): Promise<AppwriteSession> {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw toError(error, "Invalid email or password");
    }
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const user = await account.get();
      return mapAppwriteUser(user);
    } catch (error) {
      if (
        error instanceof AppwriteException &&
        (error.code === 401 || error.type === "general_unauthorized_scope")
      ) {
        return null;
      }
      return null;
    }
  },

  async logout(): Promise<void> {
    try {
      await account.deleteSession("current");
    } catch (error) {
      throw toError(error, "Failed to log out");
    }
  },
};

export type AuthService = typeof authService;
