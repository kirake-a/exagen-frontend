import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8081/api/v1';

const exagenApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

exagenApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);
export default exagenApiClient;
