'use client';

import { AuthContext } from '@/context/AuthContext';
import * as PusherPushNotifications from '@pusher/push-notifications-web';
import { useContext, useEffect } from 'react';

export default function BeamsClient() {
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const beamsClient = new PusherPushNotifications.Client({
            instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID ?? '',
        });

        if (process.env.NEXT_PUBLIC_DEBUG) {
            console.log('BeamsClient initialized');
        }

        if (currentUser && currentUser.role === 'manager') {
            beamsClient
                .start()
                .then(() => beamsClient.setDeviceInterests(['alerts']))
                .then(() => beamsClient.getDeviceInterests())
                .then((interests) =>
                    console.log('Current interests:', interests)
                )
                .catch(console.error);
        } else if (currentUser && currentUser.role === 'operator') {
            beamsClient.stop();
        }
    }, [currentUser]);

    return null;
}
