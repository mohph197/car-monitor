import { protectedAxiosInstance } from '@/config/axios';
import { UserType } from '@/types/user';

export default async function getMe(): Promise<UserType | undefined> {
    if (process.env.NEXT_PUBLIC_DEBUG) {
        console.log('Getting user from server');
    }

    return protectedAxiosInstance
        .get('/accounts/me')
        .then<UserType>((res) => {
            if (process.env.NEXT_PUBLIC_DEBUG) {
                console.log('User found:', res.data);
            }
            return {
                id: res.data.id,
                email: res.data.email,
                firstName: res.data.first_name,
                lastName: res.data.last_name,
                role: res.data.user_type == 1 ? 'manager' : 'operator',
                teams: res.data.profile.teams ?? [],
            };
        })
        .catch(() => {
            return undefined;
        });
}
