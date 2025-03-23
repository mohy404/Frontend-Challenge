import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession } from "next-auth";
import api from "@/lib/api";

// تعريف نوع للخطأ
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

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
    access_token: string;
    refresh_token: string;
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
          const response = await api.post("/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { access_token, refresh_token } = response.data;

          const profileResponse = await api.get("/auth/profile", {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          return {
            ...profileResponse.data,
            access_token,
            refresh_token,
          };
        } catch (error: unknown) {
          // تحويل الخطأ إلى النوع المحدد
          const apiError = error as ApiError;
          throw new Error(
            apiError.response?.data?.message || "Authentication failed"
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token;
        token.refreshToken = user.refresh_token;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
      };
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 20 * 24 * 60 * 60, // 20 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };