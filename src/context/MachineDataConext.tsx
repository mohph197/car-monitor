'use client';

import { createContext, useContext, useEffect, useState } from 'react';

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
