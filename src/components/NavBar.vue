<script setup>
import Logo from './Logo.vue';
</script>

<template>
    <nav class="navbar">
        <Logo />
        <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#tours">Virtual Tours</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <button class="cta-btn">Get Started</button>
    </nav>
</template>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 48px;
    background: rgba(5, 5, 5, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-links {
    display: flex;
    gap: 32px;
}

.nav-links a {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.85;
    transition: opacity 0.2s, color 0.2s;
}

.nav-links a:hover {
    opacity: 1;
    color: var(--primary);
}

.cta-btn {
    background: var(--primary);
    color: #050505;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.cta-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 212, 255, 0.4);
}
</style>