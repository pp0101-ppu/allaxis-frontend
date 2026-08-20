<script setup>
import { useAuthStore } from '../../stores/auth';
import { useRouter, RouterLink } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
    authStore.logout();
    router.push('/admin/login');
};
</script>

<template>
    <div class="admin-layout">
        <aside class="sidebar">
            <h2 class="brand">AllAxis Admin</h2>
            <nav>
                <RouterLink to="/admin/services">Services</RouterLink>
                <RouterLink to="/admin/products">Products</RouterLink>
                <RouterLink to="/admin/portfolio">Portfolio</RouterLink>
                <RouterLink to="/admin/testimonials">Testimonials</RouterLink>
                <RouterLink to="/admin/inquiries">Inquiries</RouterLink>
                <RouterLink to="/admin/product-categories">Categories</RouterLink>
                <RouterLink to="/admin/clients">Clients</RouterLink>
            </nav>
            <button class="logout-btn" @click="handleLogout">Logout</button>
        </aside>
        <main class="content">
            <router-view />
        </main>
    </div>
</template>

<style scoped>
.admin-layout {
    display: flex;
    min-height: 100vh;
    background: var(--bg-color);
}
.sidebar {
    width: 220px;
    background: rgba(255,255,255,0.03);
    border-right: 1px solid rgba(5, 0, 0, 0.74);
    padding: 24px;
    display: flex;
    flex-direction: column;
}
.brand {
    font-size: 1.1rem;
    margin-bottom: 32px;
}
nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-grow: 1;
}
nav a {
    padding: 10px 12px;
    border-radius: 8px;
    color: rgba(17, 1, 1, 0.7);
    font-size: 0.9rem;
}
nav a:hover {
    background: rgba(255,255,255,0.05);
    color: rgb(19, 17, 17);
}
.logout-btn {
    background: transparent;
    border: 1px solid rgba(14, 1, 1, 0.15);
    color: rgba(24, 2, 2, 0.7);
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
}
.content {
    flex-grow: 1;
    padding: 40px;
    overflow-y: auto;
}
</style>