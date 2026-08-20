<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import ParticleBackground from './ParticleBackground.vue';

const rotatingTexts = [
    'Where Vision Meets Every Dimension',
    'Your Partner For Digital Excellence',
    'From Ideas To  Digital Reality',
    'Engineering Your Digital Future'
];

const currentText = ref(rotatingTexts[0]);

let textInterval = null;
let animation;

onMounted(() => {
    // Existing hero entrance animation
    gsap.fromTo(
        '.hero-content > *',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            delay: 0.3
        }
    );

    // Rotating headline
    textInterval = setInterval(() => {
        animation = gsap.timeline();

        animation
            .to('.hero-title', {
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    const currentIndex = rotatingTexts.indexOf(currentText.value);
                    const nextIndex =
                        (currentIndex + 1) % rotatingTexts.length;

                    currentText.value = rotatingTexts[nextIndex];
                }
            })
            .fromTo(
                '.hero-title',
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                }
            );
    }, 6500);
});

onUnmounted(() => {
    if (textInterval) {
        clearInterval(textInterval);
    }

    if (animation) {
        animation.kill();
    }
});
</script>

<template>
    <section class="hero" id="home">
        <ParticleBackground />

        <div class="hero-content">

            <h1 class="hero-title">
                {{ currentText }}
            </h1>

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
    width: 100%;
    max-width: 900px;

    position: relative;
    z-index: 2;
}

.hero-title {
    min-height: 1.2em;

    display: flex;
    align-items: center;
    justify-content: center;

    background: linear-gradient(
        135deg,
        #ffffff 30%,
        var(--primary-light)
    );

    -webkit-background-clip: text;
    background-clip: text;

    color: transparent;

    font-size: clamp(3rem, 7vw, 6rem);
    line-height: 1;
    letter-spacing: -0.05em;

    transition: opacity 0.2s ease;
}

.hero-subtitle {
    font-size: clamp(1rem, 2vw, 1.25rem);

    color: rgba(255, 255, 255, 0.7);

    margin: 30px auto 40px;

    max-width: 700px;

    line-height: 1.6;
}

.hero-actions {
    display: flex;
    gap: 16px;

    justify-content: center;
    flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
    display: inline-block;

    padding: 14px 32px;

    border-radius: 10px;

    font-weight: 600;
    font-size: 15px;

    text-decoration: none;

    transition:
        transform 0.2s,
        box-shadow 0.2s,
        border-color 0.2s;
}

.btn-primary {
    background: var(--primary);
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);

    box-shadow: 0 8px 24px rgba(0, 102, 255, 0.4);
}

.btn-secondary {
    background: transparent;

    color: #ffffff;

    border: 1px solid rgba(248, 243, 243, 0.2);
}

.btn-secondary:hover {
    transform: translateY(-2px);

    border-color: var(--primary);

    color: var(--primary-light);
}
</style>