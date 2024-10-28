import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/signin/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        const { access, refresh, ...rest } = await res.json();
        if (res.ok && access) {
          return { access: access, refresh: refresh, user: { ...rest } };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider == "google") {
        user.first_name = user.name?.split(" ")[0];
        user.last_name = user.name?.split(" ")[1];
        const res = await fetch(`${process.env.BACKEND_URL}/auth/social/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (res.ok) {
          return await res.json();
        }
        return null;
      }
      return true;
    },
    // BUG:fix warnign on lsp
    // TODO: Implement for googleauth
    jwt: async ({ token, user }) => {
      if (user) {
        token.access = user.access;
        token.user = user.user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.refresh = token.refresh;
      session.access = token.access;
      session.user = token.user;
      return session;
    },
  },
});
