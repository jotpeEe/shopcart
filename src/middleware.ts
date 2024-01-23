import { type NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';

import { locales } from './navigation';

const publicPages = [
    '/auth',
    '/home',
    // (/secret requires auth)
];

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale: 'en',
});

const authMiddleware = withAuth(
    // Note that this callback is only invoked if
    // the `authorized` callback has returned `true`
    // and not for pages listed in `pages`.
    req => intlMiddleware(req),
    {
        callbacks: {
            authorized: ({ token }) => token !== null,
        },
        pages: {
            signIn: '/auth',
        },
    }
);

const middleware = (req: NextRequest) => {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages
            .flatMap(p => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$`,
        'i'
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    if (isPublicPage) {
        return intlMiddleware(req);
    } else {
        return (authMiddleware as any)(req);
    }
};

export const config = {
    // Skip all paths that should not be internationalized
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
export default middleware;
