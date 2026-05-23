"use client";

import { useEffect, type ReactNode } from "react";

import { useAuthStore } from "@/stores/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    void getCurrentUser();
  }, [isInitialized, getCurrentUser]);

  return <>{children}</>;
};
