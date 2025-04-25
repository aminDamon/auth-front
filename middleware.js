import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // صفحات عمومی که نیاز به احراز هویت ندارند
    const publicPaths = ['/login', '/register', '/api/public'];

    // اگر کاربر لاگین کرده و به صفحه لاگین می‌رود
    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // اگر کاربر لاگین نکرده و به صفحه خصوصی می‌رود
    if (!token && !publicPaths.some(path => pathname.startsWith(path))) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // اضافه کردن هدر‌های CORS برای درخواست‌های API
    if (pathname.startsWith('/api/')) {
        const response = NextResponse.next();
        response.headers.set('Access-Control-Allow-Credentials', 'true');
        response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5000');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}; 