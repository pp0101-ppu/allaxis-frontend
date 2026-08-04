<script setup>
import { ref, onMounted } from 'vue';
import api from '../api/axios';

const testimonials = ref([]);
const loading = ref(true);

onMounted(async () => {
    try {
        const response = await api.get('/testimonials');
        testimonials.value = response.data.data;
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <section class="testimonials" id="testimonials">
        <div class="section-header">
            <h2>What Clients Say</h2>
        </div>

        <div v-if="loading" class="state-message">Loading testimonials...</div>
        <div v-else-if="testimonials.length === 0" class="state-message">No testimonials added yet.</div>

        <div v-else class="marquee-wrapper">
            <div class="marquee-track">
                <!-- Render the list twice so the loop appears seamless -->
                <div class="testimonial-card" v-for="t in [...testimonials, ...testimonials]" :key="t.id + '-' + Math.random()">
                    <p class="quote">"{{ t.quote }}"</p>
                    <div class="client">
                        <strong>{{ t.client_name }}</strong>
                        <span v-if="t.client_company">{{ t.client_company }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.testimonials {
    padding: 120px 0;
    overflow: hidden;
}

.section-header {
    text-align: center;
    margin-bottom: 64px;
    padding: 0 48px;
}

.section-header h2 {
    font-size: clamp(2rem, 4vw, 3rem);
}

.state-message {
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    padding: 40px;
}

.marquee-wrapper {
    width: 100%;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.marquee-track {
    display: flex;
    gap: 24px;
    width: max-content;
    animation: scroll 30s linear infinite;
}

.marquee-track:hover {
    animation-play-state: paused;
}

.testimonial-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 32px;
    width: 340px;
    flex-shrink: 0;
    backdrop-filter: blur(10px);
}

.quote {
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 20px;
}

.client strong {
    display: block;
    font-size: 0.95rem;
}

.client span {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
}

@keyframes scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
}
</style>