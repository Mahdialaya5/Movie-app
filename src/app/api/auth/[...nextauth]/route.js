import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { clientPromise } from "@/lib/mongodb";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const client = await clientPromise;
          const db = client.db('movieapp');

    
          const user = await db.collection('users').findOne({
            email: credentials.email,
          });

          if (!user) {
            return null;
          }
        const validPassword = await bcrypt.compare(credentials.password, user.password);

          if (!validPassword) {
            return null;
          }
          return {
            id: user._id.toString(), 
            email: user.email,
            name: user.name,
            role:user.role
          };
        } catch (error) {
          console.error( error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
        token.role=user.role 
      }
      return token;
    },
    
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id; 
        session.user.role=token.role
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
