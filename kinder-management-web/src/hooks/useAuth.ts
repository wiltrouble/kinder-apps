"use client";

import { useAuthStore } from "@/stores/authStore";

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const error = useAuthStore((state) => state.error);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);
  const clearError = useAuthStore((state) => state.clearError);

  return {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    error,
    login,
    logout,
    getCurrentUser,
    clearError,
  };
};

export type UseAuthReturn = ReturnType<typeof useAuth>;
