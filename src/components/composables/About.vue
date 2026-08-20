<template>
    <section class="about" id="about">
        <div class="about-container">

            <!-- Left side -->
            <div class="about-intro">
                <span class="eyebrow">About Us</span>

                <h2>
                    Turning ideas into
                    <span>digital reality.</span>
                </h2>
            </div>

            <!-- Right side -->
            <div class="about-content">
                <p class="about-lead">
                    At All Axis Technologies, we combine creativity,
                    technology, and precision to build digital experiences
                    that move businesses forward.
                </p>

                <p>
                    From immersive 3D mapping and modern web applications
                    to custom technology solutions, we help organizations
                    transform complex ideas into powerful digital products.
                </p>

                <p>
                    Our approach is simple: understand the challenge,
                    engineer the right solution, and deliver an experience
                    that is reliable, scalable, and built for the future.
                </p>

                <div class="about-stats">
                    <div class="stat">
                        <strong>3D</strong>
                        <span>Visualization</span>
                    </div>

                    <div class="stat">
                        <strong>Web</strong>
                        <span>Development</span>
                    </div>

                    <div class="stat">
                        <strong>Tech</strong>
                        <span>Solutions</span>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<style scoped>
.about {
    padding: 120px 48px;
    background: transparent;
}

.about-container {
    max-width: 1200px;
    margin: 0 auto;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;

    align-items: start;
}

/* Left */

.about-intro {
    position: sticky;
    top: 120px;
}

.eyebrow {
    display: inline-block;

    margin-bottom: 24px;

    color: var(--primary);

    font-size: 3rem;
    font-weight: 700;

    text-transform: uppercase;
    letter-spacing: 0.14em;
}

.about-intro h2 {
    margin: 0;

    max-width: 550px;

    font-size: clamp(3rem, 5vw, 5rem);
    line-height: 0.98;

    font-weight: 400;
    letter-spacing: -0.055em;

    color: #e90e0e;
}

.about-intro h2 span {
    

    background: linear-gradient(
        135deg,
        var(--primary),
        var(--primary-light)
    );

    -webkit-background-clip: text;
    background-clip: text;

    color: transparent;
}

/* Right */

.about-content {
    padding-top: 15px;
}

.about-content p {
    margin: 0 0 24px;

    max-width: 600px;

    color: rgb(140, 153, 168);

    font-size: 1rem;
    line-height: 1.8;
}

.about-content .about-lead {
    margin-bottom: 30px;

    color: rgba(0, 0, 0, 0.9);

    font-size: 1.55rem;
    line-height: 1.6;
}

/* Stats */

.about-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    gap: 16px;

    margin-top: 50px;
}

.stat {
    padding: 25px 20px;

    border: 1px solid rgba(180, 162, 162, 0.884);

    border-radius: 16px;

    background: rgba(20, 0, 0, 0.025);

    transition:
        transform 0.3s ease,
        border-color 0.3s ease,
        background 0.3s ease;
}

.stat:hover {
    transform: translateY(-5px);

    border-color: rgba(8, 100, 238, 0.747);

    background: rgba(184, 188, 206, 0.61);
}

.stat strong {
    display: block;

    margin-bottom: 8px;

    color: var(--primary-light);

    font-size: 1.5rem;
    font-weight: 600;
}

.stat span {
    color: rgb(0, 119, 255);

    font-size: 0.82rem;
font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

/* Tablet */

@media (max-width: 900px) {
    .about {
        padding: 90px 30px;
    }

    .about-container {
        grid-template-columns: 1fr;

        gap: 50px;
    }

    .about-intro {
        position: static;
    }

    .about-intro h2 {
        max-width: 700px;
    }
}

/* Mobile */

@media (max-width: 600px) {
    .about {
        padding: 80px 20px;
    }

    .about-intro h2 {
        font-size: 3.2rem;
    }

    .about-content .about-lead {
        font-size: 1.15rem;
    }

    .about-stats {
        grid-template-columns: 1fr;
    }

    .stat {
        padding: 20px;
    }
}
</style>