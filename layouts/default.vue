<template>
        <main class="min-h-dvh h-content lg:min-h-dvh lg:h-screen w-screen lg:flex lg:flex-row min-w-lg bg-neutral-300 dark:bg-neutral-800">
            <LeftSidebar v-if="route.path !== '/login' && route.path !== '/register'" class="hidden lg:flex"/>
            <TopSidebar v-if="route.path !== '/login' && route.path !== '/register'" class="flex lg:hidden"/>
            <slot />
            <BottomSidebar v-if="route.path !== '/login' && route.path !== '/register'" class="flex lg:hidden fixed bottom-0"/>
            <RightSidebar v-if="route.path !== '/login' && route.path !== '/register'" class="hidden lg:flex"/>
        </main>
</template>

<script setup>
    const route = useRoute()
</script>

<style>
</style>