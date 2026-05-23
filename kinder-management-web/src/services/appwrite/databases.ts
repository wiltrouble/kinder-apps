import { AppwriteException, type Models } from "appwrite";

import { env } from "@/constants/env";

import { databases } from "./client";

export const collections = {
  users: env.appwriteUsersCollectionId,
  roles: env.appwriteRolesCollectionId,
} as const;

export type CollectionKey = keyof typeof collections;

const toError = (error: unknown, fallbackMessage: string): Error => {
  if (error instanceof AppwriteException) {
    return new Error(error.message || fallbackMessage);
  }
  if (error instanceof Error) {
    return error;
  }
  return new Error(fallbackMessage);
};

export const databasesService = {
  async listDocuments<T extends Models.Document>(
    collection: CollectionKey,
    queries: string[] = [],
  ): Promise<Models.DocumentList<T>> {
    try {
      return await databases.listDocuments<T>(
        env.appwriteDatabaseId,
        collections[collection],
        queries,
      );
    } catch (error) {
      throw toError(error, `Failed to list documents from ${collection}`);
    }
  },

  async getDocument<T extends Models.Document>(
    collection: CollectionKey,
    documentId: string,
  ): Promise<T> {
    try {
      return await databases.getDocument<T>(
        env.appwriteDatabaseId,
        collections[collection],
        documentId,
      );
    } catch (error) {
      throw toError(error, `Failed to fetch document ${documentId}`);
    }
  },
};

export type DatabasesService = typeof databasesService;
