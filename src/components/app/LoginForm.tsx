'use client';

import postAuthenticate from '@/actions/authenticate';
import getMe from '@/actions/me';
import { AuthContext } from '@/context/AuthContext';
import { updateAccessToken, updateRefreshToken } from '@/lib/storage/tokens';
import { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from './Loader';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
                <form
                    onSubmit={loginHandler}
                    className="flex flex-col border-2 border-black rounded-xl p-4 gap-4"
                >
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="email" className="text-base">
                            Your Email
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="password" className="text-base">
                            Password
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                        />
                    </div>
                    <Button type="submit">Login</Button>
                </form>
            )}
        </>
    );
}
