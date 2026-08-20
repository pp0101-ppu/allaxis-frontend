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

        <div v-if="loading" class="state-message">
            Loading testimonials...
        </div>

        <div
            v-else-if="testimonials.length === 0"
            class="state-message"
        >
            No testimonials added yet.
        </div>

        <div v-else class="marquee-wrapper">

            <!-- Heading inside the colored band -->
            <div class="section-header">
                <h2>What Clients Say</h2>
            </div>

            <!-- Moving testimonials -->
            <div class="marquee-track">

                <div
                    class="testimonial-card"
                    v-for="(t, index) in [...testimonials, ...testimonials]"
                    :key="`${t.id}-${index}`"
                >
                    <p class="quote">
                        "{{ t.quote }}"
                    </p>

                    <div class="client">
                        <strong>{{ t.client_name }}</strong>

                        <span v-if="t.client_company">
                            {{ t.client_company }}
                        </span>
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
    color: #ffffff;
}

.state-message {
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    padding: 40px;
}

/* Primary color band */
.marquee-wrapper {
    width: 100%;
    overflow: hidden;

    background: var(--primary);

    padding: 100px 0;

    -webkit-mask-image: linear-gradient(
        to right,
        transparent,
        black 5%,
        black 95%,
        transparent
    );

    mask-image: linear-gradient(
        to right,
        transparent,
        black 5%,
        black 95%,
        transparent
    );
}

.marquee-track {
    display: flex;
    gap: 24px;
    width: max-content;

    animation: scroll 30s linear infinite;
}


/* White testimonial cards */
.testimonial-card {
    background: #ffffff;

    border: none;
    border-radius: 18px;

    padding: 32px;

    width: 340px;
    min-height: 190px;

    flex-shrink: 0;

    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.quote {
    font-size: 0.95rem;
    line-height: 1.7;

    color: #222222;

    margin: 0 0 24px;
}

.client strong {
    display: block;
    font-size: 0.95rem;
    color: #111111;
}

.client span {
    display: block;

    margin-top: 4px;

    font-size: 0.85rem;
    color: #6b7280;
}

@keyframes scroll {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-50%);
    }
}

@media (max-width: 600px) {
    .testimonials {
        padding: 80px 0;
    }

    .section-header {
        padding: 0 20px;
        margin-bottom: 45px;
    }

    .marquee-wrapper {
        padding: 35px 0;
    }

    .testimonial-card {
        width: 290px;
        padding: 26px;
    }
}
</style>