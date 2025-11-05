import axios from 'axios';
import { makeUseAxios } from 'axios-hooks'
import { getCookie } from './cookies';

export const AxiosClient = axios.create({ baseURL: 'https://discord.com/api/v9', headers: { Authorization: `${getCookie('token')}` } });

export const useAxiosClient = makeUseAxios({
  axios: AxiosClient
})