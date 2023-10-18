'use client';

import {NavItem} from './navItem'
import {memo} from 'react';
import {FaPeopleRoof, FaGetPocket, FaHouseUser, FaRecycle, FaCube, FaListCheck, FaCubes} from 'react-icons/fa6';
import {NavGroup} from '@/ui/layout/navigation/navGroup';
import {usePathname} from 'next/navigation';


const _Navigation = () => {

    const pathname = usePathname()

     return (
        <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open={true}>
            <ul className="space-y-1.5">
                <NavItem icon={<FaHouseUser/>} i18n="dashboard" href="/" />
                <NavGroup icon={<FaPeopleRoof/>} i18n="collectors" isOpen={pathname.includes('/collectors')}>
                    <NavItem icon={<FaGetPocket/>} i18n="collectors-receive" href="/collectors/receive"  />
                </NavGroup>
                <NavGroup icon={<FaRecycle/>} i18n="material">
                    <NavItem icon={<FaListCheck/>} i18n="material-register" href="/material/register"  />
                    <NavItem icon={<FaCube/>} i18n="material-bundle" href="/material/bundle"  />
                    <NavItem icon={<FaCubes/>} i18n="material-lots" href="/material/lots"  />
                </NavGroup>
            </ul>
        </nav>
    )
}

export const Navigation = memo(_Navigation);
