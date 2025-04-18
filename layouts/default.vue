<template>
    <main class="h-screen w-screen flex flex-row min-w-lg">
        <LeftSidebar v-show="route.path !== '/login' && route.path !== '/register'" class="hidden lg:flex"/>
        <slot />
        <RightSidebar v-show="route.path !== '/login' && route.path !== '/register'" class="hidden lg:flex"/>
    </main>
</template>

<script setup>
    const route = useRoute()
</script>

<style>
</style>