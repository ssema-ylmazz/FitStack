import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://fitstack-a5v0.onrender.com',
});

export default api;