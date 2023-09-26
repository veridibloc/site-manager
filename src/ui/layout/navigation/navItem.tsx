import {ReactElement} from 'react';
import {useTranslations} from 'next-intl';

interface Props {
    i18n: string;
    href: string;
    icon: ReactElement;
}

export const NavItem = ({icon, i18n, href}: Props) => {
    const t = useTranslations("navigation");
    return <li>
        <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-white"
           href={href}>
            {icon}
            {t(i18n)}
        </a>
    </li>
}
