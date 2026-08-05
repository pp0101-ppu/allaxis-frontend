import axios from 'axios';

const api = axios.create({
    baseURL: 'https://allaxis-backend-production.up.railway.app/api/',
});

export default api;