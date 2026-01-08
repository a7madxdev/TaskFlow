import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { adapter } from "@/lib/auth-adapter";
import bcrypt from "bcryptjs";
import authConfig from "./auth.config";
import { generateUniqueUsername } from "./lib/username";

class SignInError extends CredentialsSignin {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

// TODO: In `auth.d.ts` and `prsima.schema` change `username` to be required
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      name: "credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (
          !credentials?.identifier ||
          !credentials?.password ||
          typeof credentials?.password !== "string"
        ) {
          throw new SignInError("Invalid credentials");
        }

        let user = null;

        // Search by email or username
        user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
            password: { not: null },
          },
        });

        if (!user) throw new SignInError("User not found");

        // Compare password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password as string
        );

        if (!isValid) throw new SignInError("Password isn't correct");

        return user;
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      // if (account?.provider === "google") {
      //   if (user.email) {
      //     const username = await generateUniqueUsername(user.email);

      //     await prisma.user.update({
      //       where: { id: user.id },
      //       data: { username },
      //     });
      //   }
      // }
      // console.log(user);
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      if (user.email && !user.username) {
        const username = await generateUniqueUsername(user.email);
        await prisma.user.update({
          where: { id: user.id },
          data: { username },
        });
      }
    },
  },
  secret: process.env.AUTH_SECRET,
});
