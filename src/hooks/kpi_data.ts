import getKPIData from '@/actions/kpi_data';
import useSWR from 'swr';

export default function useKPIData(kpi: string) {
    const { data, error, isLoading } = useSWR(
        `getKPIData-${kpi}`,
        async () => getKPIData(kpi),
        {
            revalidateOnFocus: false,
            revalidateOnMount: true,
        }
    );

    return {
        kpiData: data,
        isKpiDataLoading: isLoading,
        kpiDataError: error,
    };
}
