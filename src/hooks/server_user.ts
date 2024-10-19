import getMe from '@/actions/me';
import useSWR from 'swr';

export default function useServerUser() {
    const { data, error, isLoading } = useSWR('getMe', getMe, {
        revalidateOnFocus: false,
    });

    return {
        serverUser: data,
        isServerUserLoading: isLoading,
        serverUserError: error,
    };
}
