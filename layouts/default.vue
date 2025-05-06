<template>
        <main class="min-h-dvh h-content lg:min-h-dvh lg:h-screen w-screen lg:flex lg:flex-row bg-neutral-300 dark:bg-neutral-800 border-box pb-20 lg:pb-0">
            <LeftSidebar v-if="route.path !== '/login' && route.path !== '/register'" class="hidden lg:flex"/>
            <TopSidebar v-if="route.path !== '/login' && route.path !== '/register'" class="flex lg:hidden"/>
            <slot />
            <BottomSidebar v-if="route.path !== '/login' && route.path !== '/register'" class="flex lg:hidden fixed bottom-0"/>
            <RightSidebar v-if="route.path !== '/login' && route.path !== '/register'" class="hidden lg:flex"/>
            <div v-if="loading" class="absolute t-0 l-0 w-full min-h-dvh flex items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                <img id="logo" class="hidden dark:block w-70 h-60" src='../public/WAVY Main Logo (White).svg' alt="Wavy Logo">
                <img id="logo" class="block dark:hidden w-70 h-60" src='../public/WAVY Main Logo (Black).svg' alt="Wavy Logo">
            </div>
        </main>
</template>

<script setup>
    const route = useRoute()
    const loading = ref(true)
    const nuxt = useNuxtApp()

    nuxt.hook("page:finish", () => { loading.value = false })
</script>

<style>
</style>