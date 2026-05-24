import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { authService, type LoginPayload } from "@/services/appwrite/auth";
import type { AuthContext, AuthUser } from "@/types/auth";
import type { Permission, Role } from "@/types/role";

interface AuthState {
  user: AuthUser | null;
  role: Role | null;
  permissions: Permission[];
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

interface AuthActions {
  login: (payload: LoginPayload) => Promise<AuthContext>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<AuthContext | null>;
  clearSession: () => void;
  setAuthContext: (context: AuthContext | null) => void;
  clearError: () => void;
}

export type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  role: null,
  permissions: [],
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
};

const applyContext = (context: AuthContext | null): Partial<AuthState> => ({
  user: context?.user ?? null,
  role: context?.role ?? null,
  permissions: context?.permissions ?? [],
  isAuthenticated: Boolean(context?.user),
});

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setAuthContext: (context) =>
        set({
          ...applyContext(context),
          isInitialized: true,
          error: null,
        }),

      clearError: () => set({ error: null }),

      clearSession: () =>
        set({
          ...initialState,
          isInitialized: true,
        }),

      login: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          await authService.login(payload);
          const context = await authService.getCurrentUser();
          if (!context) {
            throw new Error("Failed to load authenticated user");
          }
          set({
            ...applyContext(context),
            isLoading: false,
            isInitialized: true,
            error: null,
          });
          return context;
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Login failed";
          set({
            ...initialState,
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
            ...initialState,
            isInitialized: true,
          });
        }
      },

      getCurrentUser: async () => {
        if (get().isLoading) {
          const { user, role, permissions } = get();
          return user ? { user, role, permissions } : null;
        }
        set({ isLoading: true });
        try {
          const context = await authService.getCurrentUser();
          set({
            ...applyContext(context),
            isLoading: false,
            isInitialized: true,
            error: null,
          });
          return context;
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Failed to load user";
          set({
            ...initialState,
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
        role: state.role,
        permissions: state.permissions,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
