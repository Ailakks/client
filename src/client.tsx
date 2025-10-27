import axios from 'axios';

export const AxiosClient = axios.create({ baseURL: 'https://discord.com/api/v9' });