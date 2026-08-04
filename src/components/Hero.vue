<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import ParticleBackground from './ParticleBackground.vue';

onMounted(() => {
    gsap.fromTo('.hero-content > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out', delay: 0.3 }
    );
});
</script>

<template>
    <section class="hero" id="home">
        <ParticleBackground />
        <div class="hero-content">
            <h1 class="hero-title">Where Vision Meets Every Dimension</h1>
            <p class="hero-subtitle">
                3D Mapping · Web Development · Technology Solutions —
                engineering every dimension of your digital world.
            </p>
            <div class="hero-actions">
                <button class="btn-primary">Explore Our Work</button>
                <button class="btn-secondary">Book a Demo</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 120px 24px 24px;
    position: relative;
    overflow: hidden;
    background: radial-gradient(circle at 50% 30%, rgba(122, 95, 255, 0.15), transparent 60%);
}

.hero-content {
    max-width: 800px;
    position: relative;
    z-index: 2;
}

.hero-title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #ffffff 30%, var(--primary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 24px;
}

.hero-subtitle {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 40px;
}

.hero-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
    padding: 14px 32px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 15px;
    border: none;
    transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary {
    background: var(--primary);
    color: #050505;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 212, 255, 0.4);
}

.btn-secondary {
    background: transparent;
    color: var(--accent);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
    border-color: var(--primary);
    color: var(--primary);
}
</style>