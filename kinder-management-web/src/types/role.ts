import type { Models } from "appwrite";

export type Permission = string;

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface RoleRow extends Models.Row {
  name: string;
  permissions: Permission[];
}

export const mapRoleRow = (row: RoleRow): Role => ({
  id: row.$id,
  name: row.name,
  permissions: Array.isArray(row.permissions) ? row.permissions : [],
});
