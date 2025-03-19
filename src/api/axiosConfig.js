import axios from 'axios';

const API_URL = 'https://magiclogbackend.onrender.com/';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Agrega el token en cada petición si existe
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;