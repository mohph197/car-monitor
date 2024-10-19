import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import Loader from './Loader';

export default function AuthLoader({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { isAuthLoading } = useContext(AuthContext);

    if (isAuthLoading) {
        return <Loader />;
    }

    return <>{children}</>;
}
