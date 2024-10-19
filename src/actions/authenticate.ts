import { publicAxiosInstance } from '@/config/axios';

export default async function postAuthenticate(
    email: string,
    password: string
): Promise<
    | {
          accessToken: string;
          refreshToken: string;
      }
    | undefined
> {
    if (process.env.NEXT_PUBLIC_DEBUG) {
        console.log('Getting user from server');
    }

    return publicAxiosInstance
        .post('/auth/jwt/create', {
            email,
            password,
        })
        .then((res) => {
            if (process.env.NEXT_PUBLIC_DEBUG) {
                console.log('postAuthenticate token:', res.data.access);
            }
            return {
                accessToken: res.data.access,
                refreshToken: res.data.refresh,
            };
        })
        .catch((error) => {
            console.error('postAuthenticate error:', error);
            return undefined;
        });
}
