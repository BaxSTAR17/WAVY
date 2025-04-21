<script setup>
</script>

<template>
    <div class="bg-neutral-800 w-full min-h-full flex flex-col lg:hidden">
        <NuxtLink to="/faq" class="w-full h-17 gap-2 hover:bg-neutral-700 text-2xl flex items-center border-box p-3 font-bold"><UIcon name="i-uil-question-circle" size="30"/>Frequently Asked Questions (FAQ)</NuxtLink>
        <hr class="text-neutral-100 w-full ml-0 mr-0 mt-0" />
        <NuxtLink to="/about" class="w-full h-17 gap-2 hover:bg-neutral-700 text-2xl flex items-center border-box p-3 font-bold"><UIcon name="i-uil-users-alt" size="30"/> About Us</NuxtLink>
        <hr class="text-neutral-100 w-full ml-0 mr-0 mt-0" />
        <NuxtLink to="/contact" class="w-full h-17 gap-2 hover:bg-neutral-700 text-2xl flex items-center border-box p-3 font-bold"><UIcon name="i-uil-phone" size="30"/>Contact us</NuxtLink>
        <hr class="text-neutral-100 w-full ml-0 mr-0 mt-0" />
    </div>
    <div class="bg-neutral-800 w-full min-h-full hidden lg:flex flex-col justify-center items-center">
        <div class="text-3xl text-center text-neutral-400 dark:text-neutral-500">Sorry, This page is only for mobile devices</div>
        <UIcon name="i-uil-desktop-slash" class="text-neutral-400 dark:text-neutral-400" size="80"/>
    </div>
</template>

<style>
</style>