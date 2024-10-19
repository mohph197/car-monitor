import NavBar from '@/components/app/NavBar';
import SideBar from '@/components/app/SideBar';

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen h-screen">
            <SideBar />
            <div className="flex flex-col items-stretch w-full">
                <NavBar />
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
}
