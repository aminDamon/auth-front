import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const isAdmin = request.cookies.get('isAdmin')?.value === 'true';
    const { pathname } = request.nextUrl;

    // مسیرهای عمومی که نیاز به احراز هویت ندارند
    const publicPaths = ['/login', '/register', '/verify'];
    const adminPaths = ['/admin/users'];

    // اگر کاربر لاگین کرده و سعی می‌کند به صفحه لاگین برود، به صفحه اصلی هدایت شود
    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // اگر کاربر لاگین نکرده و سعی می‌کند به صفحه خصوصی برود، به صفحه لاگین هدایت شود
    if (!token && !publicPaths.includes(pathname)) {
        const url = new URL('/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    // اگر کاربر ادمین نیست و سعی می‌کند به صفحه ادمین برود، به صفحه اصلی هدایت شود
    if (!isAdmin && adminPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// تنظیم مسیرهایی که middleware باید روی آنها اجرا شود
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}; 