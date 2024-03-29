import { createI18nMiddleware } from 'next-international/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { protectedRoutes } from './constant/config';

const I18nMiddleware = createI18nMiddleware({
	locales: ['id', 'en'],
	defaultLocale: 'id',
	resolveLocaleFromRequest: () => 'id'
});

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	if (protectedRoutes?.some(path => pathname.includes(path))) {
		const token = request.cookies.get('token');
		if (!token) {
			const url = new URL('/login', request.url);
			return NextResponse.redirect(url);
		}
	}

	return I18nMiddleware(request);
}

export const config = {
	matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
};
