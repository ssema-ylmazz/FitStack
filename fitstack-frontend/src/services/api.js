import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fitstack-a5v0.onrender.com',
});

export default api;