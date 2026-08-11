import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db/client";
import { adminUsers, customers } from "@/lib/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      id: "admin",
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = typeof credentials?.email === "string" ? credentials.email.trim().toLowerCase() : "";
        const password = typeof credentials?.password === "string" ? credentials.password : "";
        if (!email || !password) return null;

        const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return { id: user.id, email: user.email, role: user.role };
      },
    }),
    Credentials({
      id: "customer",
      name: "Customer",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = typeof credentials?.email === "string" ? credentials.email.trim().toLowerCase() : "";
        const password = typeof credentials?.password === "string" ? credentials.password : "";
        if (!email || !password) return null;

        const [customer] = await db.select().from(customers).where(eq(customers.email, email)).limit(1);

        if (customer) {
          const valid = await bcrypt.compare(password, customer.passwordHash);
          if (!valid) return null;
          return { id: customer.id, email: customer.email, role: "customer" };
        }

        // No account with this email yet — the sign-in form doubles as
        // registration, so create one on the spot rather than making the
        // customer go through a separate signup step.
        const passwordHash = await bcrypt.hash(password, 10);
        const [created] = await db.insert(customers).values({ email, passwordHash }).returning();
        return { id: created.id, email: created.email, role: "customer" };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "admin";
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        (session.user as { id?: string; role?: string }).id = token.id as string | undefined;
        (session.user as { id?: string; role?: string }).role = token.role as string | undefined;
      }
      return session;
    },
  },
});
