'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { metrics } from '@/config/consts';
import MetricCharts from './MetricCharts';
import { MachineType } from '@/types/machine';
import { useContext, useEffect, useState } from 'react';
import { MachineDataContext } from '@/context/MachineDataConext';
import useSWR from 'swr';
import getSensorLogs from '@/actions/sender_logs';
import { MetricFilterContext } from '@/context/MetricFilterContext';

export default function TabBar({
    machine,
}: Readonly<{ machine: MachineType }>) {
    const { dateRange } = useContext(MetricFilterContext);
    const { setMachineData } = useContext(MachineDataContext);
    const machineMetrics = metrics.filter(
        (metric) => metric.machine === machine.id
    );
    const [dataInterval, setDataInterval] = useState<NodeJS.Timeout>();

    useEffect(() => {
        if (!dateRange) {
            setMachineData([]);
            return;
        }

        if (dataInterval) {
            clearInterval(dataInterval);
        }

        function updateData() {
            getSensorLogs(machine.id, dateRange?.from, dateRange?.to).then(
                (data) => {
                    if (data) {
                        setMachineData(data);
                    } else {
                        setMachineData([]);
                    }
                }
            );
        }

        updateData();
        const interval = setInterval(() => {
            updateData();
        }, 20000);

        setDataInterval(interval);
    }, [dateRange]);

    return machineMetrics.length > 0 ? (
        <Tabs defaultValue={machineMetrics[0].id}>
            <TabsList>
                {machineMetrics.map((metric) => (
                    <TabsTrigger key={metric.id} value={metric.id}>
                        {metric.name}
                    </TabsTrigger>
                ))}
            </TabsList>
            {machineMetrics.map((metric) => (
                <TabsContent
                    key={metric.id}
                    value={metric.id}
                    className="space-y-2 p-4"
                >
                    <MetricCharts metric={metric} />
                </TabsContent>
            ))}
        </Tabs>
    ) : (
        <div className="flex justify-center items-center h-64">
            <p className="text-2xl text-gray-500">No metrics available</p>
        </div>
    );
}
