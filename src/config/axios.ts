import axios from 'axios';
import {
    getAccessToken,
    getRefreshToken,
    removeTokens,
    updateAccessToken,
} from '@/lib/storage/tokens';
import { removeStoredUser } from '@/lib/storage/user';

// Create an axios instance for public routes.
export const publicAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Create an axios instance for protected routes.
export const protectedAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the access token to the request.
protectedAxiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        const controller = new AbortController();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            if (process.env.NEXT_PUBLIC_DEBUG) {
                console.error('No access token found');
            }
            controller.abort();
        }

        config.signal = controller.signal;
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh.
protectedAxiosInstance.interceptors.response.use(
    (response) => response, // Directly return successful responses.
    async (error) => {
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }

        // Save the original request for later retry.
        const originalConfig = error.config;

        // If the error is 401 Unauthorized and the request has not been retried yet.
        //  -> Launch a token refresh request.
        if (error.response.status === 401 && !originalConfig._retried) {
            originalConfig._retried = true;
            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                if (process.env.NEXT_PUBLIC_DEBUG) {
                    console.error('No refresh token found');
                }
                removeStoredUser();
                removeTokens();
                window.location.reload();
                return Promise.reject(error);
            }

            return publicAxiosInstance
                .post('/auth/jwt/refresh', {
                    refresh: refreshToken,
                })
                .then((res) => {
                    // If the token refresh is successful -> update the access token
                    // and retry the original request.
                    const { access: accessToken } = res.data;
                    updateAccessToken(accessToken);
                    originalConfig.headers.Authorization = `Bearer ${accessToken}`;
                    return protectedAxiosInstance(originalConfig);
                })
                .catch((err) => {
                    if (process.env.NEXT_PUBLIC_DEBUG) {
                        console.error('Token refresh failed:', err);
                    }
                    removeStoredUser();
                    removeTokens();
                    window.location.reload();
                    return Promise.reject(err);
                });
        }

        // Else -> Return the error response as is.
        return Promise.reject(error);
    }
);
