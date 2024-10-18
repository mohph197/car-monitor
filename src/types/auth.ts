import { UserType } from './user';

export type AuthType = {
    currentUser?: UserType;
    authLoading: boolean;
    updateCurrentUser: (user: UserType) => void;
    logOut: () => void;
};
