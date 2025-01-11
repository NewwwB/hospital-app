import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});
// Add the token to every request header
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage (or cookies)

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to the Authorization header
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
