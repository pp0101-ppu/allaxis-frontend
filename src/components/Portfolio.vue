<script setup>
import { ref, onMounted } from 'vue';
import api from '../api/axios';

const projects = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        const response = await api.get('/portfolio-items');
        projects.value = response.data.data;
    } catch (err) {
        error.value = 'Failed to load portfolio.';
        console.error(err);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <section class="portfolio" id="portfolio">
        <div class="section-header">
            <h2>Our Work</h2>
            <p>A closer look at what we've built.</p>
        </div>

        <div v-if="loading" class="state-message">Loading portfolio...</div>
        <div v-else-if="error" class="state-message">{{ error }}</div>
        <div v-else-if="projects.length === 0" class="state-message">No portfolio items added yet.</div>

        <div v-else class="portfolio-grid">
            <div class="portfolio-card" v-for="project in projects" :key="project.id">
                <img :src="project.cover_image" :alt="project.title" />
                <div class="overlay">
                    <span class="category">{{ project.category || 'Project' }}</span>
                    <h3>{{ project.title }}</h3>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.portfolio {
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

.portfolio-grid {
    columns: 2;
    column-gap: 24px;
}

.portfolio-card {
    position: relative;
    break-inside: avoid;
    margin-bottom: 24px;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
}

.portfolio-card img {
    width: 100%;
    transition: transform 0.5s ease;
}

.portfolio-card:hover img {
    transform: scale(1.08);
}

.overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 24px;
    background: linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.portfolio-card:hover .overlay {
    opacity: 1;
}

.category {
    color: var(--primary);
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 6px;
}

.overlay h3 {
    font-size: 1.2rem;
}

@media (max-width: 768px) {
    .portfolio-grid {
        columns: 1;
    }
}
</style>