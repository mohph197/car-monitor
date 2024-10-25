'use client';

import { unsubscribe_all } from '@/lib/pusher';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function RouteEvents() {
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname.startsWith('/home/kpis/')) {
            if (process.env.NEXT_PUBLIC_DEBUG) {
                console.log('Unsubscribing all channels');
            }
            unsubscribe_all();
        }
    }, [pathname]);

    return null;
}
