<script setup defer>
    const supabase = useSupabaseClient()
    const router = useRouter()
    const email = ref('')
    const pass = ref('')
    const username = ref('')
    const loginError = ref(false)
    const registerError = ref(false)

    const registerMode = ref(false)

    const register = async () => {
        try {
            const { error } = await supabase.auth.signUp({
                email: email.value,
                password: pass.value
            })
            if(error) throw error;
            try {
                const { error } = await supabase.from('USER').insert({
                    UserName: username.value,
                    UserEmail: email.value,
                    Theme: 'dark',
                    isOnline: false,
                    isPrivate: false,
                    HasPFP: false,
                    Listeners: 0
                })
                if(error) throw error;
            } catch(error) { registerError.value = true }
        } catch(error) { registerError.value = true }
    }
    const login = async () => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email.value,
                password: pass.value
            })
            if(error) throw error;
            try{
                const { error } = await supabase.from('USER').update({ UserEmail: email.value }).eq('isOnline', true)
                if(error) throw error;
                const user = useSupabaseUser()
                if(user.value) router.push('/')
            } catch(error) { loginError.value = true; }
        } catch(error) { loginError.value = true; }
    }
    // const pfpUpload = async (ev) {
    //     const pfp = event?.target.files[0]
    // }
</script>

<template >
    <main class="h-screen w-screen flex flex-row">
        <div class="bg-neutral-800 min-h-dvh p-5 w-screen flex flex-col justify-center items-center">
            <form @submit.prevent="async () => (registerMode ? register() : login())" class="w-100 flex flex-col gap-4 items-center justify-center">
                <h3 v-if="registerMode">REGISTER FOR WAVY BAYBE</h3>
                <h3 v-if="loginError" class="text-red-500">LOGIN ERROR</h3>
                <h3 v-if="registerError" class="text-red-500">REGISTER ERROR</h3>
                <h3 v-else>LOGIN FOR WAVY BAYBE (doesnt work yet, just press the button to get to the homepage)</h3>
                <!-- <input v-if="registerMode" type="file" placeholder="Upload a Profile Picture" @change="pfpUpload" class="bg-gray-800 rounded p-3 w-full" accept="image/png, image/jpeg"> -->
                <input v-if="registerMode" type="text" placeholder="Username" v-model="username" class="bg-gray-800 rounded mb-6 p-3 w-full">
                <input type="email" placeholder="Email" v-model="email" class="bg-gray-800 rounded p-3 w-full">
                <input type="password" placeholder="Password" v-model="pass" class="bg-gray-800 rounded p-3 w-full">
                <button type="submit" class="p-3 test-white bg-blue-800 rounded w-full cursor-pointer">
                    <span v-if="registerMode">Sign Up</span>
                    <span v-else>Log In</span>
                </button> 
            </form>
            <button @click="registerMode = !registerMode" class="p-3 mt-6 test-white bg-purple-800 rounded w-60 cursor-pointer">
                <span v-if="registerMode">Log In instead</span>
                <span v-else>Register an Account</span>
            </button>
            <NuxtLink to="/" class="pt-3 text-neutral-400 underline">Continue as Guest</NuxtLink>
        </div>
    </main>
</template>

<style>
    body {
        color:white;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
</style>