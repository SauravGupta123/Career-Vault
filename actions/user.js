"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Start a transaction to handle both operations
    const result = await db.$transaction(
      async (tx) => {
        // First check if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // If industry doesn't exist, create it with default values
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        // Now update the user
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000, // default: 5000
      }
    );

    revalidatePath("/");
    return result.user;
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}

export async function updateCredits() {
  const { userId } = await auth();
  if (!userId) {
    console.error("updateCredits: Unauthorized request.");
    throw new Error("Unauthorized");
  }

  console.log("updateCredits: Fetching user for", userId);

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    console.error("updateCredits: User not found", userId);
    throw new Error("User not found");
  }

  try {
    console.log("updateCredits: Updating credits for", user.id);

    // Start a transaction to update credits and add a payment entry
    const result = await db.$transaction(async (tx) => {
      // Update user credits
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: { credits: user.credits + 10 }, // Add 10 credits
      });

      // Add a payment entry
      const paymentEntry = await tx.payments.create({
        data: {
          userId: user.id,
          amount: 10, // Payment amount
          status: "successful", // Mark payment as successful
        },
      });

      return { updatedUser, paymentEntry };
    });

    console.log("updateCredits: Credits updated successfully:", result.updatedUser.credits);
    console.log("updateCredits: Payment entry created:", result.paymentEntry);

    revalidatePath("/");
    return { success: true, message: "User credits updated and payment recorded successfully" };
  } catch (error) {
    console.error("updateCredits: Error updating credits or adding payment", error.message);
    throw new Error("Failed to update credits and record payment");
  }
}


export const checkCredits = async (userId) => {
  
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  

  if (!user) throw new Error("User not found");
  console.log("checkCredits: User found", user.id);
  return user.credits;
}