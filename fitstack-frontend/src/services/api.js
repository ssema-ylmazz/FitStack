import axios from 'axios';

const api = axios.create({
    // BURAYI DEĞİŞTİR: Kendi Render linkini koy (sonuna /api eklemeyi unutma)
    baseURL: 'https://proje-adiniz.onrender.com/api', 
});

export default api;