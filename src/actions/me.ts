import AxiosInstance from '@/config/axios';
import { UserType } from '@/types/user';

export default async function getMe(): Promise<UserType | undefined> {
    const res = await AxiosInstance.get('/accounts/me');

    if (res.status !== 200) {
        return;
    }

    return {
        id: res.data.id,
        email: res.data.email,
        firstName: res.data.first_name,
        lastName: res.data.last_name,
        role: res.data.user_type == 1 ? 'manager' : 'operator',
        teams: res.data.profile.teams ?? [],
    };
}
