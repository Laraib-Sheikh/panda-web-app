import axios from 'axios';
import { store } from '@/redux/store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

// 🔒 Auto-attach token
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token || localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
