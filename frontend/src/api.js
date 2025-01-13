import axios from 'axios';


const URL= process.env.BACKEND_URL;
if(!URL) console.error(URL + ": BACKEND_URL is required" );

const api = axios.create({
    baseURL: `${URL}/api`,
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
