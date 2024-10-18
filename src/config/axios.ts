import axios from 'axios';
import { getAccessToken } from '@/lib/tokens';

const AxiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
});

AxiosInstance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
});

export default AxiosInstance;
