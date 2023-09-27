import { authMiddleware } from "@clerk/nextjs";
import createIntlMiddleware from "next-intl/middleware";
import {NextResponse} from 'next/server';

const intlMiddleware = createIntlMiddleware({
    locales: ['en', 'pt'],
    defaultLocale: 'pt'
});

export default authMiddleware({
    beforeAuth: (req) => {
        return intlMiddleware(req);
    },
    publicRoutes: ["/clerk/webhook"]
});


export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next|_vercel).*)', '/', '/(api|trpc)(.*)', '/'],
};
