'use client';

import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export default function Home() {
    const { removeCurrentUser } = useContext(AuthContext);

    return (
        <div>
            <h1 className="text-red-600">Hello World</h1>
            <button
                onClick={() => {
                    removeCurrentUser();
                }}
            >
                Logout
            </button>
        </div>
    );
}
