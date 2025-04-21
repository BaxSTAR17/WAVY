<script setup>
</script>

<template>
    <div class="bg-neutral-800 w-full min-h-full block lg:hidden">
        <UCommandPalette />
    </div>
    <div class="bg-neutral-800 w-full min-h-full hidden lg:flex flex-col justify-center items-center">
        <div class="text-3xl text-center text-neutral-400 dark:text-neutral-500">Sorry, This page is only for mobile devices</div>
        <UIcon name="i-uil-desktop-slash" class="text-neutral-400 dark:text-neutral-400" size="80"/>
    </div>
</template>

<style>
</style>