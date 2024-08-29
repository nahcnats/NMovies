import { useEffect, useState } from "react";
import { TMDB_BASE_URL } from "@env";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

type TAxios = {
    url: string,
    method: string,
    data?: object,
    params?: AxiosRequestConfig
}


const useAxios = <T>() => {
    const [response, setResponse] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const axiosInstance = axios.create({
        baseURL: TMDB_BASE_URL,
        headers: {
            Authorization: `Bearer `
        }
    });

    axiosInstance.interceptors.request.use((config) => {
        return config;
    }, (err) => {
        return Promise.reject(err);
    });

    axiosInstance.interceptors.response.use((response) => {
        return response;
    }, (err) => {
        return Promise.reject(err);
    });

    let controller = new AbortController();

    useEffect(() => {
        return () => controller?.abort();
    }, []);

    const fetchData = async ({ url, method, data, params } : TAxios) => {
        setLoading(true);

        controller.abort();
        controller = new AbortController();

        try {
            const result: AxiosResponse<T> = await axiosInstance({
                url,
                method,
                data,
                params,
                signal: controller.signal
            });

            setResponse(result.data);
        } catch (err: any) {
            if (axios.isCancel(err)) {
                console.error('Request cancelled', err.message);
            } else {
                setError(err?.response ? err.response.data : err.message);
            }
        } finally {
            setLoading(false); 
        }
    }

    return { response, error, loading, fetchData };
}

export default useAxios;