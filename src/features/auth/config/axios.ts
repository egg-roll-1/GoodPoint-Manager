import axios from 'axios';
import { BASE_URL } from '../../../../env';
import { accessTokenKey } from '../hooks/useAuth';

export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

export const authAxios = axios.create({
  baseURL: BASE_URL,
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem(accessTokenKey);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
