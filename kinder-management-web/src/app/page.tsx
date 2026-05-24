"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { FullPageLoader } from "@/components/shared/fullPageLoader";
import { useAuth } from "@/hooks/useAuth";
import { routes } from "@/lib/routes";

export default function RootPage() {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized) return;
    router.replace(isAuthenticated ? routes.dashboard : routes.login);
  }, [isInitialized, isAuthenticated, router]);

  return <FullPageLoader message="Loading workspace..." />;
}
