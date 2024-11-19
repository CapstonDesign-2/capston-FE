import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://benchcom.duckdns.org/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default axiosInstance;