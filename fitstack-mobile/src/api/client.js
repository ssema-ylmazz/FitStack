import axios from 'axios';
import { API_BASE_URL } from '../constants/config';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

client.interceptors.request.use((config) => {
  // Token support can be added here later with AsyncStorage/AuthContext.
  return config;
});

export default client;
