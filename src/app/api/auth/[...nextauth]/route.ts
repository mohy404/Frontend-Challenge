import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession } from "next-auth";
import api from "@/lib/api";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
      avatar?: string;
    };
    accessToken: string;
    refreshToken: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    accessToken: string;
    refreshToken: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const loginResponse = await api.post("/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { access_token: accessToken, refresh_token: refreshToken } = loginResponse.data;

          const profileResponse = await api.get("/auth/profile", {
            headers: { Authorization: `Bearer ${accessToken}` }
          });

          return {
            ...profileResponse.data,
            id: profileResponse.data.id.toString(),
            accessToken,
            refreshToken,
          };

        } catch (error) {
          const errorMessage = (error as Error).message || "Authentication failed";
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.avatar = user.avatar;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          avatar: token.avatar as string | undefined,
        },
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
      };
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 20 * 24 * 60 * 60, // 20 يوم
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: process.env.NODE_ENV === "production" ? ".yourdomain.com" : undefined,
      },
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };