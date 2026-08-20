<script setup>
import { ref } from 'vue';
import api from '../api/axios';

const form = ref({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'general',
});

const submitting = ref(false);
const success = ref(false);
const error = ref(null);

const submitForm = async () => {
    submitting.value = true;
    success.value = false;
    error.value = null;

    try {
        await api.post('/inquiries', form.value);
        success.value = true;
        form.value = { name: '', email: '', phone: '', message: '', type: 'general' };
    } catch (err) {
        error.value = 'Something went wrong. Please try again.';
        console.error(err);
    } finally {
        submitting.value = false;
    }
};
</script>

<template>
    <section class="contact" id="contact">
        <div class="section-header">
            <h2>Get In</h2>  <h3>Touch</h3>
            <p>Tell us about your project — we'll get back to you shortly.</p>
        </div>

        <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-row">
                <input v-model="form.name" type="text" placeholder="Your Name" required />
                <input v-model="form.email" type="email" placeholder="Your Email" required />
            </div>
            <div class="form-row">
                <input v-model="form.phone" type="text" placeholder="Phone (optional)" />
                <select v-model="form.type">
                    <option value="general">General Inquiry</option>
                    <option value="service">Service Inquiry</option>
                    <option value="product">Product Inquiry</option>
                </select>
            </div>
            <textarea v-model="form.message" placeholder="Your Message" rows="5" required></textarea>

            <button type="submit" class="btn-primary" :disabled="submitting">
                {{ submitting ? 'Sending...' : 'Send Message' }}
            </button>

            <p v-if="success" class="form-success">Thanks! We'll be in touch soon.</p>
            <p v-if="error" class="form-error">{{ error }}</p>
        </form>
    </section>
</template>

<style scoped>
.contact {
    padding: 120px 48px;
    max-width: 700px;
    margin: 0 auto;
}

.section-header {
    text-align: center;
    margin-bottom: 48px;
}

.section-header h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 12px;
    color: rgba(1, 2, 8, 0.979);
}
.section-header h3 {
    font-size: clamp(4rem, 4vw, 3rem);
    margin-bottom: 12px;
    color: rgba(2, 26, 241, 0.979);
}
.section-header p {
    color: rgba(12, 1, 1, 0.979);
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-row {
    display: flex;
    gap: 16px;
}

.form-row > * {
    flex: 1;
}

input, select, textarea {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 14px 16px;
    color: var(--accent);
    font-family: var(--font-body);
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s;
}

input:focus, select:focus, textarea:focus {
    border-color: var(--primary);
}

input::placeholder, textarea::placeholder {
    color: rgba(19, 1, 1, 0.4);
}

textarea {
    resize: vertical;
}

.btn-primary {
    background: var(--primary);
    color: #f5f1f1;
    border: none;
    padding: 14px 32px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 212, 255, 0.4);
}

.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.form-success {
    color: #4ade80;
    font-size: 0.9rem;
}

.form-error {
    color: #f87171;
    font-size: 0.9rem;
}

@media (max-width: 600px) {
    .form-row {
        flex-direction: column;
    }
}
</style>