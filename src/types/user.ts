export type UserType = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: 'manager' | 'operator';
    teams?: number[];
};
