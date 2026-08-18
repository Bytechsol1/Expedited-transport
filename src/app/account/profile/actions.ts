"use server";

import { db } from "@/lib/db/client";
import { customers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  const customerId = session?.user?.id;

  if (!customerId) {
    return { error: "Not authenticated" };
  }

  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;
  const company = formData.get("company") as string;

  try {
    await db
      .update(customers)
      .set({
        fullName: fullName || null,
        phone: phone || null,
        company: company || null,
      })
      .where(eq(customers.id, customerId));

    revalidatePath("/account/profile");
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile", error);
    return { error: "Failed to update profile" };
  }
}

import bcrypt from "bcryptjs";

export async function changePassword(formData: FormData) {
  const session = await auth();
  const customerId = session?.user?.id;

  if (!customerId) {
    return { error: "Not authenticated" };
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "All fields are required" };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New passwords do not match" };
  }

  if (newPassword.length < 8) {
    return { error: "Password must be at least 8 characters long" };
  }

  try {
    const [customer] = await db
      .select({ passwordHash: customers.passwordHash })
      .from(customers)
      .where(eq(customers.id, customerId))
      .limit(1);

    if (!customer) {
      return { error: "User not found" };
    }

    const isValid = await bcrypt.compare(currentPassword, customer.passwordHash);
    if (!isValid) {
      return { error: "Incorrect current password" };
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    await db
      .update(customers)
      .set({ passwordHash: newHash })
      .where(eq(customers.id, customerId));

    return { success: true };
  } catch (error) {
    console.error("Failed to change password", error);
    return { error: "Failed to change password" };
  }
}
