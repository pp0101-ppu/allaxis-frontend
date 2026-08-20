<script setup>
import { ref, onMounted } from 'vue';
import api from '../api/axios';

const services = ref([]);
const loading = ref(true);
const error = ref(null);

const cardStyles = [
    {
        color: '#5B82FF',
        lightColor: 'rgba(91, 130, 255, 0.10)',
        tags: ['NEXT.JS', 'REACT', 'SEO READY']
    },
    {
        color: '#4D9955',
        lightColor: 'rgba(77, 153, 85, 0.10)',
        tags: ['DRONES', '3D MAPPING', 'TOURS']
    },
    {
        color: '#9B59FF',
        lightColor: 'rgba(155, 89, 255, 0.10)',
        tags: ['ADS', 'STRATEGY', 'GROWTH']
    },
    {
        color: '#FF7A00',
        lightColor: 'rgba(255, 122, 0, 0.10)',
        tags: ['DESIGN SYSTEMS', 'FIGMA', 'RESEARCH']
    },
    {
        color: '#F03D68',
        lightColor: 'rgba(240, 61, 104, 0.10)',
        tags: ['VIRTUALIZATION', 'CLOUD', 'SERVERS']
    },
    {
        color: '#5865F2',
        lightColor: 'rgba(88, 101, 242, 0.10)',
        tags: ['FLUTTER', 'REACT NATIVE', 'NATIVE']
    },
     {
        color: '#5B82FF',
        lightColor: 'rgba(91, 130, 255, 0.10)',
        tags: ['WORKSHOPS', 'UPSKILLING', 'JOBS']
    }
    ,
     {
        color: '#F03D68',
        lightColor: 'rgba(91, 130, 255, 0.10)',
        tags: ['CUSTOM DEV', 'SCALEABLE', 'RELIABLE']
    },
     {
        color: '#4D9955',
        lightColor: 'rgba(91, 130, 255, 0.10)',
        tags: ['RANKING', 'TECHNICAL SEO', 'GROWTH']
    }
];

onMounted(async () => {
    try {
        const response = await api.get('/services');
        services.value = response.data.data;
    } catch (err) {
        error.value = 'Failed to load services.';
        console.error(err);
    } finally {
        loading.value = false;
    }
});

const getCardStyle = (index) => {
    return cardStyles[index % cardStyles.length];
};

const getIcon = (service) => {
    return service.icon_or_image || '⚙';
};
</script>

<template>
    <section class="services" id="services">

        <!-- Header -->
        <div class="section-header">
            <h2>Our Services</h2>

            <p>
                We deliver end-to-end digital solutions that help businesses grow,
                innovate, and stay ahead in the digital era.
            </p>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="state-message">
            Loading services...
        </div>

        <!-- Error -->
        <div v-else-if="error" class="state-message error">
            {{ error }}
        </div>

        <!-- Empty -->
        <div v-else-if="services.length === 0" class="state-message">
            No services added yet.
        </div>

        <!-- Services -->
        <div v-else class="services-grid">

            <div
                v-for="(service, index) in services"
                :key="service.id"
                class="service-card"
                :class="{ featured: index === 1 }"
                :style="{
                    '--accent': getCardStyle(index).color,
                    '--accent-light': getCardStyle(index).lightColor
                }"
            >

                <!-- Number -->
                <span class="card-index">
                    {{ String(index + 1).padStart(2, '0') }}
                </span>

                <!-- Icon -->
                <div class="card-icon">
                    {{ getIcon(service) }}
                </div>

                <!-- Content -->
                <div class="card-content">

                    <h3>
                        {{ service.title }}
                    </h3>

                    <p>
                        {{ service.description }}
                    </p>

                </div>

                <!-- Tags -->
                <div class="card-tags">
                    <span
                        v-for="tag in getCardStyle(index).tags"
                        :key="tag"
                    >
                        {{ tag }}
                    </span>
                </div>

            </div>

        </div>

    </section>
</template>

<style scoped>

.services {
    width: 100%;
    padding: 100px 20px 120px;
    
}

.section-header {
    max-width: 1200px;
    margin: 0 auto 65px;
    text-align: left;
}

.section-header h2 {
    margin: 0 0 38px;

    font-size: clamp(3.5rem, 6vw, 5.5rem);
    line-height: 0.95;
    font-weight: 400;
    letter-spacing: -0.065em;

    color: #0e53e9;
}

.section-header p {
    max-width: 650px;

    margin: 0;

    font-size: 1.05rem;
    line-height: 1.65;

    color: #7095c5;
}


/* =========================
   GRID
========================= */

.services-grid {
    max-width: 1200px;
    margin: 0 auto;

    display: grid;
    grid-template-columns: repeat(3, 1fr);

    gap: 34px;
}


/* =========================
   CARD
========================= */

.service-card {
    position: relative;

    min-height: 480px;

    display: flex;
    flex-direction: column;

    padding: 40px;

    background: #fbfbfc;

    border: 1px solid transparent;
    border-radius: 30px;

    overflow: hidden;

    transition:
        transform 0.3s ease,
        border-color 0.3s ease,
        box-shadow 0.3s ease;
}

.service-card:hover {
    transform: translateY(-6px);

    border-color: var(--accent);

    box-shadow:
        0 20px 50px rgba(0, 0, 0, 0.08);
}


/* Featured card */

.service-card.featured {
    border: 2px solid var(--accent);
}


/* =========================
   NUMBER
========================= */

.card-index {
    position: absolute;

    top: 25px;
    right: 28px;

    font-size: 3.5rem;
    font-weight: 300;

    line-height: 1;

    color: rgba(20, 20, 20, 0.055);

    pointer-events: none;
}


/* =========================
   ICON
========================= */

.card-icon {
    width: 64px;
    height: 64px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 36px;

    border-radius: 50%;

    background: var(--accent-light);

    color: var(--accent);

    font-size: 1.8rem;

    font-weight: 500;
}


/* =========================
   CONTENT
========================= */

.card-content {
    flex: 1;
}

.service-card h3 {
    max-width: 280px;

    margin: 0 0 22px;

    font-size: 1.75rem;
    line-height: 1.15;
    font-weight: 400;

    letter-spacing: -0.035em;

    color: #111111;
}

.service-card p {
    max-width: 310px;

    margin: 0;

    font-size: 1rem;
    line-height: 1.8;

    color: #707070;
}


/* =========================
   TAGS
========================= */

.card-tags {
    display: flex;
    flex-wrap: wrap;

    gap: 8px;

    margin-top: 35px;
}

.card-tags span {
    display: inline-flex;
    align-items: center;

    padding: 8px 13px;

    border-radius: 8px;

    background: var(--accent-light);

    color: var(--accent);

    font-size: 0.68rem;
    font-weight: 700;

    letter-spacing: 0.045em;
}


/* =========================
   STATES
========================= */

.state-message {
    max-width: 1200px;

    margin: 0 auto;

    padding: 60px 20px;

    text-align: center;

    color: #666;
}

.state-message.error {
    color: #d33;
}


/* =========================
   TABLET
========================= */

@media (max-width: 1000px) {

    .services {
        padding: 80px 24px 100px;
    }

    .services-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .section-header h2 {
        font-size: 4rem;
    }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 650px) {

    .services {
        padding: 70px 20px 80px;
    }

    .section-header {
        margin-bottom: 45px;
    }

    .section-header h2 {
        font-size: 3.2rem;
        margin-bottom: 25px;
    }

    .section-header p {
        font-size: 0.95rem;
    }

    .services-grid {
        grid-template-columns: 1fr;

        gap: 20px;
    }

    .service-card {
        min-height: 430px;

        padding: 30px;
    }

    .service-card h3 {
        font-size: 1.55rem;
    }

    .card-index {
        font-size: 3rem;
    }

}

</style>