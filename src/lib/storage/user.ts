import { UserType } from '@/types/user';

const userKey = '@user';

export function getStoredUser(): UserType | undefined {
    if (process.env.NEXT_PUBLIC_DEBUG) {
        console.log('Getting user from local storage');
    }

    if (typeof window === 'undefined') {
        return;
    }
    const userJson = localStorage.getItem(userKey);
    if (userJson) {
        return JSON.parse(userJson);
    }
    return;
}

export const updateStoredUser = (user: UserType) => {
    if (!user) console.error('User is required');
    if (process.env.NEXT_PUBLIC_DEBUG) {
        console.log('Updating user in local storage');
    }

    if (typeof window === 'undefined') {
        return;
    }
    localStorage.setItem(userKey, JSON.stringify(user));
};

export const removeStoredUser = () => {
    if (process.env.NEXT_PUBLIC_DEBUG) {
        console.log('Removing user from local storage');
    }

    if (typeof window === 'undefined') {
        return;
    }
    localStorage.removeItem(userKey);
};
