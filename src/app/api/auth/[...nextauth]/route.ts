import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // بيانات المستخدم الثابتة
        const user = { id: "1", email: "john@mail.com", password: "changeme" };

        // التحقق من البريد الإلكتروني وكلمة المرور
        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user; // تسجيل الدخول ناجح
        }
        return null; // تسجيل الدخول فاشل
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/login", // توجيه المستخدم إلى صفحة تسجيل الدخول
  },
  session: {
    strategy: "jwt", // استخدام JWT لإدارة الجلسة
    maxAge: 30 * 60, // انتهاء صلاحية الجلسة بعد 30 دقيقة
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
