'use client'

import {ReactElement, useEffect, useRef} from 'react';
import {ChildrenProps} from '@/types/childrenProps';
import {useTranslations} from 'next-intl';

interface Props extends ChildrenProps {
    i18n: string;
    icon: ReactElement;
    isOpen?: boolean
}

export const NavGroup = ({i18n, icon, isOpen = true, children}: Props) => {
    const ref = useRef<HTMLLIElement>(null);
    const t = useTranslations("navigation");

    return (
        <li ref={ref} className="hs-accordion">
            <div className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white">
                {icon}
                {t(i18n)}
                <svg
                    className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                </svg>
                <svg
                    className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                </svg>
            </div>

            <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                <ul className="hs-accordion-group pl-3 pt-2" data-hs-accordion-always-open={true}>
                    {children}
                </ul>
            </div>
        </li>
    )
}
