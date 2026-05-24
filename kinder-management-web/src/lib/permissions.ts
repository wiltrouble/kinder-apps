import type { Permission } from "@/types/role";

export const permissions = {
  dashboard: {
    view: "dashboard.view",
  },
  users: {
    read: "users.read",
    create: "users.create",
    update: "users.update",
    delete: "users.delete",
  },
  roles: {
    read: "roles.read",
    create: "roles.create",
    update: "roles.update",
    delete: "roles.delete",
  },
} as const;

export type PermissionKey =
  | (typeof permissions.dashboard)[keyof typeof permissions.dashboard]
  | (typeof permissions.users)[keyof typeof permissions.users]
  | (typeof permissions.roles)[keyof typeof permissions.roles];

export const SUPER_ADMIN_PERMISSION = "*";

const normalize = (input: Permission | Permission[] | undefined): Permission[] =>
  Array.isArray(input) ? input : input ? [input] : [];

export const isSuperAdmin = (granted: Permission[] | undefined): boolean =>
  Boolean(granted?.includes(SUPER_ADMIN_PERMISSION));

export const hasPermission = (
  granted: Permission[] | undefined,
  required: Permission,
): boolean => {
  if (!granted || granted.length === 0) return false;
  if (isSuperAdmin(granted)) return true;
  return granted.includes(required);
};

export const hasAnyPermission = (
  granted: Permission[] | undefined,
  required: Permission | Permission[],
): boolean => {
  const list = normalize(required);
  if (list.length === 0) return true;
  if (isSuperAdmin(granted)) return true;
  return list.some((permission) => hasPermission(granted, permission));
};

export const hasAllPermissions = (
  granted: Permission[] | undefined,
  required: Permission | Permission[],
): boolean => {
  const list = normalize(required);
  if (list.length === 0) return true;
  if (isSuperAdmin(granted)) return true;
  return list.every((permission) => hasPermission(granted, permission));
};
