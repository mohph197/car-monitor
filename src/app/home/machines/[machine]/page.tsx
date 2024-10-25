import TabBar from '@/components/app/TabBar';
import { machines } from '@/config/consts';
import { MachineDataProvider } from '@/context/MachineDataConext';
import { MetricFilterProvider } from '@/context/MetricFilterContext';

export default function MachinePage({
    params,
}: Readonly<{ params: { machine: string } }>) {
    const machineInfo = machines.find((m) => m.id === params.machine);

    return (
        <main>
            {machineInfo ? (
                <div className="flex flex-col items-stretch px-6 gap-2">
                    <h2 className="text-3xl font-bold">{machineInfo.name}</h2>
                    <MetricFilterProvider>
                        <MachineDataProvider>
                            <TabBar machine={machineInfo} />
                        </MachineDataProvider>
                    </MetricFilterProvider>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-2xl text-gray-500">Machine not found</p>
                </div>
            )}
        </main>
    );
}
