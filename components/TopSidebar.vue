<script setup>
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const guestMode = ref(true)

    onMounted(() => {
        if(user.value) guestMode.value = false
    })
</script>

<template>
    <div class="bg-neutral-900 min-h-20 w-full flex justify-between items-center border-box pr-3">
        <NuxtLink to="/" class="font-bold text-4xl leading-0">
            <img id="logo" class="hidden dark:block h-10" src='../public/WAVY Main Logo (White).svg' alt="Wavy Logo">
            <img id="logo" class="block dark:hidden h-10" src='../public/WAVY Main Logo (Black).svg' alt="Wavy Logo">
        </NuxtLink>
        <div class="flex w-content min-h-20 items-center gap-3">
            <NuxtLink to="/upload" v-show="guestMode === false"><UIcon name="i-uil-plus" size="45"/></NuxtLink>
            <NuxtLink to="/searchmob"><UIcon name="i-uil-search" size="40"/></NuxtLink>
        </div>
    </div>
</template>

<style>
    
</style>