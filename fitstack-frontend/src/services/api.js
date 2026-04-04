import axios from 'axios';

const api = axios.create({
  // ÖNEMLİ: Buradaki adresi kendi REST API domain adresinle değiştir!
  baseURL: 'https://fitstack-api-sema.vercel.app', 
});

export default api;