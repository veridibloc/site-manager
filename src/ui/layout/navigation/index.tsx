import {NavItem} from './navItem'
import {memo} from 'react';
import {FaPeopleRoof, FaGetPocket, FaHouseUser, FaRecycle, FaCube, FaListCheck} from 'react-icons/fa6';
import {NavGroup} from '@/ui/layout/navigation/navGroup';


const _Navigation = () => {

     return (
        <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul className="space-y-1.5">
                <NavItem icon={<FaHouseUser/>} i18n="dashboard" href="/"  />
                <NavGroup icon={<FaPeopleRoof/>} i18n="collectors">
                    <NavItem icon={<FaGetPocket/>} i18n="collectors-receive" href="/collectors/receive"  />
                </NavGroup>
                <NavGroup icon={<FaRecycle/>} i18n="material">
                    <NavItem icon={<FaListCheck/>} i18n="material-register" href="/material/register"  />
                    <NavItem icon={<FaCube/>} i18n="material-bundle" href="/material/bundle"  />
                </NavGroup>
            </ul>
        </nav>
    )
}

export const Navigation = memo(_Navigation);
