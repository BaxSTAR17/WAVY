<script setup defer>
    const supabase = useSupabaseClient()
    const email = ref('')
    const pass2 = ref('')
    const pass = ref('')
    const username = ref('')
    const errormsg = ref('')
    const verifying = ref(false)
    const loading = ref(false)

    const register = async () => {
        if(loading.value === false) {
            const form = document.getElementById('form')
            if(email.value.length == 0 || pass.value.length == 0 || username.value.length == 0 || pass2.value.length == 0) {
                errormsg.value = "* Please fill up all fields"
                return;
            } else if(pass.value !== pass2.value) {
                errormsg.value = "* Cannot confirm password, Please type your password correctly"
                form.reset()
                return;
            } else if(pass.value.length < 6 || pass2.value.length < 6) {
                errormsg.value = "* Password should be at least 6 characters"
                form.reset()
                return;
            }
            const { data, error: error } = await supabase.from('USER').select('*').eq('UserName', username.value)
            if(data.length > 0) {
                errormsg.value = "* Username already taken"
                form.reset()
                return;
            }
            const { data: emaildata, error: error2 } = await supabase.from('USER').select('*').eq('UserEmail', email.value)
            if(emaildata.length > 0) {
                errormsg.value = "* Email already taken"
                form.reset()
                return;
            }
            loading.value = true;
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
                        isOnline: false,
                        isPrivate: false,
                        HasPFP: false,
                        Listeners: 0
                    })
                    if(error) throw error;
                    verifying.value = true;
                } catch(error) { console.log(error); loading.value = false; errormsg.value = "* Sorry, We're having trouble creating your account, Please try again later"; form.reset() }
            } catch(error) { console.log(error); loading.value = false; errormsg.value = "* Sorry, We're having trouble registering your account, Please try again later"; form.reset() }
        }
    }
    // const pfpUpload = async (ev) {
    //     const pfp = event?.target.files[0]
    // }
    onMounted(() => {
        
    })
</script>

<template >
    <main class="h-screen w-screen flex flex-row">
        <div class="bg-neutral-100 dark:bg-neutral-900 min-h-dvh w-full hidden lg:flex flex-col items-start">
            <div class="p-3">
                <NuxtLink to="/" class="font-bold text-4xl leading-0">
                    <img id="logo" class="hidden dark:block h-10" src='../public/WAVY Main Logo (White).svg' alt="Wavy Logo">
                    <img id="logo" class="block dark:hidden h-10" src='../public/WAVY Main Logo (Black).svg' alt="Wavy Logo">
                </NuxtLink>
            </div>
            <hr class="w-full pl-0 ml-0 mt-3 text-neutral-900 dark:text-neutral-100" />
            <div class="w-full h-full flex items-center gap-6 border-box p-6 flex-wrap">
                <div class="w-15 h-100" style="background:linear-gradient(#00A2E8, #7E84F7, #732BF5)"></div>
                <div class="flex flex-col h-100 w-50 text-9xl font-bold text-neutral-900 dark:text-neutral-100"> WE ALWAYS LISTEN</div>
            </div>
        </div>
        <div class="bg-neutral-300 dark:bg-neutral-800 min-h-dvh p-5 w-full lg:w-120 flex flex-col justify-start items-center">
            <NuxtLink to="/" class="font-bold text-4xl leading-0 block lg:hidden self-start mb-20">
                <img id="logo" class="hidden dark:block h-10" src='../public/WAVY Main Logo (White).svg' alt="Wavy Logo">
                <img id="logo" class="block dark:hidden h-10" src='../public/WAVY Main Logo (Black).svg' alt="Wavy Logo">
            </NuxtLink>
            <form @submit.prevent="register()" id="form" class="w-100 flex flex-col gap-2 items-start justify-center">
                <h1 v-if="verifying" class="w-full self-center text-center text-neutral-900 dark:text-neutral-100 text-4xl flex flex-col items-center">Please check your email to verify your account<UIcon name="i-uil-fast-mail" size="100"/></h1>
                <h3 class="m-0 text-neutral-900 dark:text-neutral-100" v-if="!verifying">Username</h3>
                <!-- <input v-if="registerMode" type="file" placeholder="Upload a Profile Picture" @change="pfpUpload" class="bg-gray-800 rounded p-3 w-full" accept="image/png, image/jpeg"> -->
                <input name="username" v-if="!verifying" type="text" placeholder="podcastLover17" v-model="username" class="h-9 bg-neutral-400 dark:bg-[#4e4b55] rounded-3xl mb-6 p-3 w-full text-neutral-900 dark:text-neutral-100">
                <h3 v-if="!verifying" class="m-0 text-neutral-900 dark:text-neutral-100">Email</h3>
                <input name="email" v-if="!verifying" type="email" placeholder="email@RGB.com" v-model="email" class="h-9 bg-neutral-400 dark:bg-[#4e4b55] rounded-3xl p-3 w-full text-neutral-900 dark:text-neutral-100">
                <h3 v-if="!verifying" class="m-0 text-neutral-900 dark:text-neutral-100">Password</h3>
                <input name="password" v-if="!verifying" type="password" autocomplete="new-password" placeholder="pass123" v-model="pass" class="h-9 bg-neutral-400 dark:bg-[#4e4b55] rounded-3xl p-3 w-full text-neutral-900 dark:text-neutral-100">
                <h3 class="m-0 text-neutral-900 dark:text-neutral-100" v-if="!verifying">Confirm Password</h3>
                <input name="confirm" v-if="!verifying" type="password" autocomplete="new-password" placeholder="pass123" v-model="pass2" class="h-9 bg-neutral-400 dark:bg-[#4e4b55] rounded-3xl p-3 w-full text-neutral-900 dark:text-neutral-100">
                <div class="text-red-500 error h-10" v-if="!verifying">{{ errormsg }}</div>
                <button v-if="!verifying" type="submit" class="p-3 text-white tracking-widest bg-purple-800 rounded-2xl w-50 self-center cursor-pointer">
                    <span v-if="loading === false">REGISTER</span>
                    <span v-else><UIcon name="i-svg-spinners-bars-scale" /></span>
                </button> 
            </form>
            <div class="p-3 mt-6 text-white w-full cursor-pointer flex items-center justify-center">
                <span class="flex text-neutral-900 dark:text-neutral-100">Already have an account? <NuxtLink to="./login" class="text-purple-600 dark:text-purple-400">&nbsp;Log In Instead!</NuxtLink></span>
            </div>
            <NuxtLink to="/" class="pt-3 text-neutral-400 underline">Continue as Guest</NuxtLink>
        </div>
    </main>
</template>

<style>
    body {
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    h3, .error {
        font-family: 'Arial Narrow', sans-serif;
        font-weight: 500;
    } .error { color: red; }
</style>