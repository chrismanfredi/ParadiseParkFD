"use server";

import "server-only";
import type { User } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { staff } from "@/db/schema";

function deriveFullName(user: User, fallbackEmail: string): string {
  const composedName = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  if (composedName) return composedName;
  if (user.username) return user.username;
  return fallbackEmail;
}

export async function syncMemberFromClerk(user: User | null) {
  if (!user) return null;

  const primaryEmail =
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress;

  if (!primaryEmail) return null;

  const fullName = deriveFullName(user, primaryEmail);

  try {
    const existing = await db.query.staff.findFirst({
      where: eq(staff.authId, user.id),
    });

    if (!existing) {
      const [created] = await db
        .insert(staff)
        .values({
          authId: user.id,
          email: primaryEmail,
          fullName,
        })
        .returning();
      return created ?? null;
    }

    if (existing.email !== primaryEmail || existing.fullName !== fullName) {
      const [updated] = await db
        .update(staff)
        .set({
          email: primaryEmail,
          fullName,
        })
        .where(eq(staff.id, existing.id))
        .returning();
      return updated ?? existing;
    }

    return existing;
  } catch (error) {
    console.error("Unable to sync Clerk user to database:", error);
    return null;
  }
}
