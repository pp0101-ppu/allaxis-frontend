<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '../api/axios';

const clients = ref([]);
const loading = ref(true);
const REPEAT = 6;

const repeatedClients = computed(() => {
    const result = [];
    for (let i = 0; i < REPEAT; i++) {
        result.push(...clients.value);
    }
    return result;
});

onMounted(async () => {
    try {
        const response = await api.get('/clients');
        clients.value = response.data.data;
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <section class="clients" id="clients">
        <div class="section-header">
            <span class="eyebrow">Our Clients</span>
            <h2>Trusted by businesses who expect precision</h2>
        </div>

        <div v-if="!loading && clients.length === 0" class="state-message">No clients added yet.</div>

        <div v-else-if="!loading" class="marquee-wrapper">
            <div class="marquee-track">
                <div class="client-logo" v-for="(c, i) in repeatedClients" :key="c.id + '-' + i">
                    <img :src="c.logo_path" :alt="c.name" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.clients {
    padding: 100px 0;
    background: var(--bg-light);
    overflow: hidden;
}

.section-header {
    text-align: center;
    margin-bottom: 48px;
    padding: 0 48px;
}

.eyebrow {
    display: inline-block;
    color: var(--primary);
    font-weight: 600;
    font-size: 3rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 12px;
}

.section-header h2 {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    color: var(--text-dark);
}

.state-message {
    text-align: center;
    color: var(--text-muted);
    padding: 20px;
}

.marquee-wrapper {
    width: 100%;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.marquee-track {
    display: flex;
    align-items: center;
    gap: 150px;
    width: max-content;
    animation: scroll-right 45s linear infinite;
    will-change: transform;
    padding: 12px 0;
}


.client-logo {
    flex-shrink: 0;
    height: 80px;
    display: flex;
    align-items: center;
}

.client-logo img {
    height: 100px;
    width: auto;
    object-fit: contain;
    filter: grayscale(100%);
    opacity: 0.6;
    transition: filter 0.3s ease, opacity 0.3s ease;
}

.client-logo img:hover {
    filter: grayscale(0%);
    opacity: 1;
}

@keyframes scroll-right {
    from { transform: translateX(-16.6667%); }
    to { transform: translateX(0); }
}
</style>