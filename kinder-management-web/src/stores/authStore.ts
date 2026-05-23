import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { authService, type LoginPayload } from "@/services/appwrite/auth";
import type { AuthUser } from "@/types/auth";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

interface AuthActions {
  login: (payload: LoginPayload) => Promise<AuthUser>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<AuthUser | null>;
  setUser: (user: AuthUser | null) => void;
  clearError: () => void;
  reset: () => void;
}

export type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: Boolean(user),
        }),

      clearError: () => set({ error: null }),

      reset: () => set({ ...initialState, isInitialized: true }),

      login: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          await authService.login(payload);
          const user = await authService.getCurrentUser();
          if (!user) {
            throw new Error("Failed to load authenticated user");
          }
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
            error: null,
          });
          return user;
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Login failed";
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isInitialized: true,
            error: message,
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isInitialized: true,
            error: null,
          });
        }
      },

      getCurrentUser: async () => {
        if (get().isLoading) {
          return get().user;
        }
        set({ isLoading: true });
        try {
          const user = await authService.getCurrentUser();
          set({
            user,
            isAuthenticated: Boolean(user),
            isLoading: false,
            isInitialized: true,
            error: null,
          });
          return user;
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Failed to load user";
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isInitialized: true,
            error: message,
          });
          return null;
        }
      },
    }),
    {
      name: "kinder:auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
