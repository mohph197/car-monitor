'use client';

import useKPIData from '@/hooks/kpi_data';
import Loader from './Loader';
import { useEffect, useState } from 'react';
import { KPIType } from '@/types/kpi-data';
import {
    bind_channel_event,
    subscribe_channel,
    unbind_all_channel_events,
} from '@/lib/pusher';
import { Line } from 'react-chartjs-2';
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

export default function KPIChart({
    kpi,
}: Readonly<{
    kpi: {
        name: string;
        id: string;
    };
}>) {
    const [historyKPIData, setHistoryKPIData] = useState<
        KPIType[] | undefined
    >();
    const [predictedKPIData, setPredictedKPIData] = useState<
        KPIType[] | undefined
    >();
    const { kpiData, isKpiDataLoading, kpiDataError } = useKPIData(kpi.name);
    const [chartData, setChartData] = useState<ChartData<'line'>>();

    useEffect(() => {
        if (!kpiData) return;

        setHistoryKPIData(kpiData.history);
        setPredictedKPIData(kpiData.predicted);

        subscribe_channel(kpi.id);
        unbind_all_channel_events(kpi.id);
        bind_channel_event(kpi.id, 'new_data', (data) => {
            console.log('Got real-time data');
            setHistoryKPIData((prev) => {
                return [
                    ...(prev ?? []).slice(1),
                    {
                        timestamp: new Date(data['history'].timestamp),
                        value: data['history'].kpi_value,
                        status: data['history'].status,
                    },
                ];
            });
            setPredictedKPIData(
                data['predicted'].map((m: any) => ({
                    timestamp: new Date(m.timestamp),
                    value: m.kpi_value,
                    status: m.status,
                }))
            );
        });
    }, [kpiData, kpi.id]);

    useEffect(() => {
        if (!historyKPIData) return;

        const dateLabels = (historyKPIData ?? [])
            .concat(predictedKPIData ?? [])
            .map((record) => record.timestamp);
        const labels = dateLabels.map((recordDate) => {
            return `${recordDate.getHours()}:${recordDate.getMinutes()}:${recordDate.getSeconds()}`;
        });

        const historyData = dateLabels.map((recordDate) => {
            const record = historyKPIData?.find(
                (record) => record.timestamp === recordDate
            );
            return record?.value ?? null;
        });
        const predictedData = dateLabels.map((recordDate) => {
            const record = predictedKPIData?.find(
                (record) => record.timestamp === recordDate
            );
            return record?.value ?? null;
        });

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'history',
                    data: historyData,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
                {
                    label: 'predicted',
                    data: predictedData,
                    fill: false,
                    borderColor: 'rgb(192, 75, 192)',
                    tension: 0.1,
                },
            ],
        };

        setChartData(data);
    }, [historyKPIData, predictedKPIData]);

    return isKpiDataLoading ? (
        <Loader />
    ) : kpiDataError ? (
        <p className="text-2xl text-gray-500">Error loading KPI data</p>
    ) : chartData ? (
        <Line
            data={chartData}
            options={{
                animation: {
                    duration: 0,
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            }}
        />
    ) : (
        <Loader />
    );
}
