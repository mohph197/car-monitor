import { protectedAxiosInstance } from '@/config/axios';
import { KPIType } from '@/types/kpi-data';

export default async function getKPIData(kpi: string): Promise<
    | {
          history: KPIType[];
          predicted: KPIType[];
      }
    | undefined
> {
    if (process.env.NEXT_PUBLIC_DEBUG) {
        console.log('Getting KPI data from server');
    }

    return protectedAxiosInstance
        .get<{
            history: {
                timestamp: string;
                kpi_value: number;
                status: boolean;
            }[];
            predicted: {
                timestamp: string;
                kpi_value: number;
                status: boolean;
            }[];
        }>(`/kpi/list`, {
            params: {
                kpi_name: kpi,
            },
        })
        .then((res) => {
            if (process.env.NEXT_PUBLIC_DEBUG) {
                console.log('Got KPI data:', res.data);
            }

            return {
                history: res.data.history.map((m) => ({
                    timestamp: new Date(m.timestamp),
                    value: m.kpi_value,
                    status: m.status,
                })),
                predicted: res.data.predicted.map((m) => ({
                    timestamp: new Date(m.timestamp),
                    value: m.kpi_value,
                    status: m.status,
                })),
            };
        })
        .catch((error) => {
            if (process.env.NEXT_PUBLIC_DEBUG) {
                console.error('getKPIData error:', error);
            }
            return undefined;
        });
}
