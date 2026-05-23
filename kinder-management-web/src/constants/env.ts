const requireEnv = (value: string | undefined, key: string): string => {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
        `Add it to your .env.local file.`,
    );
  }
  return value;
};

export const env = {
  appwriteEndpoint: requireEnv(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    "NEXT_PUBLIC_APPWRITE_ENDPOINT",
  ),
  appwriteProjectId: requireEnv(
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    "NEXT_PUBLIC_APPWRITE_PROJECT_ID",
  ),
  appwriteProjectName:
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME ?? "Kinder",
  appwriteDatabaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "",
  appwriteUsersCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID ?? "users",
  appwriteRolesCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_ROLES_COLLECTION_ID ?? "roles",
} as const;
