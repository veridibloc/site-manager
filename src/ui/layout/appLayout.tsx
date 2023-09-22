'use client';

import {useEffect, useLayoutEffect} from 'react';
import {ChildrenProps} from '@/types/childrenProps';
import {SidebarToggle} from '@/ui/layout/sidebarToggle';
import {Sidebar} from '@/ui/layout/sidebar';
import {Header} from '@/ui/layout/header';

export const AppLayout = ({children}: ChildrenProps) => {
    useEffect(() => {
        // @ts-ignore
        import('preline')
    }, []);

    return <div>
        <SidebarToggle />
        <Sidebar/>
        <Header/>
        <main>
            {children}
        </main>
    </div>
}
