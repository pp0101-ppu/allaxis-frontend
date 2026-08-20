import { defineStore } from 'pinia';
import api from '../api/axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('admin_token') || null,
        user: null,
    }),

    actions: {
        async login(email, password) {
            const response = await api.post('/login', {
                email,
                password,
            });

            this.token = response.data.token;
            this.user = response.data.user;

            localStorage.setItem('admin_token', this.token);

            return response;
        },

        logout() {
            this.token = null;
            this.user = null;

            localStorage.removeItem('admin_token');
        },
    },
});