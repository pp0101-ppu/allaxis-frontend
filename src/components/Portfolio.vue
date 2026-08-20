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
            <span class="eyebrow">Our Work</span>
            <h2>A closer look at what we've built</h2>
        </div>

        <div v-if="loading" class="state-message">Loading portfolio...</div>
        <div v-else-if="error" class="state-message">{{ error }}</div>
        <div v-else-if="projects.length === 0" class="state-message">No portfolio items added yet.</div>

        <div v-else class="portfolio-grid">
            <div class="portfolio-card" v-for="project in projects" :key="project.id">
                <div class="image-wrap">
                    <img
                        v-if="project.cover_image"
                        :src="project.cover_image"
                        :alt="project.title"
                    />
                    <div v-else class="image-placeholder">📷</div>
                </div>
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
    background: var(--bg-light);
}

.section-header {
    text-align: center;
    margin-bottom: 56px;
}

.eyebrow {
    display: inline-block;
    color: var(--primary);
    font-weight: 1000;
    font-size: 3rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 12px;
}

.section-header h2 {
    font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    color: var(--text-dark);
}

.state-message {
    text-align: center;
    color: var(--text-muted);
    padding: 40px;
}

.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
}

.portfolio-card {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(10, 14, 26, 0.06);
}

.image-wrap {
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #eef1f6;
}

.image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.5s ease;
}

.portfolio-card:hover .image-wrap img {
    transform: scale(1.08);
}

.image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: rgba(10, 14, 26, 0.2);
}

.overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
    background: linear-gradient(to top, rgba(5,5,5,0.85) 0%, transparent 55%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.portfolio-card:hover .overlay {
    opacity: 1;
}

.category {
    color: var(--primary-light);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
}

.overlay h3 {
    font-size: 1.05rem;
    color: white;
}
</style>