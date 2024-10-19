import TabBar from '@/components/app/TabBar';
import { MachineDataProvider } from '@/context/MachineDataConext';
import { MetricFilterProvider } from '@/context/MetricFilterContext';
import { MachineType } from '@/types/machine';

export default function MachineDetails({
    machine,
}: Readonly<{ machine: MachineType }>) {
    return (
        <div className="flex flex-col items-stretch px-6 gap-2">
            <h2 className="text-3xl font-bold">{machine.name}</h2>
            <MetricFilterProvider>
                <MachineDataProvider>
                    <TabBar machine={machine} />
                </MachineDataProvider>
            </MetricFilterProvider>
        </div>
    );
}
