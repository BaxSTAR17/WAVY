<script setup defer>
    const supabase = useSupabaseClient()
    const router = useRouter()
    const email = ref('')
    const pass2 = ref('')
    const pass = ref('')
    const username = ref('')
    const errormsg = ref('')
    const verifying = ref(false)
    const formChange = ref(()=>{})

    const registerMode = ref(false)

    const register = async () => {
        const form = document.getElementById('form')
        if(email.value.length == 0 || pass.value.length == 0 || username.value.length == 0 || pass2.value.length == 0) {
            errormsg.value = "* Please fill up all fields"
            return;
        } else if(pass.value !== pass2.value) {
            errormsg.value = "* Cannot confirm password, Please type your password correctly"
            form.reset()
            return;
        }
        const { count, error } = await supabase.from('USER').select().eq('UserName', username.value)
        if(count != 0) {
            errormsg.value = "* Username already taken"
            form.reset()
            return;
        }
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
                verifying.value = true
            } catch(error) { console.log(error); errormsg.value = "* Sorry, We're having trouble creating your account, Please try again later"; form.reset() }
        } catch(error) { console.log(error); errormsg.value = "* Sorry, We're having trouble registering your account, Please try again later"; form.reset() }
    }
    const login = async () => {
        if(email.value.length == 0 || pass.value.length == 0) {
            errormsg.value = "* Please fill up all fields"
            form.reset()
            return;
        }
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
            } catch(error) { console.log(error); errormsg.value = "* Sorry, We're having trouble logging you in, Please try again later"; form.reset() }
        } catch(error) { console.log(error); errormsg.value = "* Invalid credentials. Please check your email and password"; form.reset() }
    }
    // const pfpUpload = async (ev) {
    //     const pfp = event?.target.files[0]
    // }
    onMounted(() => {
        formChange.value = () => {
            
        }
    })
</script>

<template >
    <main class="h-screen w-screen flex flex-row">
        <div class="bg-neutral-900 min-h-dvh w-full">
            <!--This is for the landing page picture just like in the canva-->
        </div>
        <div class="bg-neutral-800 min-h-dvh p-5 w-120 flex flex-col justify-center items-center">
            <form @submit.prevent="async () => (registerMode ? register() : login())" id="form" class="w-100 flex flex-col gap-2 items-start justify-center">
                <h1 v-if="registerMode && verifying" class="w-full self-center text-center text-4xl flex flex-col items-center">Please check your email to verify your account<UIcon name="i-uil-fast-mail" size="100"/></h1>
                <h3 class="m-0" v-if="registerMode && !verifying">Username</h3>
                <!-- <input v-if="registerMode" type="file" placeholder="Upload a Profile Picture" @change="pfpUpload" class="bg-gray-800 rounded p-3 w-full" accept="image/png, image/jpeg"> -->
                <input v-if="registerMode && !verifying" type="text" placeholder="podcastLover17" v-model="username" class="h-9 bg-[#4e4b55] rounded-3xl mb-6 p-3 w-full">
                <h3 v-if="!verifying" class="m-0">Email</h3>
                <input v-if="!verifying" type="email" placeholder="email@RGB.com" v-model="email" class="h-9 bg-[#4e4b55] rounded-3xl p-3 w-full">
                <h3 v-if="!verifying" class="m-0">Password</h3>
                <input v-if="!verifying" type="password" autocomplete="new-password" placeholder="pass123" v-model="pass" class="h-9 bg-[#4e4b55] rounded-3xl p-3 w-full">
                <h3 class="m-0" v-if="registerMode && !verifying">Confirm Password</h3>
                <input  v-if="registerMode && !verifying" type="password" autocomplete="new-password" placeholder="pass123" v-model="pass2" class="h-9 bg-[#4e4b55] rounded-3xl p-3 w-full">
                <div class="text-red-500 error h-10" v-if="!verifying">{{ errormsg }}</div>
                <button v-if="!verifying" type="submit" class="p-3 text-white tracking-widest bg-purple-800 rounded-2xl w-50 self-center cursor-pointer">
                    <span v-if="registerMode">REGISTER</span>
                    <span v-else>LOG IN</span>
                </button> 
            </form>
            <div class="p-3 mt-6 text-white w-full cursor-pointer flex items-center justify-center">
                <span class="flex" v-if="registerMode">Already have an account? <span @click="registerMode = false; formChange()" class="text-purple-800">&nbsp;Log In Instead!</span></span>
                <span class="flex" v-else>Don't have an account? <span @click="registerMode = true; formChange()" class="text-purple-800">&nbsp;Register now!</span></span>
            </div>
            <NuxtLink to="/" class="pt-3 text-neutral-400 underline">Continue as Guest</NuxtLink>
        </div>
    </main>
</template>

<style>
    body {
        color:white;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    h3, .error {
        color: white;
        font-family: 'Arial Narrow', sans-serif;
        font-weight: 500;
    } .error { color: red; }
</style>