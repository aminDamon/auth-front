// middleware.js
import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // صفحات عمومی که نیاز به احراز هویت ندارند
  const publicPaths = ['/login', '/register'];
  
  // اگر کاربر لاگین کرده و به صفحه عمومی می‌رود
  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // اگر کاربر لاگین نکرده و به صفحه خصوصی می‌رود
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // اعتبارسنجی توکن برای صفحات خصوصی
  if (!publicPaths.includes(pathname)) {
    try {
      await verifyToken(token); // تابعی که باید ایجاد کنید
    } catch (err) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};