'use client';

import Image from 'next/image';
import Bell from '@/assets/bell.svg';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function NavBar() {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="flex justify-end w-full p-5 gap-2">
            <Link href="/notifications">
                <Image src={Bell} alt="Notifications" width={24} />
            </Link>
            <Link href="/profile">
                <span className="text-2xl">
                    {currentUser?.firstName} {currentUser?.lastName}
                </span>
            </Link>
        </div>
    );
}
