import axios from 'axios';

const api = axios.create({
    baseURL: 'https://allaxis-backend-production.up.railway.app/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.error(
                'API Error:',
                error.response.status,
                error.response.data
            );

            // Optional: clear invalid token
            if (error.response.status === 401) {
                localStorage.removeItem('admin_token');
            }
        } else if (error.request) {
            console.error('No response received from server:', error.request);
        } else {
            console.error('Axios Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;