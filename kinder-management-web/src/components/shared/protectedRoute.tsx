"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { FullPageLoader } from "@/components/shared/fullPageLoader";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { routes } from "@/lib/routes";
import type { Permission } from "@/types/role";

interface ProtectedRouteProps {
  children: ReactNode;
  permissions?: Permission | Permission[];
  mode?: "any" | "all";
  fallback?: ReactNode;
}

const normalize = (value: Permission | Permission[] | undefined): Permission[] =>
  Array.isArray(value) ? value : value ? [value] : [];

export const ProtectedRoute = ({
  children,
  permissions: requiredPermissions,
  mode = "any",
  fallback,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuth();
  const { canAny, canAll } = usePermissions();

  const required = normalize(requiredPermissions);
  const isAuthorized =
    required.length === 0 ||
    (mode === "all" ? canAll(required) : canAny(required));

  useEffect(() => {
    if (!isInitialized) return;
    if (!isAuthenticated) {
      router.replace(routes.login);
      return;
    }
    if (!isAuthorized) {
      router.replace(routes.unauthorized);
    }
  }, [isInitialized, isAuthenticated, isAuthorized, router]);

  if (!isInitialized) {
    return fallback ?? <FullPageLoader message="Checking your session..." />;
  }

  if (!isAuthenticated) {
    return fallback ?? <FullPageLoader message="Redirecting to sign in..." />;
  }

  if (!isAuthorized) {
    return fallback ?? <FullPageLoader message="Checking permissions..." />;
  }

  return <>{children}</>;
};
