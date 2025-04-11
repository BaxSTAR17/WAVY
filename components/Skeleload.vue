<script setup>
    defineProps({
        class: String
    })
</script>

<template>
    <div id="skele" :class="class"></div>
</template>

<style>
    #skele {
        animation: loading 0.8s linear infinite alternate;
    }

    @keyframes loading {
        from { opacity: 0.6; }
        to { opacity: 0.3; }
    }
</style>