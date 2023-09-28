'use client';

import {ChildrenProps} from '@/types/childrenProps';
import {SidebarToggle} from './sidebarToggle';
import {Sidebar} from './sidebar';
import {useEffect} from 'react';

interface Props extends ChildrenProps {
    userId: string;
    locale: string;
}

const ClientAppLayout = ({children, locale}: Props) => {

    useEffect(() => {
        // @ts-ignore
        import('preline')
    }, []);

    // console.log("account", account)

    return <div>

        <SidebarToggle/>
        <Sidebar/>
        <main className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-72">
            {children}
        </main>
    </div>
}

export default ClientAppLayout;
