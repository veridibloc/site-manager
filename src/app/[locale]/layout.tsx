import '../globals.css'
import type {Metadata} from 'next'
import {ClerkProvider, currentUser} from '@clerk/nextjs';

import {notFound} from 'next/navigation';

import dynamic from "next/dynamic";
import {getClerkLocalization, SupportedLocales} from '@/back/localization';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import {ChildrenProps} from '@/types/childrenProps';
import {fetchUserAccount} from '@/back/fetchUserAccount';
import {UserAccount} from '@/types/userAccount';
import NextTopLoader from 'nextjs-toploader';

const ClientAppLayout = dynamic(() => import("../../ui/layout/clientAppLayout"), {
    ssr: false,
});


export const metadata: Metadata = {
    title: 'VeridiBloc - Site Manager',
    description: 'Next generation of true Recycling and Circular Economy'
}

interface Props extends ChildrenProps {
    account: UserAccount
    locale: string;
}

function RootLayout({children, locale, account}: Props) {
    const messages = useMessages()

    const isValidLocale = SupportedLocales.some((cur) => cur === locale);
    if (!isValidLocale) {
        return notFound();
    }

    if (!account){
       return notFound();
    }

    return (
        <html lang={locale}>
        <body className="bg-gray-50 dark:bg-slate-900">
        <ClerkProvider localization={getClerkLocalization(locale)} afterSignInUrl="/">
            <NextTopLoader color="#3B82F6"/>
            <NextIntlClientProvider messages={messages} locale={locale}>
                <ClientAppLayout account={account}>
                    {children}
                </ClientAppLayout>
            </NextIntlClientProvider>
        </ClerkProvider>
        </body>
        </html>
    )
}

export default async function LayoutWrapper({children, params: {locale}}: any) {
    const user = await currentUser();

    if(!user){
        return notFound();
    }

    const account  = await fetchUserAccount(user)
    if(!account){
        console.error("Account not found for userId: ", user.id)
        return notFound();
    }
    return <RootLayout account={account} locale={locale}>
        {children}
    </RootLayout>
}
