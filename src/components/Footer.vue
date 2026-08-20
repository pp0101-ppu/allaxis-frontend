<script setup>
import Logo from './Logo.vue';
import { faInstagram, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
    <footer class="footer">
        <div class="footer-top">
            <div class="footer-brand">
                <div class="footer-logo">
                    <Logo />
                </div>
                <p class="footer-tagline">Where Vision Meets Every Dimension</p>
            </div>

            <div class="footer-links">
                <div class="link-group">
                    <h4>Company</h4>
                    <a href="#home">Home</a>
                    <a href="#services">Services</a>
                    <a href="#portfolio">Portfolio</a>
                    <a href="#about">About</a>
                </div>
                <div class="link-group">
                    <h4>Get In Touch</h4>
                    <a href="#contact">Contact Us</a>
                    <a href="mailto:allaxistechnologies@gmail.com">allaxistechnologies@gmail.com</a>
                           <a>+977 9851445346</a>
                </div>
                <div class="link-group">
                    <h4>Follow Us</h4>
                    <div class="social-icons">
                       
                        <a
    href="https://www.instagram.com/allaxistechnologies/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
>
    
            <font-awesome-icon :icon="faInstagram" />
</a> 
                        <a
    href="https://www.facebook.com/share/1CwUeCMQu1/?mibextid=wwXIfr"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
>
    <font-awesome-icon :icon="faFacebookF" />
</a> 
                        <a href="#" aria-label="Twitter">    <font-awesome-icon :icon="faLinkedinIn" /></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; {{ new Date().getFullYear() }} AllAxis Technologies. All rights reserved.</p>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background: linear-gradient(160deg, #f3f3f3 0%, #0f4ce6 60%, #0105f0 100%);
    padding: 72px 48px 24px;
    margin: 0;
    max-width: 100%;
}

.footer-top {
    max-width: 980px;
    margin: 0 auto 48px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 80px;
}

.footer-brand {
    max-width: 260px;
}

.footer-logo :deep(.logo-img) {
    height: 60px;
}

.footer-tagline {
    margin-top: 16px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 2rem;
    font-weight: 500;
     max-width: 400px;
}
.footer-links {
    display: flex;
    gap: 64px;
    flex-wrap: wrap;
}

.link-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.link-group h4 {
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 8px;
}

.link-group a {
    font-size: 1.05rem;
    font-weight: 600;
    color: #ffffff;
    opacity: 0.9;
    transition: opacity 0.2s;
}

.link-group a:hover {
    opacity: 5;
}

.social-icons {
    display: flex;
    gap: 12px;margin-top: 16px;
}

.social-icons a {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    text-transform: uppercase;
    color: #ffffff;
}

.social-icons a:hover {
    background: var(--primary-light);
}

.footer-bottom {
    max-width: 980px;
    margin: 0 auto;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 24px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    font-weight: 500;
}
</style>