 text-neutral-900 dark:text-neutral-100<script setup>
    useHead({title:'Information | WAVY'})
</script>

<template>
    <div class="bg-neutral-200 dark:bg-neutral-800 w-screen min-h-full flex flex-col lg:hidden">
        <UTooltip :content="{align:'start'}" text="Frequently Asked Questions">
        <NuxtLink to="/faq" class="w-full text-neutral-900 dark:text-neutral-100 h-17 gap-2 hover:bg-neutral-400 dark:hover:bg-neutral-700 text-2xl flex items-center border-box p-3 font-bold"><UIcon name="i-uil-question-circle" size="30"/>Frequently Asked Questions (FAQ)</NuxtLink>
        </UTooltip>
        <hr class="text-neutral-900 dark:text-neutral-100 w-full ml-0 mr-0 mt-0" />
        <UTooltip :content="{align:'start'}" text="About Us">
        <NuxtLink to="/about" class="w-full text-neutral-900 dark:text-neutral-100 h-17 gap-2 hover:bg-neutral-400 dark:hover:bg-neutral-700 text-2xl flex items-center border-box p-3 font-bold"><UIcon name="i-uil-users-alt" size="30"/> About Us</NuxtLink>
        </UTooltip>
        <hr class="text-neutral-900 dark:text-neutral-100 w-full ml-0 mr-0 mt-0" />
        <UTooltip :content="{align:'start'}" text="Contact Us">
        <NuxtLink to="/contact" class="w-full text-neutral-900 dark:text-neutral-100 h-17 gap-2 hover:bg-neutral-400 dark:hover:bg-neutral-700 text-2xl flex items-center border-box p-3 font-bold"><UIcon name="i-uil-phone" size="30"/>Contact us</NuxtLink>
        </UTooltip>
        <hr class="text-neutral-900 dark:text-neutral-100 w-full ml-0 mr-0 mt-0" />
    </div>
    <div class="bg-neutral-200 dark:bg-neutral-800 w-screen min-h-dvh hidden lg:flex flex-col justify-center items-center">
        <div class="text-3xl text-center text-neutral-400 dark:text-neutral-500">Sorry, This page is only for mobile devices</div>
        <UIcon name="i-uil-desktop-slash" class="text-neutral-400 dark:text-neutral-400" size="80"/>
    </div>
</template>

<style>
</style>