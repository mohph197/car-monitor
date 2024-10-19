import Image from 'next/image';
import Logo from '@/assets/logo.svg';

export default function SideBar() {
    return (
        <aside className="flex flex-col items-stretch p-5">
            <Image src={Logo} alt="Logo" />
        </aside>
    );
}
