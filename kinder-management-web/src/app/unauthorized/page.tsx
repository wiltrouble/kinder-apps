"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldOff } from "lucide-react";

import { BrandMark } from "@/components/shared/brandMark";
import { LogoutButton } from "@/components/shared/logoutButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { routes } from "@/lib/routes";

export default function UnauthorizedPage() {
  const router = useRouter();
  const { user, role } = useAuth();

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--muted)_0%,transparent_60%)]"
      />
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        <BrandMark />

        <Card className="w-full rounded-2xl px-2 py-6 ring-1 ring-border/60">
          <CardHeader className="items-center text-center">
            <div className="mb-2 grid size-12 place-items-center rounded-2xl bg-destructive/10 text-destructive">
              <ShieldOff className="size-5" aria-hidden />
            </div>
            <CardTitle className="text-2xl tracking-tight">
              Access denied
            </CardTitle>
            <CardDescription>
              You don&apos;t have permission to view this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-2">
            {user ? (
              <div className="rounded-xl border bg-muted/30 p-4 text-sm">
                <p className="font-medium">{user.name || user.email}</p>
                <p className="text-xs text-muted-foreground">
                  Signed in as{" "}
                  <span className="font-medium text-foreground">
                    {role?.name ?? "No role"}
                  </span>
                </p>
              </div>
            ) : null}

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.replace(routes.dashboard)}
              >
                <ArrowLeft className="size-4" aria-hidden />
                Back to dashboard
              </Button>
              <LogoutButton variant="default" className="flex-1" />
            </div>

            <p className="text-center text-xs text-muted-foreground">
              If you believe this is a mistake, contact your administrator.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
