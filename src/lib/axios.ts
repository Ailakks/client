import axios from 'axios';
import { makeUseAxios } from 'axios-hooks'
import { getCookie } from './cookies';

export const AxiosClient = axios.create({ baseURL: 'https://discord.com/api/v9', headers: { Authorization: `${getCookie('token')}` } });

export const useAxiosClient = makeUseAxios({
    axios: AxiosClient
})

export const ProxyAxiosClient = axios.create({
  ...AxiosClient.defaults,
});

ProxyAxiosClient.interceptors.request.use((config) => {
    const target = `${AxiosClient.defaults.baseURL}${config.url || ''}`;
    const fullUrl = config.params
        ? `${target}?${new URLSearchParams(config.params as any).toString()}`
        : target;

    config.url = `https://corsproxy.io/?url=${encodeURIComponent(fullUrl)}`;

    delete config.params;

    return config;
});

export const useProxyAxiosClient = makeUseAxios({
    axios: ProxyAxiosClient
})