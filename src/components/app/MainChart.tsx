import { MetricType } from '@/types/metric';
import React, { useContext, useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MachineDataContext } from '@/context/MachineDataConext';
import Loader from './Loader';
import { lineChartColors } from '@/config/consts';

ChartJS.register(
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function MainChart({
    metric,
}: Readonly<{
    metric: MetricType;
}>) {
    const { machineData } = useContext(MachineDataContext);
    const [chartData, setChartData] = useState<ChartData<'line'>>();
    const [machineColors, setMachineColors] = useState<{
        [key: string]: string;
    }>({});

    useEffect(() => {
        if (machineData.length === 0) {
            return;
        }

        const labels = Array.from(
            new Set(
                machineData.map((record) => {
                    const recordDate = new Date(record.timestamp);
                    return `${recordDate.getHours()}:${recordDate.getMinutes()}:${recordDate.getSeconds()}`;
                })
            )
        );
        const machineIds = Array.from(
            new Set(machineData.map((record) => record.machine_id))
        );

        const newMachineColors: { [key: string]: string } = {};
        const datasets = machineIds.map((machineId, machineIndex) => {
            const data = machineData
                .filter((record) => record.machine_id === machineId)
                .map((record) => record[metric.id]);
            const machineName = `Machine ${machineId}`;
            const machineColor =
                lineChartColors[machineIndex % lineChartColors.length];
            newMachineColors[machineName] = machineColor;
            return {
                label: machineName,
                data: data,
                fill: false,
                borderColor: machineColor,
                tension: 0.1,
            };
        });

        const data = {
            labels: labels,
            datasets: datasets,
        };

        setChartData(data);
        setMachineColors(newMachineColors);
    }, [machineData]);

    return (
        <div className="flex flex-col items-stretch">
            <div className="flex flex-col gap-4 my-4">
                <h2 className="text-[#475569] font-semibold text-xl">
                    Comparative Chart - {metric.name}
                </h2>
                <div className="flex gap-4 max-w-full">
                    <div className="flex-1">
                        {chartData ? (
                            <Line
                                data={chartData}
                                options={{
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                }}
                            />
                        ) : (
                            <Loader />
                        )}
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl border border-[#E2E8F0] p-4 min-w-max bg-[#F8FAFC] self-start">
                        <span className="text-[#64748B] font-medium">
                            Machine Names
                        </span>
                        <div className="h-2"></div>
                        {Object.entries(machineColors).map(
                            ([machineName, machineColor]) => (
                                <div
                                    key={machineName}
                                    className="flex items-center gap-2"
                                >
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{
                                            backgroundColor: machineColor,
                                        }}
                                    ></div>
                                    <span>{machineName}</span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <hr />
            <h2 className="text-[#475569] font-semibold text-xl py-3">
                Monitoring per machine
            </h2>
            <div className="grid grid-cols-2 gap-4">
                {chartData?.datasets.map((dataset, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-4 p-4 rounded-xl border border-[#E2E8F0]"
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="w-4 h-4 rounded-full"
                                style={{
                                    backgroundColor: dataset.label
                                        ? machineColors[dataset.label]
                                        : '',
                                }}
                            ></div>
                            <span className="text-[#475569] font-semibold text-lg">
                                {dataset.label}
                            </span>
                        </div>
                        <div className="w-full">
                            <Line
                                data={{
                                    labels: chartData.labels,
                                    datasets: [dataset],
                                }}
                                options={{
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
