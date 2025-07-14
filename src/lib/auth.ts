import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            favoriteTeam: true,
            favoriteLeague: true,
          },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          favoriteTeam: user.favoriteTeam ?? null,
          favoriteLeague: user.favoriteLeague ?? null,
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log('✅ jwt user:', user);
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.favoriteTeam = (user as any).favoriteTeam;
        token.favoriteLeague = (user as any).favoriteLeague;
      }
      return token;
    },

    async session({ session, token }) {
      console.log('✅ token at session:', token);
      session.user.id = token.id as string;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.favoriteTeam = token.favoriteTeam;
      session.user.favoriteLeague = token.favoriteLeague;
      return session;
    },
  },
};
