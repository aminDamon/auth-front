import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const isAdmin = request.cookies.get('isAdmin')?.value === 'true';
    const { pathname } = request.nextUrl;

    // مسیرهای عمومی که نیاز به احراز هویت ندارند
    const publicPaths = ['/login', '/register', '/verify', '/font'];
    const adminPaths = ['/admin/users'];

    // Debug logging
    console.log('Middleware Debug:', {
        pathname,
        hasToken: !!token,
        isAdmin,
        cookies: request.cookies.getAll().map(c => ({
            name: c.name,
            value: c.value,
            domain: c.domain,
            path: c.path,
            expires: c.expires
        }))
    });

    // اگر مسیر عمومی است، اجازه دسترسی بده
    if (publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // اگر کاربر لاگین کرده و سعی دارد به صفحه لاگین دسترسی پیدا کند
    if (token && pathname.startsWith('/login')) {
        console.log('User is logged in, redirecting to home');
        return NextResponse.redirect(new URL('/', request.url));
    }

    // اگر کاربر لاگین نکرده و سعی دارد به صفحات خصوصی دسترسی پیدا کند
    if (!token && !publicPaths.includes(pathname)) {
        console.log('User is not logged in, redirecting to login');
        const url = new URL('/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    // اگر کاربر ادمین نیست و سعی می‌کند به صفحه ادمین برود، به صفحه اصلی هدایت شود
    if (!isAdmin && adminPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // تنظیمات کوکی برای پاسخ
    const response = NextResponse.next();
    
    // اگر کوکی‌ها وجود دارند، آنها را در پاسخ هم قرار بده
    if (token && token !== 'undefined') {
        const expires = new Date();
        expires.setDate(expires.getDate() + 1); // 1 day from now
        
        response.cookies.set('token', token, {
            path: '/',
            secure: true,
            sameSite: 'strict',
            expires: expires,
            domain: request.nextUrl.hostname
        });
    }
    
    if (isAdmin) {
        const expires = new Date();
        expires.setDate(expires.getDate() + 1); // 1 day from now
        
        response.cookies.set('isAdmin', 'true', {
            path: '/',
            secure: true,
            sameSite: 'strict',
            expires: expires,
            domain: request.nextUrl.hostname
        });
    }

    return response;
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