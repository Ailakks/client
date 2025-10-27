import axios from 'axios';
import { getCookie } from './cookies';

export const AxiosClient = axios.create({ baseURL: 'https://discord.com/api/v9', headers: { Authorization: `Bearer ${getCookie('token')}` } });