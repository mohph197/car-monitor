'use client';

import { SideBarElementType } from '@/types/side-bar-element-type';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function SideBarElement({
    element,
}: Readonly<{ element: SideBarElementType }>) {
    const pathname = usePathname();

    return (
        <li>
            <Link
                href={element.route}
                className={`flex flex-row gap-3 py-2 px-6 items-center rounded-xl hover:bg-[#E2E8F0] w-max ${
                    pathname === element.route ? 'bg-[#E2E8F0]' : ''
                }`}
            >
                <Image
                    src={`/assets/${element.icon}`}
                    width={24}
                    height={24}
                    alt={element.name}
                />
                <span className="text-base">{element.name}</span>
            </Link>
        </li>
    );
}
