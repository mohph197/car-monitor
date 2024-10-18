'use client';

import getMe from '@/actions/me';
import { getUserInfo, removeUser, updateUser } from '@/lib/user';
import { UserType } from '@/types/user';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

export default function useUser() {
    const [currentUser, setCurrentUser] = useState<UserType | undefined>(
        getUserInfo()
    );
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(
        currentUser === undefined
    );

    const { data, error, isLoading } = useSWR('getUser', getMe);

    const updateCurrentUser = useCallback((user: UserType) => {
        updateUser(user);
        setCurrentUser(user);
    }, []);

    const removeCurrentUser = useCallback(() => {
        removeUser();
        setCurrentUser(undefined);
    }, []);

    useEffect(() => {
        if (data) {
            updateCurrentUser(data);
            setIsAuthLoading(false);
        } else {
            removeCurrentUser();
        }
    }, [data, removeCurrentUser, updateCurrentUser]);

    useEffect(() => {
        setIsAuthLoading((oldLoading) => oldLoading && isLoading);
    }, [isLoading]);

    useEffect(() => {
        if (error) {
            console.error(error);
            removeCurrentUser();
        }
    }, [error, removeCurrentUser]);

    return {
        currentUser,
        isAuthLoading,
        updateCurrentUser,
        removeCurrentUser,
    };
}
