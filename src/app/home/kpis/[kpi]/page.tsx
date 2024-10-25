import KPIChart from '@/components/app/KPIChart';
import { kpis } from '@/config/consts';

export default function KPIPage({
    params,
}: Readonly<{ params: { kpi: string } }>) {
    const kpiInfo = kpis.find((m) => m.id === params.kpi);

    return (
        <main>
            {kpiInfo ? (
                <div className="flex flex-col items-stretch px-6 gap-2">
                    <h2 className="text-3xl font-bold">{kpiInfo.name}</h2>
                    <KPIChart kpi={kpiInfo} />
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-2xl text-gray-500">KPI not found</p>
                </div>
            )}
        </main>
    );
}
