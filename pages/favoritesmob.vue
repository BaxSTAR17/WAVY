<script setup>
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const guestMode = ref(true)

    onMounted(() => {
        if(user.value) guestMode.value = false
    })

    useHead({title: 'Favorites | WAVY'})
</script>

<template>
    <div class="bg-neutral-200 dark:bg-neutral-800 w-screen min-h-full flex flex-col lg:hidden" v-show="guestMode === false">
        <UTooltip :content="{align:'start'}" text="Liked Podcasts">
        <NuxtLink to="/likes" class="w-full text-neutral-900 dark:text-neutral-100 h-17 gap-2 hover:bg-neutral-400 dark:hover:bg-neutral-700 text-2xl flex items-center border-box p-3 font-bold"><UIcon name="i-uil-heart" size="30"/>Liked</NuxtLink>
        </UTooltip>
        <hr class="text-neutral-900 dark;text-neutral-100 w-full ml-0 mr-0 mt-0" />
        <UTooltip :content="{align:'start'}" text="Subscriptions">
        <NuxtLink to="/subscriptions" class="w-full text-neutral-900 dark:text-neutral-100 h-17 gap-2 hover:bg-neutral-400 dark:hover:bg-neutral-700 text-2xl flex items-center border-box p-3 font-bold"><UIcon name="i-uil-headphones" size="30"/> Subscriptions</NuxtLink>
        </UTooltip>
        <hr class="text-neutral-900 dark;text-neutral-100 w-full ml-0 mr-0 mt-0" />
    </div>
    <div class="bg-neutral-300 dark:bg-neutral-800 w-screen min-h-dvh flex lg:hidden flex-col justify-center items-center" v-show="guestMode === true">
        <div class="text-3xl text-center text-neutral-400 dark:text-neutral-500">Log In to subscribe to users and like podcasts</div>
        <UIcon name="i-uil-signin" class="text-neutral-400 dark:text-neutral-400" size="80"/>
    </div>
    <div class="bg-neutral-200 dark:bg-neutral-800 w-screen min-h-dvh hidden lg:flex flex-col justify-center items-center">
        <div class="text-3xl text-center text-neutral-400 dark:text-neutral-500">Sorry, This page is only for mobile devices</div>
        <UIcon name="i-uil-desktop-slash" class="text-neutral-400 dark:text-neutral-400" size="80"/>
    </div>
</template>

<style>
</style>