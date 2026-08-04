<script setup>
import { ref } from 'vue';
import IntroAnimation from '../components/IntroAnimation.vue';
import NavBar from '../components/NavBar.vue';
import Hero from '../components/Hero.vue';
import Services from '../components/Services.vue';
import Stats from '../components/Stats.vue';
import Portfolio from '../components/Portfolio.vue';
import Testimonials from '../components/Testimonials.vue';
import ContactForm from '../components/ContactForm.vue';
import Footer from '../components/Footer.vue';

const introDone = ref(false);
</script>

<template>
    <IntroAnimation @complete="introDone = true" />
    <NavBar />
    <Hero />
    <Services />
    <Stats />
    <Portfolio />
    <Testimonials />
    <ContactForm />
    <Footer />
</template>