<script setup defer>
    const supabase = useSupabaseClient()
    const router = useRouter()
    const email = ref('')
    const pass = ref('')
    const errormsg = ref('')
    const loading = ref(false)

    const login = async () => {
        if(loading.value === false) {
            if(email.value.length == 0 || pass.value.length == 0) {
                errormsg.value = "* Please fill up all fields"
                form.reset()
                return;
            }
            loading.value = true
            try {
                const { error } = await supabase.auth.signInWithPassword({
                    email: email.value,
                    password: pass.value
                })
                if(error) throw error;
                try{
                    const { error } = await supabase.from('USER').update({ isOnline: false}).eq('UserEmail', email.value);
                    if(error) throw error;
                    const user = useSupabaseUser()
                    if(user.value) router.push('/')
                } catch(error) { console.log(error); loading.value = false; errormsg.value = "* Sorry, We're having trouble logging you in, Please try again later"; form.reset() }
            } catch(error) { console.log(error); loading.value = false; errormsg.value = "* Invalid credentials. Please check your email and password"; form.reset() }
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
        <div class="bg-neutral-300 dark:bg-neutral-800 min-h-dvh p-5 w-full lg:w-120 flex flex-col justify-start lg:justify-center items-center">
            <NuxtLink to="/" class="font-bold text-4xl leading-0 block lg:hidden self-start mb-20">
                <img id="logo" class="hidden dark:block h-10" src='../public/WAVY Main Logo (White).svg' alt="Wavy Logo">
                <img id="logo" class="block dark:hidden h-10" src='../public/WAVY Main Logo (Black).svg' alt="Wavy Logo">
            </NuxtLink>
            <form @submit.prevent="login()" id="form" class="w-100 flex flex-col gap-2 items-start justify-center">
                <h3 class="m-0 text-neutral-900 dark:text-neutral-100">Email</h3>
                <input type="email" placeholder="email@RGB.com" v-model="email" class="text-neutral-900 dark:text-neutral-100 h-9 bg-neutral-400 dark:bg-[#4e4b55] rounded-3xl p-3 w-full">
                <h3 class="m-0 text-neutral-900 dark:text-neutral-100">Password</h3>
                <input type="password" autocomplete="new-password" placeholder="pass123" v-model="pass" class="text-neutral-900 dark:text-neutral-100 h-9 bg-neutral-400 dark:bg-[#4e4b55] rounded-3xl p-3 w-full">
                <div class="text-red-500 error h-10">{{ errormsg }}</div>
                <button type="submit" class="p-3 text-white tracking-widest bg-purple-800 rounded-2xl w-50 self-center cursor-pointer">
                    <span v-if="loading === false">LOG IN</span>
                    <span v-else><UIcon name="i-svg-spinners-bars-scale" /></span>
                </button> 
            </form>
            <div class="p-3 mt-6 text-white w-full cursor-pointer flex items-center justify-center">
                <span class="flex text-neutral-900 dark:text-neutral-100">Don't have an account? <NuxtLink to="/register" class="text-purple-600 dark:text-purple-400">&nbsp;Register now!</NuxtLink></span>
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