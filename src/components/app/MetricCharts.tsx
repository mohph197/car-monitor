import { MetricType } from '@/types/metric';
import DatePicker from './DatePicker';
import MainChart from './MainChart';
import { MetricFilterContext } from '@/context/MetricFilterContext';
import { useContext } from 'react';

export default function MetricCharts({
    metric,
}: Readonly<{ metric: MetricType }>) {
    const { dateRange } = useContext(MetricFilterContext);

    return (
        <div>
            <div className="flex justify-start gap-4">
                <div className="flex gap-3 items-center">
                    <span className="text-nowrap">Time Frame</span>
                    <DatePicker />
                </div>
            </div>
            {dateRange ? (
                <div className="flex flex-col items-stretch">
                    <MainChart metric={metric} />
                </div>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <p className="text-2xl text-gray-500">
                        Select a time frame
                    </p>
                </div>
            )}
        </div>
    );
}
