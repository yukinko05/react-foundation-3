import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://railway.bookreview.techtrain.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
