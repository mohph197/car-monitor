import { machines } from '@/config/consts';
import MachineDetails from '@/containers/machine/page';

export default function MachinePage({
    params,
}: Readonly<{ params: { machine: string } }>) {
    const machineInfo = machines.find((m) => m.id === params.machine);

    return (
        <main>
            {machineInfo ? (
                <MachineDetails machine={machineInfo} />
            ) : (
                <div>Machine not found</div>
            )}
        </main>
    );
}
