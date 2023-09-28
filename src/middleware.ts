import { authMiddleware } from "@clerk/nextjs";
import createIntlMiddleware from "next-intl/middleware";
import {NextResponse} from 'next/server';

const intlMiddleware = createIntlMiddleware({
    locales: ['en', 'pt'],
    defaultLocale: 'pt'
});

const IgnoreIntlRoute = /\/api\/.*/

export default authMiddleware({
    beforeAuth: (req) => {
        if(IgnoreIntlRoute.test(req.url)){
            return NextResponse.next();
        }
        return intlMiddleware(req);
    },
    publicRoutes: ["/clerk/webhook"]
});


export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next|_vercel).*)', '/', '/(api|trpc)(.*)', '/'],
};
