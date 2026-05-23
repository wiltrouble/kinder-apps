"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { routes } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

import { FullPageLoader } from "./FullPageLoader";

interface GuestGuardProps {
  children: ReactNode;
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.replace(routes.dashboard);
    }
  }, [isInitialized, isAuthenticated, router]);

  if (!isInitialized) {
    return <FullPageLoader message="Loading..." />;
  }

  if (isAuthenticated) {
    return <FullPageLoader message="Redirecting..." />;
  }

  return <>{children}</>;
};
