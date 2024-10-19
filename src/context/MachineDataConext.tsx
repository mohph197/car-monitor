'use client';

import getSensorLogs from '@/actions/sender_logs';
import { MachineType } from '@/types/machine';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { MetricFilterContext } from './MetricFilterContext';

type MachineDataContextType = {
    machineData: any[];
    setMachineData: (machineData: any[]) => void;
};

export const MachineDataContext = createContext<MachineDataContextType>({
    machineData: [],
    setMachineData: () => {},
});

export function MachineDataProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [machineData, setMachineData] = useState<any[]>([]);

    return (
        <MachineDataContext.Provider value={{ machineData, setMachineData }}>
            {children}
        </MachineDataContext.Provider>
    );
}
