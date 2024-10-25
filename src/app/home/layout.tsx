import NavBar from '@/components/app/NavBar';
import SideBar from '@/components/app/SideBar';

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex items-stretch h-screen w-screen">
            <SideBar />
            <div className="flex flex-1 flex-col items-stretch min-w-0">
                <NavBar />
                <div className="flex-1 min-w-0 overflow-x-auto">{children}</div>
            </div>
        </div>
    );
}
