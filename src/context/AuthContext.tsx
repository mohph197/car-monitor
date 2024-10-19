'use client';

import Loader from '@/components/app/Loader';
import { authRoutes } from '@/config/consts';
import useServerUser from '@/hooks/server_user';
import { removeTokens } from '@/lib/storage/tokens';
import {
    getStoredUser,
    removeStoredUser,
    updateStoredUser,
} from '@/lib/storage/user';
import { UserType } from '@/types/user';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useEffect, useState } from 'react';

type AuthContextType = {
    currentUser?: UserType;
    isAuthLoading: boolean;
    updateCurrentUser: (user: UserType) => void;
    removeCurrentUser: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    isAuthLoading: true,
    updateCurrentUser: () => {},
    removeCurrentUser: () => {},
});

export function AuthProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [currentUser, setCurrentUser] = useState<UserType | undefined>();
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
    const { replace } = useRouter();
    const pathname = usePathname();
    const [latestRoute, setLatestRoute] = useState<string>(
        authRoutes.includes(pathname) ? '/' : pathname
    );
    const { serverUser, isServerUserLoading, serverUserError } =
        useServerUser();

    const updateCurrentUser = useCallback(
        (user: UserType) => {
            if (currentUser === user) return;
            updateStoredUser(user);
            setCurrentUser(user);
        },
        [currentUser]
    );

    const removeCurrentUser = useCallback(() => {
        removeTokens();
        removeStoredUser();
        setCurrentUser(undefined);
    }, []);

    // Load current user from local storage
    useEffect(() => {
        const storedUser = getStoredUser();
        if (storedUser) {
            setCurrentUser(storedUser);
            setIsAuthLoading(false);
        }
    }, []);

    // Update current user when server user is available
    useEffect(() => {
        if (!serverUser) return;
        updateCurrentUser(serverUser);
        setIsAuthLoading(false);
    }, [serverUser, updateCurrentUser]);

    // Handle server user loading state
    useEffect(() => {
        // If there is no saved user and server user is still loading -> keep loading
        // Otherwise -> stop loading
        setIsAuthLoading(
            (isAuthLoading) => isAuthLoading && isServerUserLoading
        );

        // If serverUser is not found after fetching -> remove current user
        if (!isServerUserLoading && !serverUser) {
            if (process.env.NEXT_PUBLIC_DEBUG) {
                console.error('Server user not found');
            }
            removeCurrentUser();
        }
    }, [isServerUserLoading, serverUser, removeCurrentUser]);

    // Handle server user error
    useEffect(() => {
        if (!serverUserError) return;

        if (process.env.NEXT_PUBLIC_DEBUG) {
            console.error('Server user error:', serverUserError);
        }

        removeCurrentUser();
    }, [serverUserError, removeCurrentUser]);

    // Handle route changes based on auth state
    useEffect(() => {
        // If auth is still loading -> no need to check
        // if (isAuthLoading) return;

        if (currentUser) {
            if (authRoutes.includes(pathname)) {
                // If user is authenticated and tries to access an auth route
                //  -> redirect to latest route
                replace(latestRoute);
            }
        } else if (!authRoutes.includes(pathname)) {
            // If user is not authenticated and tries to access a protected route
            //  -> redirect to login
            setLatestRoute(pathname);
            replace(authRoutes[0]);
        }
    }, [pathname, currentUser, latestRoute, replace]);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isAuthLoading,
                updateCurrentUser,
                removeCurrentUser,
            }}
        >
            {isAuthLoading ? <Loader /> : children}
        </AuthContext.Provider>
    );
}
