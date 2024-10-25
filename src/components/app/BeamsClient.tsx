'use client';

import * as PusherPushNotifications from '@pusher/push-notifications-web';
import { useEffect } from 'react';

export default function BeamsClient() {
    useEffect(() => {
        const beamsClient = new PusherPushNotifications.Client({
            instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID ?? '',
        });

        if (process.env.NEXT_PUBLIC_DEBUG) {
            console.log('BeamsClient initialized');
        }

        beamsClient
            .start()
            .then(() => beamsClient.setDeviceInterests(['alerts']))
            .then(() => beamsClient.getDeviceInterests())
            .then((interests) => console.log('Current interests:', interests))
            .catch(console.error);
    }, []);

    return null;
}
