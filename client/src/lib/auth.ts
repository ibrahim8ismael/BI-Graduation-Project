import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { findDemoUserByEmail } from "@/lib/auth/demo-users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        role: {},
      },
      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;
        const hiddenRole = credentials.role as string | undefined;

        const matched = findDemoUserByEmail(email);
        if (!matched || matched.password !== password) return null;

        if (hiddenRole && hiddenRole !== matched.role) return null;

        return {
          id: matched.id,
          email: matched.email,
          name: matched.email.split("@")[0],
          role: matched.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.role = token.role as typeof session.user.role;
      return session;
    },
  },
});
