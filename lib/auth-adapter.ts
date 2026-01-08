import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// TODO: remove `as any` when Auth.js + Prisma fully support Prisma v6 / Next stable
export const adapter = PrismaAdapter(prisma as any);
