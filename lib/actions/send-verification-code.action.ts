"use server";

import { resend } from "../resend";
import VerifyEmail from "../emails/VerifyEmail";
import { randomInt } from "crypto";
import { render } from "@react-email/components";
import { prisma } from "@/lib/prisma";

export const sendVerificationCode = async (email: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    return { success: false, error: "This email is already in use" };

  const code = randomInt(100_000, 999_999).toString();
  // Delete old codes
  await prisma.emailVerificationCode.deleteMany({ where: { email } });
  // Save code into DB
  await prisma.emailVerificationCode.create({
    data: {
      email,
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 Minutes
    },
  });

  const html = await render(VerifyEmail({ code }));

  const result = await resend.emails.send({
    from: "TaskFlow <onboarding@resend.dev>",
    to: email,
    subject: "Verification Code",
    html: html,
  });

  if (result.error) {
    return {
      success: false,
      error: "Failed to sent code to this email adress, try again",
    };
  }
  return { success: true };
};
