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
import FadeZone from '../components/FadeZone.vue';
import Clients from '../components/Clients.vue';
import About from '../components/composables/About.vue';
const introDone = ref(false);
</script>

<template>
    <IntroAnimation @complete="introDone = true" />
    <NavBar />
    <FadeZone>
        <Hero />
        <Services />
        <Stats />
    </FadeZone>
    <Portfolio />
    <Testimonials /> <Clients />
    <About />
    <ContactForm />
    <Footer />
   
</template>