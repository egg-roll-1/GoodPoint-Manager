import axios from 'axios';
import { BASE_URL } from '../../../../env';
import { getAccessToken } from '../hooks/useAuthStore';

export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

export const authAxios = axios.create({
  baseURL: BASE_URL,
});

authAxios.interceptors.request.use((config) => {
  const token = getAccessToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
