<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Logo from './Logo.vue';

const scrolled = ref(false);
const hidden = ref(false);
let lastScrollY = 0;

const handleScroll = () => {
    const currentY = window.scrollY;

    scrolled.value = currentY > window.innerHeight * 0.5;

    // Hide when scrolling down, show when scrolling up
    if (currentY > lastScrollY && currentY > 120) {
        hidden.value = true;
    } else {
        hidden.value = false;
    }

    lastScrollY = currentY;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
    <nav class="navbar" :class="{ scrolled, hidden }">
        <div class="navbar-content">
            <Logo />
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <!-- <li><router-link to="/products">Shop</router-link></li> -->
                <li><a href="#contact">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
           <a href="#contact" class="cta-btn">
    Get Started
</a>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    width: min(92%, 1200px);
    padding: 16px 32px;
    border-radius: 100px;
    background: rgba(15, 18, 28, 0.55);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease,
                opacity 0.35s ease, transform 0.35s ease;
    opacity: 1;
}

.navbar-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
}
.navbar-content :deep(.logo-img) {
    height: 52px;
    width: auto;
    display: block;
}
.navbar.hidden {
    opacity: 0;
    transform: translateX(-50%) translateY(-140%);
}

.navbar.scrolled {
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(10, 14, 26, 0.08);
    box-shadow: 0 8px 32px rgba(10, 14, 26, 0.1);
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 26px;
}

.nav-links a {
    font-size: 15px;
    font-weight: 500;
    color: var(--text-light);
    opacity: 0.85;
    transition: opacity 0.2s, color 0.2s;
}

.navbar.scrolled .nav-links a {
    color: var(--text-dark);
}

.nav-links a:hover {
    opacity: 1;
    color: var(--primary-light);
}

.navbar.scrolled .nav-links a:hover {
    color: var(--primary);
}

.cta-btn {
    background: var(--primary);
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 14px;
    white-space: nowrap;
    transition: transform 0.2s, box-shadow 0.2s;
}

.cta-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 102, 255, 0.35);
}

@media (max-width: 768px) {
    .nav-links {
        display: none;
    }
}
</style>