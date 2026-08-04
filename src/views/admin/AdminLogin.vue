<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
    loading.value = true;
    error.value = null;
    try {
        await authStore.login(email.value, password.value);
        router.push('/admin');
    } catch (err) {
        error.value = 'Invalid email or password.';
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="login-page">
        <form class="login-form" @submit.prevent="handleLogin">
            <h2>Admin Login</h2>
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit" :disabled="loading">
                {{ loading ? 'Logging in...' : 'Login' }}
            </button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<style scoped>
.login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-color);
}
.login-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 320px;
}
.login-form h2 {
    text-align: center;
    margin-bottom: 8px;
}
.login-form input {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 12px;
    color: var(--accent);
}
.login-form button {
    background: var(--primary);
    color: #050505;
    border: none;
    border-radius: 8px;
    padding: 12px;
    font-weight: 600;
    cursor: pointer;
}
.error {
    color: #f87171;
    font-size: 0.9rem;
    text-align: center;
}
</style>