import type { ReactNode } from "react";

import { AuthGuard } from "@/components/shared/AuthGuard";
import { DashboardSidebar } from "@/components/shared/DashboardSidebar";
import { TopNavbar } from "@/components/shared/TopNavbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen w-full bg-muted/30">
        <DashboardSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopNavbar />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
