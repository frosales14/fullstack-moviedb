import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Create axios instance with default config
const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
        timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request interceptor
    instance.interceptors.request.use(
        (config) => {
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (error) => {
            if (error.response) {
                console.error('API Error:', error.response.data);
            } else if (error.request) {
                console.error('Network Error:', error.request);
            } else {
                console.error('Error:', error.message);
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

// Create the main API instance
export const apiClient = createAxiosInstance();

// Generic API wrapper functions
export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
}; 