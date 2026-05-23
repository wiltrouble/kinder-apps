"use client";

import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";

import { AuthProvider } from "./AuthProvider";
import { QueryProvider } from "./QueryProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </AuthProvider>
    </QueryProvider>
  );
};
