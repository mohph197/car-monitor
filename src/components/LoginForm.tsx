'use client';

import postAuthenticate from '@/actions/authenticate';
import getMe from '@/actions/me';
import { AuthContext } from '@/context/AuthContext';
import { updateAccessToken, updateRefreshToken } from '@/lib/storage/tokens';
import { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from './Loader';

export default function LoginForm() {
    const { updateCurrentUser } = useContext(AuthContext);
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

    function loginHandler(event: FormEvent) {
        event.preventDefault();
        setIsFormLoading(true);

        const email = (event.target as HTMLFormElement).email?.value;
        const password = (event.target as HTMLFormElement).password?.value;

        if (!email || !password) {
            toast.error('Email and password are required');
            setIsFormLoading(false);
            return;
        }

        postAuthenticate(email, password).then((res) => {
            if (!res) {
                toast.error('Invalid email or password');
                setIsFormLoading(false);
                return;
            }

            const { accessToken, refreshToken } = res;
            updateAccessToken(accessToken);
            updateRefreshToken(refreshToken);

            getMe().then((user) => {
                setIsFormLoading(false);
                if (!user) {
                    toast.error('User not found');
                    return;
                }

                updateCurrentUser(user);
            });
        });
    }

    return (
        <>
            {isFormLoading ? (
                <Loader />
            ) : (
                <form onSubmit={loginHandler}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            )}
        </>
    );
}
