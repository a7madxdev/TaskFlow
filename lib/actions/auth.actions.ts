"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import z from "zod";

// Sign With Google
export const signInWithGoogle = async () => {
  await signIn("google", {
    redirectTo: "/home",
    redirect: true,
  });
};

// Verify Email Code
export const verifyEmailCode = async (email: string, code: string) => {
  const record = await prisma.emailVerificationCode.findFirst({
    where: { email, code },
  });

  if (!record) return { error: "Code isn't correct" };

  if (record.expiresAt < new Date()) {
    return { error: "Code is expired" };
  }

  return { success: true };
};

// Create User By Credentials
const userCredentialsSchema = z.object({
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/),
  username: z.string().regex(/^[A-Za-z][A-Za-z0-9_]{5,29}$/),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}/
    ),
});

export const createUserByCredentials = async (
  email: string,
  code: string,
  username: string,
  password: string
) => {
  const validation = userCredentialsSchema.safeParse({
    email,
    username,
    password,
  });
  if (!validation.success) return { error: "The entered data is invalid" };

  // TODO: Add code verification
  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUsername) return { error: "This username is already in use" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  await prisma.emailVerificationCode.deleteMany({
    where: { email },
  });

  await signInWithCredentials(email, password);

  redirect("/home");
};

// Sign In With Credentials
export const signInWithCredentials = async (
  identifier: string,
  password: string
) => {
  try {
    await signIn("credentials", {
      identifier,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.message, success: false };
    }
  }
  redirect("/home");
};

// Sign Out
export const signOutAction = async () => {
  await signOut();
};
