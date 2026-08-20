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
    <a href="#portfolio" class="btn-primary">
        Explore Our Work
    </a>

    <a href="#contact" class="btn-secondary">
        Book a Free Demo
    </a>
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
    isolation: isolate;
    background: transparent;
}

.hero-content {
    max-width: 800px;
    position: relative;
    z-index: 2;
}
.hero-title {
    background: linear-gradient(135deg, #ffffff 30%, var(--primary-light));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
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
    color: white;
}
.btn-primary:hover {
    box-shadow: 0 8px 24px rgba(0, 102, 255, 0.4);
}
.btn-secondary {
    background: transparent;
    color: #ffffff;
    border: 1px solid rgba(248, 243, 243, 0.2);
}

.btn-secondary:hover {
    border-color: var(--primary);
    color: var(--primary-light);
}
</style>