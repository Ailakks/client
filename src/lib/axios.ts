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
  const url = config.url?.startsWith('http') ? config.url: `${ProxyAxiosClient.defaults.baseURL?.replace(/\/$/, '')}/${config.url?.replace(/^v9\//, '')}`;
  const query = config.params ? `?${new URLSearchParams(config.params as any).toString()}` : '';

  config.url = `https://corsproxy.io/?url=${encodeURI(`${url}${query}`)}`;

  delete config.params;

  return config;
});

export const useProxyAxiosClient = makeUseAxios({
    axios: ProxyAxiosClient
})