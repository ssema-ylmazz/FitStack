import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fitstack-api-senin-domainin.vercel.app', // Kendi API linkini yazmayı unutma!
});

export default api;