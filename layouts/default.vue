<template>
    <main class="h-screen w-screen flex flex-col lg:flex-row min-w-lg">
        <LeftSidebar v-if="route.path !== '/login' && route.path !== '/register'" class="hidden lg:flex"/>
        <TopSidebar v-if="route.path !== '/login' && route.path !== '/register'" class="flex lg:hidden"/>
        <slot />
        <BottomSidebar v-if="route.path !== '/login' && route.path !== '/register'" class="flex lg:hidden"/>
        <RightSidebar v-if="route.path !== '/login' && route.path !== '/register'" class="hidden lg:flex"/>
    </main>
</template>

<script setup>
    const route = useRoute()
</script>

<style>
</style>