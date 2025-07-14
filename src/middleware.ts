import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_PATHS = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuth = !!token;
  const { pathname } = request.nextUrl;

  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const isProtectedPath = pathname.startsWith('/dashboard');

  if (isAuth && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isAuth && isProtectedPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// 👇 Make sure middleware applies to public and protected paths
export const config = {
  matcher: ['/login', '/register', '/dashboard/:path*'],
};
