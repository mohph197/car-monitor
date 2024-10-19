import Image from 'next/image';

export default function SideBar() {
    return (
        <aside className="flex flex-col items-stretch p-5">
            <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        </aside>
    );
}
