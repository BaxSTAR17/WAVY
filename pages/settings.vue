<script setup>
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const setError = ref(false)
    const darkMode = ref(false)
</script>

<template>
    <main class="h-screen w-screen flex flex-row">
        <LeftSidebar />
        <div class="bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col p-3 gap-3">
            <h1 class="text-4xl bg-neutral-900 p-5 text-center rounded-xl font-bold tracking-widest">SETTINGS</h1>
            <div v-if="setError === true" class="bg-neutral-800 h-full overflow-y-auto w-full box-border flex flex-col justify-center items-center gap-5">
                <div class="text-3xl text-neutral-500">Sorry... We cannot connect to the network!</div>
                <UIcon name="i-uil-wifi-slash" class="text-neutral-500" size="80"/>
            </div>
            <div v-else class="w-full h-content flex flex-col">
                <h1 class="text-xl bg-neutral-900 p-5 text-center rounded-xl font-bold tracking-widest w-content self-start">GENERAL</h1>
                <div class="flex self-start">
                    <USwitch v-model="darkMode" label="Dark Mode" default-value/>
                </div>
            </div>
        </div>
        <RightSidebar />
    </main>
</template>

<style>
</style>