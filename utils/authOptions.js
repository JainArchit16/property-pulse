import connectDB from '@/config/database';
import User from '@/models/User';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (credentials == null) {
          return null;
        }
        try {
          await connectDB();

          const user = await User.findOne({ email: credentials.email });

          if (
            user &&
            (await bcrypt.compare(credentials.password, user.password))
          ) {
            // Authentication successful
            return user;
          }

          // Authentication failed
          return null;
        } catch (error) {
          console.error(error);
          return false;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      const user = await User.findOne({ email: session.user.email });
      session.user.name = user.username;
      return session;
    },
  },
};
