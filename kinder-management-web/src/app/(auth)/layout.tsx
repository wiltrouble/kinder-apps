import type { ReactNode } from "react";

import { GuestGuard } from "@/components/shared/guestGuard";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <GuestGuard>{children}</GuestGuard>;
}
