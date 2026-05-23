"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { FullPageLoader } from "@/components/shared/FullPageLoader";
import { routes } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

export default function RootPage() {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized) return;
    router.replace(isAuthenticated ? routes.dashboard : routes.login);
  }, [isInitialized, isAuthenticated, router]);

  return <FullPageLoader message="Loading workspace..." />;
}
