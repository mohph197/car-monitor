import { UserType } from '@/types/user';

const userKey = '@user';

export function getUserInfo(): UserType | undefined {
    const userJson = localStorage.getItem(userKey);
    if (userJson) {
        return JSON.parse(userJson);
    }
    return;
}

export const updateUser = (user: UserType) => {
    localStorage.setItem(userKey, JSON.stringify(user));
};

export const removeUser = () => {
    localStorage.removeItem(userKey);
};
