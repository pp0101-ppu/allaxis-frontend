import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

import HomePage from '../views/HomePage.vue';
import AdminLogin from '../views/admin/AdminLogin.vue';
import AdminLayout from '../views/admin/AdminLayout.vue';
import ServicesAdmin from '../views/admin/ServicesAdmin.vue';
import ProductsAdmin from '../views/admin/ProductsAdmin.vue';
import ProductCategoriesAdmin from '../views/admin/ProductCategoriesAdmin.vue';
import PortfolioAdmin from '../views/admin/PortfolioAdmin.vue';
import TestimonialsAdmin from '../views/admin/TestimonialsAdmin.vue';
import InquiriesAdmin from '../views/admin/InquiriesAdmin.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/admin/login', component: AdminLogin },
    {
        path: '/admin',
        component: AdminLayout,
        meta: { requiresAuth: true },
        children: [
            { path: '', redirect: '/admin/services' },
            { path: 'services', component: ServicesAdmin },
            { path: 'products', component: ProductsAdmin },
            { path: 'product-categories', component: ProductCategoriesAdmin },
            { path: 'portfolio', component: PortfolioAdmin },
            { path: 'testimonials', component: TestimonialsAdmin },
            { path: 'inquiries', component: InquiriesAdmin },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation guard - blocks access to admin routes without a valid token
router.beforeEach((to, from) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.token) {
        return '/admin/login';
    }
});

export default router;