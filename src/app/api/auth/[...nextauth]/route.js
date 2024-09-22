import { MongoClient } from 'mongodb';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const uri = process.env.MONGODB_URI;
import bcrypt from 'bcrypt'


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
          const clientPromise = new MongoClient(uri).connect();
          const client = await clientPromise;
          const db = client.db('movieapp');

          // Find the user by email
          const user = await db.collection('users').findOne({
            email: credentials.email,
          });
     
          if (!user) {
             return null
          }

          const ValidPassword = await bcrypt.compare(credentials.password, user.password);

          if (!ValidPassword) {
           
            return null
          }
        return { id: user._id.toString(), email: user.email };
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
