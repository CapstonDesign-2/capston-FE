import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://benchcom.duckdns.org/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;