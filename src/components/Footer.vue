<script setup>
import Logo from './Logo.vue';
</script>

<template>
    <footer class="footer">
        <div class="footer-top">
            <div class="footer-brand">
                <Logo />
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
                     
                </div>
                <div class="link-group">
                    <h4>Follow Us</h4>
                    <div class="social-icons">
                        <a href="#" aria-label="LinkedIn">in</a>
                        <a href="#" aria-label="Instagram">ig</a>
                        <a href="#" aria-label="Twitter">tw</a>
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
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 64px 48px 24px;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 48px;
    margin-bottom: 48px;
}

.footer-tagline {
    margin-top: 16px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
    max-width: 240px;
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
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 8px;
}

.link-group a {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.75);
    transition: color 0.2s;
}

.link-group a:hover {
    color: var(--primary);
}

.social-icons {
    display: flex;
    gap: 12px;
}

.social-icons a {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    text-transform: uppercase;
}

.social-icons a:hover {
    background: var(--primary);
    color: #050505;
}

.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding-top: 24px;
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.85rem;
}
</style>