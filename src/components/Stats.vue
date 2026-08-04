<script setup>
import { ref, onMounted } from 'vue';

const stats = [
    { label: 'Projects Completed', target: 10, suffix: '+' },
    { label: 'Happy Clients', target: 25, suffix: '+' },
    
    { label: 'Client Satisfaction', target: 99, suffix: '%' },
];

const counts = ref(stats.map(() => 0));
const sectionRef = ref(null);
let hasAnimated = false;

const animateCounters = () => {
    if (hasAnimated) return;
    hasAnimated = true;

    stats.forEach((stat, index) => {
        const duration = 1500;
        const startTime = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            counts.value[index] = Math.floor(progress * stat.target);

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                counts.value[index] = stat.target;
            }
        };
        requestAnimationFrame(tick);
    });
};

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
            }
        },
        { threshold: 0.3 }
    );
    observer.observe(sectionRef.value);
});
</script>

<template>
    <section class="stats" ref="sectionRef">
        <div class="stat-item" v-for="(stat, index) in stats" :key="stat.label">
            <div class="stat-number">{{ counts[index] }}{{ stat.suffix }}</div>
            <div class="stat-label">{{ stat.label }}</div>
        </div>
    </section>
</template>

<style scoped>
.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 32px;
    max-width: 1000px;
    margin: 0 auto;
    padding: 80px 48px;
    text-align: center;
}

.stat-number {
    font-family: var(--font-heading);
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 8px;
}

.stat-label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.95rem;
}
</style>