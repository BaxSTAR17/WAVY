<template >
    <main class="h-screen w-screen flex flex-row">
        <div class="bg-neutral-800 min-h-dvh p-5 w-screen flex justify-center items-center">
            <form @submit.prevent="async () => (registerMode ? register() : await navigateTo('/main'))" class="flex flex-col gap-4 items-center justify-center">
                <h3>LOGIN FOR WAVY BAYBE (doesnt work yet, just press the button to get to the homepage)</h3>
                <input type="email" placeholder="Email" v-model="email" class="bg-gray-800 rounded p-3 w-full">
                <input type="password" placeholder="Password" v-model="pass" class="bg-gray-800 rounded p-3 w-full">
                <button type="submit" class="p-3 test-white bg-blue-400 rounded w-full cursor-pointer">
                    <span v-if="registerMode">Sign Up</span>
                    <span v-else>Log In</span>
                </button> 
            </form>
        </div>
    </main>
</template>

<script setup lang="ts">
    const email = ref('')
    const pass = ref('')
    const registerMode = ref(false)

    const register = async () => {}
    const login = async () => {}
</script>

<style>
    body {
        color:white;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
</style>