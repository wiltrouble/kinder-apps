import type { ReactNode } from "react";

import { AppLayout } from "@/components/shared/appLayout";
import { ProtectedRoute } from "@/components/shared/protectedRoute";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
}
