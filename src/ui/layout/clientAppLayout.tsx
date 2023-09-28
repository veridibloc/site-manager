'use client';

import {ChildrenProps} from '@/types/childrenProps';
import {SidebarToggle} from './sidebarToggle';
import {Sidebar} from './sidebar';
import {useEffect} from 'react';
import {UserAccount} from '@/types/userAccount';
import {AccountContext} from '@/common/contexts/accountContext';

interface Props extends ChildrenProps {
    account: UserAccount;
}

const ClientAppLayout = ({children, account}: Props) => {

    useEffect(() => {
        // @ts-ignore
        import('preline')
    }, []);

    return (
        <AccountContext.Provider value={account}>
            <SidebarToggle/>
            <Sidebar/>
            <main className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-72">
                {children}
            </main>
        </AccountContext.Provider>
    )
}

export default ClientAppLayout;
