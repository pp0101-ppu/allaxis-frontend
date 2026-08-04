<script setup>
import { ref, onMounted, nextTick } from 'vue';
import api from '../api/axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = ref([]);
const loading = ref(true);
const error = ref(null);

const iconMap = {
    '3d_mapping': '🗺️',
    'web_development': '💻',
     'digital_marketing': '📈',
};

onMounted(async () => {
    try {
        const response = await api.get('/services');
        services.value = response.data.data;
    } catch (err) {
        error.value = 'Failed to load services.';
        console.error(err);
    } finally {
        loading.value = false;
        await nextTick();
        animateCards();
    }
});

const animateCards = () => {
    const cards = document.querySelectorAll('.service-card');
    if (!cards.length) return;

    gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 85%',
            },
        }
    );
};
</script>

<template>
    <section class="services" id="services">
        <div class="section-header">
            <h2>What We Do</h2>
            <p>Three specializations. One commitment to precision.</p>
        </div>

        <div v-if="loading" class="state-message">Loading services...</div>
        <div v-else-if="error" class="state-message">{{ error }}</div>
        <div v-else-if="services.length === 0" class="state-message">No services added yet.</div>

        <div v-else class="services-grid">
            <div class="service-card" v-for="service in services" :key="service.id">
                <div class="card-icon">{{ iconMap[service.category] || '⚙️' }}</div>
                <h3>{{ service.title }}</h3>
                <p>{{ service.description }}</p>
            </div>
        </div>
    </section>
</template>

<style scoped>
.services {
    padding: 120px 48px;
    max-width: 1200px;
    margin: 0 auto;
}

.section-header {
    text-align: center;
    margin-bottom: 64px;
}

.section-header h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 12px;
}

.section-header p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.1rem;
}

.state-message {
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    padding: 40px;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
}

.service-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 40px 32px;
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.service-card:hover {
    transform: translateY(-8px);
    border-color: rgba(0, 212, 255, 0.4);
    box-shadow: 0 20px 60px rgba(0, 212, 255, 0.15);
}

.card-icon {
    font-size: 2.5rem;
    margin-bottom: 20px;
}

.service-card h3 {
    font-size: 1.3rem;
    margin-bottom: 12px;
}

.service-card p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.95rem;
    line-height: 1.6;
}
</style>