import {UserButton} from '@clerk/nextjs';
import {useUserAddress} from '@/common/hooks/useUserAddress';
import {useAppContext} from '@/common/hooks/useAppContext';
import Link from 'next/link';

export const Avatar = () => {
    const address = useUserAddress()
    console.log("Avatar:", address.getPublicKey())
    const  {Ledger:{ExplorerUrl}} = useAppContext()
    return (
        <header className="w-full flex flex-col items-center justify-center">
            <UserButton userProfileMode="navigation" showName={false} userProfileUrl="/user"/>
            <Link href={`${ExplorerUrl}/address/${address.getNumericId()}`} rel="noreferrer" target="_blank">
                <div className="text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-300 px-2 py-1 rounded-md">{address.getReedSolomonAddress()}</div>
            </Link>
        </header>
    )
}
