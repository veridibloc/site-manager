import {SignedIn, SignedOut, SignInButton, UserButton} from '@clerk/nextjs';

export const Avatar = () => {
   return <header className="w-full flex flex-row items-center justify-center">
        <SignedIn>
            <UserButton userProfileMode="navigation" showName={false} userProfileUrl="/user" />
        </SignedIn>
    </header>
}
