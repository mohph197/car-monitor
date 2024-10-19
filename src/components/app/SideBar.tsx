'use client';

import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import Logout from '@/assets/logout.svg';
import Link from 'next/link';
import SideBarCategory from './SidaBarCategory';
import { kpis, machines } from '@/config/consts';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function SideBar() {
    const { removeCurrentUser } = useContext(AuthContext);

    return (
        <aside className="flex flex-col items-stretch w-72 bg-[#F8FAFC]">
            <Link className="px-4 py-6" href="/home">
                <Image src={Logo} alt="Logo" />
            </Link>
            <hr />
            <SideBarCategory
                title="Main KPIs"
                elements={kpis.map((kpi) => ({
                    name: kpi.name,
                    icon: `${kpi.id}.svg`,
                    route: `/home/kpis/${kpi.id}`,
                }))}
            />
            <div className="h-6"></div>
            <hr />
            <SideBarCategory
                title="Machine Types"
                elements={machines.map((machine) => ({
                    name: `${machine.name}s`,
                    icon: `${machine.id}.svg`,
                    route: `/home/${machine.id}`,
                }))}
            />
            <button
                className="flex items-center gap-5 border border-red-500 rounded-lg m-4 px-4 py-2"
                onClick={removeCurrentUser}
            >
                <Image src={Logout} alt="Logout" />
                <span className="text-red-500 text-lg font-medium">
                    Log out
                </span>
            </button>
        </aside>
    );
}
