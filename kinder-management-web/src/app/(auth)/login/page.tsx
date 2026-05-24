import type { Metadata } from "next";

import { LoginForm } from "@/components/forms/loginForm";
import { BrandMark } from "@/components/shared/brandMark";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/constants/app";

export const metadata: Metadata = {
  title: `Sign in · ${appConfig.name}`,
  description: `Sign in to your ${appConfig.name} account.`,
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--muted)_0%,_transparent_60%)]"
      />
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        <BrandMark />

        <Card className="w-full rounded-2xl px-2 py-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_64px_-32px_rgba(0,0,0,0.18)] ring-1 ring-border/60">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription>
              Sign in to your {appConfig.name} account to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <LoginForm />
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          {appConfig.tagline}
        </p>
      </div>
    </main>
  );
}
