"use client";

import { CalendarDays, GraduationCap, ShieldCheck, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const stats = [
  {
    label: "Active students",
    value: "—",
    icon: GraduationCap,
    description: "Students currently enrolled",
  },
  {
    label: "Classrooms",
    value: "—",
    icon: Users,
    description: "Across all age groups",
  },
  {
    label: "Events this week",
    value: "—",
    icon: CalendarDays,
    description: "Activities and meetings",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const displayName = user?.name || user?.email || "there";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <section className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Hi, {displayName}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s a snapshot of what&apos;s happening across your
          kindergarten today.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="rounded-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <span className="grid size-8 place-items-center rounded-lg bg-muted text-muted-foreground">
                    <Icon className="size-4" aria-hidden />
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-2xl font-semibold">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-xl lg:col-span-2">
          <CardHeader>
            <CardTitle>Getting started</CardTitle>
            <CardDescription>
              Plug in your modules to see real-time data here.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This is your dashboard placeholder. Hook up modules for students,
            classrooms, attendance, and reports to bring it to life.
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="size-4 text-primary" aria-hidden />
              Signed in
            </CardTitle>
            <CardDescription>You are authenticated.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                Name
              </span>
              <span className="font-medium">{user?.name ?? "—"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                Email
              </span>
              <span className="font-medium">{user?.email ?? "—"}</span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
