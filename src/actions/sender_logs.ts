import { protectedAxiosInstance } from '@/config/axios';

export default async function getSensorLogs(
    machineId: string,
    startTime?: Date,
    endTime?: Date
): Promise<any> {
    if (process.env.NEXT_PUBLIC_DEBUG) {
        console.log('Getting sensor logs from server');
    }

    if (!startTime || !endTime) {
        return undefined;
    }

    return protectedAxiosInstance
        .get('/sensors-uploading/get-sensors-logs', {
            params: {
                machine_type: machineId,
                start_timestamp: startTime.getUTCDate(),
                end_timestamp: endTime.getUTCDate(),
            },
        })
        .then((res) => {
            if (process.env.NEXT_PUBLIC_DEBUG) {
                console.log('Got sensor logs from server');
            }
            return res.data;
        })
        .catch((error) => {
            if (process.env.NEXT_PUBLIC_DEBUG) {
                console.error('Error getting sensor logs from server', error);
            }
            return undefined;
        });
}
