import axios from 'axios';

/** Axios örneği — 17 gereksinim bağlanana kadar yalnızca yapılandırma. */
const client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
