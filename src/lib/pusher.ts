import Pusher, { Channel } from 'pusher-js';

export function init_pusher() {
    if (process.env.NEXT_PUBLIC_DEBUG) {
        console.log('initiating pusher');
    }
    return new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? '', {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER ?? '',
    });
}

export function pusher_instance() {
    if (Pusher.instances.length === 0) {
        return init_pusher();
    }
    return Pusher.instances[0];
}

export function unsubscribe_all() {
    const pusher = pusher_instance();
    for (const channel of pusher.channels.all()) {
        pusher.unsubscribe(channel.name);
    }
}

export function get_channel(channel: string): Channel {
    const pusher = pusher_instance();
    return pusher.channel(channel);
}

export function subscribe_channel(channel: string): Channel {
    const pusher = pusher_instance();
    unsubscribe_all();
    return pusher.subscribe(channel);
}

export function bind_channel_event(
    channel: string,
    event: string,
    callback: (data: any) => void
) {
    get_channel(channel).bind(event, callback);
}

export function unbind_channel_event(
    channel: string,
    event: string,
    callback: (data: any) => void
) {
    get_channel(channel).unbind(event, callback);
}

export function unbind_all_channel_events(channel: string) {
    get_channel(channel).unbind_all();
}
