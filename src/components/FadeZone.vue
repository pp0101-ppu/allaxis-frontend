<template>
    <div class="fade-zone">
        <slot />
    </div>
</template>
<style>
.fade-zone {
    position: relative;
    background: linear-gradient(
        180deg,
        #050505 0%,
        #050505 35%,
        #0a0e1a 50%,
        #0d1220 62%,
        #f4f7fb 80%,
        #ffffff 95%,
        #ffffff 100%
    );
}
</style>