"use client";

import {ReactElement, useMemo} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

interface Props {
    i18n: string;
    href: string;
    icon: ReactElement;
}

export const NavItem = ({icon, i18n, href}: Props) => {
    const pathname = usePathname()
    const t = useTranslations("navigation");
    const locale = useLocale()

    const isActive = useMemo(() => {
        const phref = href.endsWith('/') ? href.slice(0, -1) : href
        return pathname === `/${locale}${phref}`
    }, [href, pathname])


    return <li>
        <Link
            href={href}
            className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-md hover:bg-gray-100 dark:bg-gray-900  ${isActive ? 'font-bold text-blue-500 bg-gray-100 dark:bg-gray-800' : 'text-slate-700 dark:text-white'}`}
        >
            {icon}
            {t(i18n)}
        </Link>
    </li>
}
