"use client";

import {ReactElement} from 'react';
import {useTranslations} from 'next-intl';
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
    const isActive = pathname === href
    return <li>
        <Link
            href={href}
            className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-white ${isActive ? 'font-bold bg-gray-100 dark:bg-gray-800' : ''}`}
        >
            {icon}
            {t(i18n)}
        </Link>
    </li>
}
