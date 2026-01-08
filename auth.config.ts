import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google,
    Credentials({
      authorize: async () => null,
    }),
  ],
} satisfies NextAuthConfig;
