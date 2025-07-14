import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      favoriteTeam?: {
        id: string;
        name: string;
        crest: string;
      } | null;
      favoriteLeague?: {
        id: string;
        name: string;
        code: string;
      } | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    favoriteTeam?: {
      id: string;
      name: string;
      crest: string;
    } | null;
    favoriteLeague?: {
      id: string;
      name: string;
      code: string;
    } | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    favoriteTeam?: {
      id: string;
      name: string;
      crest: string;
    } | null;
    favoriteLeague?: {
      id: string;
      name: string;
      code: string;
    } | null;
  }
}
