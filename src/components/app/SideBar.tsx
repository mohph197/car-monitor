import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import Link from 'next/link';
import SideBarCategory from './SidaBarCategory';
import { machines } from '@/config/consts';

export default function SideBar() {
    return (
        <aside className="flex flex-col items-stretch w-72 bg-[#F8FAFC]">
            <Link className="p-4" href="/home">
                <Image src={Logo} alt="Logo" />
            </Link>
            <SideBarCategory
                title="Main KPIs"
                elements={[
                    {
                        name: 'Energy',
                        icon: 'power.svg',
                        route: '/kpis/energy',
                    },
                    { name: 'Energy', icon: 'power.svg', route: '/energy' },
                    { name: 'Energy', icon: 'power.svg', route: '/energy' },
                    { name: 'Energy', icon: 'power.svg', route: '/energy' },
                ]}
            />
            <SideBarCategory
                title="Machine Types"
                elements={machines.map((machine) => ({
                    name: `${machine.name}s`,
                    icon: `${machine.id}.svg`,
                    route: `/home/${machine.id}`,
                }))}
            />
        </aside>
    );
}
