<script setup>
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
    authStore.logout();
    router.push('/admin/login');
};
</script>

<template>
    <div class="dashboard">
        <h1>Admin Dashboard</h1>
        <button @click="handleLogout">Logout</button>
    </div>
</template>

<style scoped>
.dashboard {
    padding: 48px;
    color: rgb(20, 7, 7);
}
</style>