<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';

const emit = defineEmits(['complete']);
const container = ref(null);
const overlayOpacity = ref(1);
const showOverlay = ref(true);

let renderer, scene, camera, particles, animationId;
let fadeTimeoutId, removeTimeoutId;

const loadLogoPixels = () => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = '/logo.png';
        img.onload = () => {
            const sampleWidth = 165;
            const scale = sampleWidth / img.width;
            const canvas = document.createElement('canvas');
            canvas.width = sampleWidth;
            canvas.height = img.height * scale;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const points = [];

            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const i = (y * canvas.width + x) * 4;
                    const r = imageData.data[i];
                    const g = imageData.data[i + 1];
                    const b = imageData.data[i + 2];
                    const a = imageData.data[i + 3];
                    const isWhite = r > 235 && g > 235 && b > 235;

                    if (a > 100 && !isWhite) {
                        points.push({
                            x: (x - canvas.width / 2) / 14,
                            y: -(y - canvas.height / 2) / 14,
                            r: r / 255, g: g / 255, b: b / 255,
                        });
                    }
                }
            }
            resolve(points);
        };
    });
};

onMounted(async () => {
    document.body.style.overflow = 'hidden';

    const points = await loadLogoPixels();
    const count = points.length;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 12;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.value.appendChild(renderer.domElement);

    const targetPositions = new Float32Array(count * 3);
    const startPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    points.forEach((p, i) => {
        targetPositions[i * 3] = p.x;
        targetPositions[i * 3 + 1] = p.y;
        targetPositions[i * 3 + 2] = 0;

        const radius = 15 + Math.random() * 15;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        startPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        startPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        startPositions[i * 3 + 2] = radius * Math.cos(phi) - 10;

        colors[i * 3] = p.r;
        colors[i * 3 + 1] = p.g;
        colors[i * 3 + 2] = p.b;
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(startPositions.slice(), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const positionAttr = geometry.getAttribute('position');
    const duration = 3200;
    const startTime = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (now) => {
        animationId = requestAnimationFrame(animate);
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);

        for (let i = 0; i < count; i++) {
            const ix = i * 3;
            positionAttr.array[ix] = startPositions[ix] + (targetPositions[ix] - startPositions[ix]) * eased;
            positionAttr.array[ix + 1] = startPositions[ix + 1] + (targetPositions[ix + 1] - startPositions[ix + 1]) * eased;
            positionAttr.array[ix + 2] = startPositions[ix + 2] + (targetPositions[ix + 2] - startPositions[ix + 2]) * eased;
        }
        positionAttr.needsUpdate = true;
        particles.rotation.y = (1 - eased) * 0.6;

        renderer.render(scene, camera);
    };
    animationId = requestAnimationFrame(animate);

    fadeTimeoutId = setTimeout(() => {
        overlayOpacity.value = 0;
    }, duration + 500);

    removeTimeoutId = setTimeout(() => {
        showOverlay.value = false;
        document.body.style.overflow = '';
        emit('complete');
    }, duration + 1600);
});

onUnmounted(() => {
    cancelAnimationFrame(animationId);
    clearTimeout(fadeTimeoutId);
    clearTimeout(removeTimeoutId);
    document.body.style.overflow = '';
    if (renderer) renderer.dispose();
});
</script>

<template>
    <div v-if="showOverlay" class="intro-overlay" :style="{ opacity: overlayOpacity }">
        <div ref="container" class="intro-canvas"></div>
    </div>
</template>

<style scoped>
.intro-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #050505;
    transition: opacity 0.9s ease;
    pointer-events: none;
}
.intro-canvas {
    width: 100%;
    height: 100%;
}
</style>