import axios from "axios";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: number | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await axios
        .get(`https://bookshelf-backend-azure.vercel.app/getUser/${user.email}`)
        .then((res) => res.data);

      if (!existingUser) {
        await axios.post(
          "https://bookshelf-backend-azure.vercel.app/createUser",
          {
            data: {
              name: user.name,
              email: user.email,
              image: user.image,
              role: "member",
            },
          }
        );
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await axios
          .get(
            `https://bookshelf-backend-azure.vercel.app/getUser/${token.email}`
          )
          .then((res) => res.data[0]);
        console.log(dbUser);
        token.id = dbUser?.id;
        token.role = dbUser?.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string;
        session.user.id = token.id as number;
      }
      return session;
    },
  },
};
