import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/api';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // Protected routes
  const protectedRoutes = ['/dashboard'];
  
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      const isValid = await verifyToken(token);
      if (!isValid) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Auth routes (login/register) - redirect to dashboard if already logged in
  const authRoutes = ['/auth/login', '/auth/register'];
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}