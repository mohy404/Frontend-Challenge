import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession } from "next-auth";

// 1. تحسين تعريف الجلسة
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}

// 2. إعداد خيارات المصادقة
const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 3. محاكاة اتصال بقاعدة البيانات
        const mockUser = {
          id: "1",
          email: "john@mail.com",
          password: "changeme",
          name: "John Doe"
        };

        // 4. التحقق من بيانات المستخدم
        if (
          credentials?.email === mockUser.email &&
          credentials?.password === mockUser.password
        ) {
          return {
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name
          };
        }
        
        // 5. إرجاع خطأ عند الفشل
        throw new Error("Invalid credentials");
      },
    }),
  ],
  callbacks: {
    // 6. معالجة الـ JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    // 7. معالجة الجلسة
    async session({ session, token }) {
      if (token?.email) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login" // 8. توجيه الأخطاء
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 دقيقة
  },
  secret: process.env.NEXTAUTH_SECRET, // 9. استخدام السر البيئي
  debug: process.env.NODE_ENV === "development" // 10. تفعيل وضع التصحيح
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };