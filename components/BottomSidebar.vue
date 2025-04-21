<script setup>

</script>

<template>
    <div class="bg-neutral-900 min-h-20 w-full flex items-center">
        <NuxtLink to="/" class="flex flex-col w-full min-h-20 justify-center items-center rounded-3xl hover:bg-neutral-800" v-show="useRoute().path !== '/'">
            <UIcon name="i-basil-home-outline" size="30"/>
            <span>Home</span>
        </NuxtLink>
        <div class="flex flex-col w-full min-h-20 justify-center items-center rounded-3xl" v-show="useRoute().path === '/'">
            <UIcon name="i-basil-home-solid" size="30"/>
            <span class="font-bold font-underline">Home</span>
        </div>
        <div class="flex flex-col w-full min-h-20 justify-center items-center rounded-3xl hover:bg-neutral-800">
            <UIcon name="i-basil-star-outline" size="30"/>
            <span>Favorites</span>
        </div>
        <NuxtLink to="/login" class="flex flex-col w-full min-h-20 justify-center items-center rounded-3xl hover:bg-neutral-800">
            <UIcon name="i-basil-user-outline" size="30"/>
            <span>Log In</span>
        </NuxtLink>
        <NuxtLink to="/informationmob" v-show="useRoute().path !== '/informationmob' && useRoute().path !== '/faq' && useRoute().path !== '/about' && useRoute().path !== '/contact'" class="flex flex-col w-full min-h-20 justify-center items-center rounded-3xl hover:bg-neutral-800">
            <UIcon name="i-basil-info-circle-outline" size="30"/>
            <span>Information</span>
        </NuxtLink>
        <NuxtLink to="/informationmob" v-show="useRoute().path === '/informationmob' || useRoute().path === '/faq' || useRoute().path === '/about' || useRoute().path === '/contact'" class="flex flex-col w-full min-h-20 justify-center items-center rounded-3xl hover:bg-neutral-800">
            <UIcon name="i-basil-info-circle-solid" size="30"/>
            <span>Information</span>
        </NuxtLink>
    </div>
</template>

<style>

</style>