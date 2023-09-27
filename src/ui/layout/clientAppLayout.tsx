'use client';

import {ChildrenProps} from '@/types/childrenProps';
import {SidebarToggle} from './sidebarToggle';
import {Sidebar} from './sidebar';
import {useEffect} from 'react';


const ClientAppLayout = ({children}: ChildrenProps) => {
    useEffect(() => {
        // @ts-ignore
        import('preline')
    }, []);

    return <div>
        <SidebarToggle/>
        <Sidebar/>
        <main className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-72">
            {children}
        </main>
    </div>
}

export default ClientAppLayout;
