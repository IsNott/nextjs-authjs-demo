import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "./app/lib/definitions";
import pool from "./app/lib/db";
import bcrypt from "bcrypt";
import GitHub from "next-auth/providers/github"

async function getUser(email: string): Promise<User | undefined> {
  try {
    console.log(process.env.MYSQL_USER);
    const connect = await pool.getConnection();
    const data: any = await connect.query(
      `SELECT * FROM user WHERE email='${email}'`,
    );
    connect.release();
    return data[0][0] as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!
  }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return {
              ...user,
              id: user.id
            };
          }
        }
        return null;
      },
    }),
  ],
  
});
