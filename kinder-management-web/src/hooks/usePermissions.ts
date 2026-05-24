"use client";

import { useCallback, useMemo } from "react";

import {
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
  isSuperAdmin,
} from "@/lib/permissions";
import { useAuthStore } from "@/stores/authStore";
import type { Permission } from "@/types/role";

export const usePermissions = () => {
  const permissions = useAuthStore((state) => state.permissions);
  const role = useAuthStore((state) => state.role);

  const can = useCallback(
    (permission: Permission) => hasPermission(permissions, permission),
    [permissions],
  );

  const canAny = useCallback(
    (required: Permission | Permission[]) =>
      hasAnyPermission(permissions, required),
    [permissions],
  );

  const canAll = useCallback(
    (required: Permission | Permission[]) =>
      hasAllPermissions(permissions, required),
    [permissions],
  );

  const superAdmin = useMemo(() => isSuperAdmin(permissions), [permissions]);

  return {
    permissions,
    role,
    can,
    canAny,
    canAll,
    isSuperAdmin: superAdmin,
  };
};

export type UsePermissionsReturn = ReturnType<typeof usePermissions>;
