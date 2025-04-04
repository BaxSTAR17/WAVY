<template>
    <div class="bg-neutral-900 w-70 h-screen justify-left p-5 flex flex-col justify-between">
        <div class="w-full flex flex-col">
            <div class="py-1 logo">
                <NuxtLink to="/" class="font-bold text-4xl leading-0">
                    <span class="bg-gradient-to-r from-blue-500 from-10% via-violet-600 via-50% to-purple-700 to-100% bg-clip-text text-transparent">WAVY</span>
                </NuxtLink>
            </div>
            
            <hr class="w-full pl-0 ml-0" />
            <div class="pt-3">
                <NuxtLink to="/" class="text-sl text-white cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-700 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-home-alt" size="21" />
                    <span class="font-extrabold underline" v-if="useRoute().path === '/'">Home</span>
                    <span v-else>Home</span>
                </NuxtLink>
            </div>
            <div class="pt-3" v-if="guestMode === false">
                <NuxtLink to="/" class="text-sl text-white cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-700 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-user-circle" size="21" />
                    <span>Profile</span>
                </NuxtLink>
            </div>
            
            <div class="pt-3" v-if="guestMode === false">
                <NuxtLink to="/" class="text-sl text-white cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-700 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-headphones" size="21" />
                    <span>Subscriptions</span>
                </NuxtLink>
            </div>

            <div class="pt-3" v-if="guestMode === false">
                <NuxtLink to="/" class="text-sl text-white cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-700 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-heart" size="22" />
                    <span>Liked</span>
                </NuxtLink>
            </div>

            <div class="pt-3">
                <NuxtLink to="/" class="text-sl text-white cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-700 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-setting" size="21" />
                    <span>Settings</span>
                </NuxtLink>
            </div>

            <div class="pt-3">
                <button @click="logOut" class="text-sl cursor-pointer flex flex-row gap-2 items-center text-red-500 w-full rounded-xl hover:bg-neutral-700 transition-all duration-80 ease-linear p-1" v-if="guestMode == false">
                    <UIcon name="i-uil-signout" size="21" class="text-red-500"/>
                    <span class="text-red-500">Log Out</span>
                </button>
                <NuxtLink to="/login" class="text-sl cursor-pointer flex flex-row gap-2 items-center text-red-500 w-full rounded-xl hover:bg-neutral-700 transition-all duration-80 ease-linear p-1" v-else>
                    <UIcon name="i-uil-signin" size="21" class="text-purple-400"/>
                    <span class="text-purple-400">Log In</span>
                </NuxtLink>
            </div>
        </div>

        <div class="w-full flex flex-col">
            <hr class="w-full pl-0 ml-0" />
            <!-- <div class="pt-3">
            <NuxtLink to="/" class="text-sl text-white cursor-pointer flex flex-row gap-2 items-center">
                <UIcon name="i-uil-sitemap" size="21" />
                <span>Sitemap (?)</span>
            </NuxtLink>
            </div> -->
            
            <div class="pt-3">
                <NuxtLink to="/faq" class="text-sl text-white cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-700 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-question-circle" size="40" />
                    <span class="underline" v-if="useRoute().path === '/faq'">Frequently Asked Questions (FAQ)</span>
                    <span v-else>Frequently Asked Questions (FAQ)</span>
                </NuxtLink>
            </div>

            <div class="pt-3">
                <NuxtLink to="/" class="text-sl text-white cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-700 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-users-alt" size="21" />
                    <span>About Us</span>
                </NuxtLink>
            </div>

            <div class="pt-3">
                <NuxtLink to="/" class="text-sl text-white cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-700 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-phone" size="21"/>
                    <span>Contact Us</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const router = useRouter()
    const logOutError = ref(false)
    const guestMode = ref(false)
    const email = ref('')
    const logOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if(error) throw error;
            try {
                const { error } = await supabase.from('USER').update({ UserEmail: email.value }).eq('isOnline', false);
                if(error) throw error;
                router.push("/login")
            } catch(error) { logOutError.value = true }
        } catch(error) { logOutError.value = true }
    }
    onMounted(async () => {
        if(!user.value) {
            guestMode.value = true;
        } else {
            guestMode.value = false
            email.value = user.value.email
        }
    })
</script>

<style>
    .logo {
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }

    .text-sl, .text-xs {
        font-family: Arial;
        font-weight: bold;
    } .text-sl {
        font-size: 1rem;
    }
</style>