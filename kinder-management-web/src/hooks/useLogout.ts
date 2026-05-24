"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuthStore } from "@/stores/authStore";
import { routes } from "@/lib/routes";

interface UseLogoutOptions {
  redirectTo?: string;
  onSuccess?: () => void;
  silent?: boolean;
}

interface UseLogoutReturn {
  logout: () => Promise<void>;
  isLoggingOut: boolean;
}

export const useLogout = (options: UseLogoutOptions = {}): UseLogoutReturn => {
  const router = useRouter();
  const storeLogout = useAuthStore((state) => state.logout);
  const clearSession = useAuthStore((state) => state.clearSession);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { redirectTo = routes.login, onSuccess, silent = false } = options;

  const logout = useCallback(async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await storeLogout();
      if (!silent) {
        toast.success("Signed out");
      }
      onSuccess?.();
      router.replace(redirectTo);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to sign out";
      if (!silent) {
        toast.error("Sign out failed", { description: message });
      }
      clearSession();
      router.replace(redirectTo);
    } finally {
      setIsLoggingOut(false);
    }
  }, [
    isLoggingOut,
    storeLogout,
    clearSession,
    silent,
    onSuccess,
    router,
    redirectTo,
  ]);

  return { logout, isLoggingOut };
};
