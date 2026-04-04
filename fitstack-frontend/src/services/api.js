
import axios from 'axios';

const api = axios.create({
    // ESKİ HALİ: 'http://localhost:3000/api' veya yanlış bir vercel linki olabilir
    // YENİ HALİ (Bunu yapıştır):
    baseURL: 'https://fitstack-a5v0.onrender.com', 
});

export default api;