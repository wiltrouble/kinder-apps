"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { routes } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

import { FullPageLoader } from "./FullPageLoader";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace(routes.login);
    }
  }, [isInitialized, isAuthenticated, router]);

  if (!isInitialized || !isAuthenticated) {
    return <FullPageLoader message="Checking your session..." />;
  }

  return <>{children}</>;
};
