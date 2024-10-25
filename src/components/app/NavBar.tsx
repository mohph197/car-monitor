'use client';

import Image from 'next/image';
import Bell from '@/assets/bell.svg';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function NavBar() {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="flex items-center justify-end w-full p-5 gap-4">
            <Link href="/notifications" className="rounded-lg p-2 bg-[#F1F5F9]">
                <Image src={Bell} alt="Notifications" width={24} />
            </Link>
            <Link href="/profile">
                <span className="text-2xl">
                    {(currentUser?.firstName[0].toUpperCase() ?? '') +
                        ((currentUser?.firstName.length ?? 0) > 1
                            ? currentUser?.firstName.slice(1)
                            : '')}{' '}
                    {(currentUser?.lastName[0].toUpperCase() ?? '') +
                        ((currentUser?.lastName.length ?? 0) > 1
                            ? currentUser?.lastName.slice(1)
                            : '')}
                </span>
            </Link>
        </div>
    );
}
