<script setup>
import { NuxtLink } from '#components'

    const loading = ref(true)
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const router = useRouter()
    const logOutError = ref(false)
    const guestMode = ref(false)
    const email = ref('')
    const pending = ref(true)
    const id = ref(0)
    const darkMode = ref(true)

    const logOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if(error) throw error;
            try {
                const { error } = await supabase.from('USER').update({ isOnline: false}).eq('UserEmail', email.value);
                if(error) throw error;
                router.push("/login")
            } catch(error) { logOutError.value = true; console.log(error) }
        } catch(error) { logOutError.value = true; console.log(error) }
    }
    onMounted(async () => { 
        if(!user.value) {
            pending.value = false;
            guestMode.value = true;
        } else {
            pending.value = false;
            guestMode.value = false
            email.value = user.value.email
            const { data, error } = await supabase.from('USER').select('*').eq('UserEmail', user.value.email)
            if(error) logOutError.value = true
            else {
                id.value = data[0].UserID
            }
        }
        loading.value = false
        if(document.documentElement.classList.contains('dark') === false)  darkMode.value = false
        else darkMode.value = true
    })
</script>

<template>
    <div class="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 w-70 h-screen justify-left p-5 flex flex-col justify-between" v-if="logOutError === false && loading === false">
        <div class="w-full flex flex-col">
            <UTooltip :content="{align:'start'}" text="WAVY">
            <div class="py-1 logo">
                <NuxtLink to="/" class="font-bold text-4xl leading-0">
                    <img id="logo" class="hidden dark:block" src='../public/WAVY Main Logo (White).svg' alt="Wavy Logo">
                    <img id="logo" class="block dark:hidden" src='../public/WAVY Main Logo (Black).svg' alt="Wavy Logo">
                </NuxtLink>
            </div>
            </UTooltip>
            
            <hr class="w-full pl-0 ml-0 mt-3" />
            <UTooltip :content="{align:'start'}" text="Home">
            <div class="pt-3" v-if="useRoute().path !== '/register'">
                <NuxtLink to="/" class="text-sl text-neutral-900 dark:text-neutral-100 cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-home-alt" size="21" />
                    <span class="font-extrabold underline" v-if="useRoute().path === '/'">Home</span>
                    <span v-else>Home</span>
                </NuxtLink>
            </div>
            </UTooltip>
            <UTooltip :content="{align:'start'}" text="Profile">
            <div class="pt-3" v-if="guestMode === false">
                <NuxtLink :to="`/profile/${id}`" class="text-sl text-neutral-900 dark:text-neutral-100 cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-user-circle" size="21" />
                    <span class="font-extrabold underline" v-if="useRoute().path === `/profile/${id}`">Profile</span>
                    <span v-else>Profile</span>
                </NuxtLink>
            </div>
            </UTooltip>
            <UTooltip :content="{align:'start'}" text="Subscriptions">
            <div class="pt-3" v-if="guestMode === false">
                <NuxtLink to="/subscriptions" class="text-sl text-neutral-900 dark:text-neutral-100 cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-headphones" size="21" />
                    <span class="font-extrabold underline" v-if="useRoute().path === '/subscriptions'">Subscriptions</span>
                    <span v-else>Subscriptions</span>
                </NuxtLink>
            </div>
            </UTooltip>
            <UTooltip :content="{align:'start'}" text="Liked">
            <div class="pt-3" v-if="guestMode === false">
                <NuxtLink to="/likes" class="text-sl text-neutral-900 dark:text-neutral-100 cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-heart" size="22" />
                    <span class="font-extrabold underline" v-if="useRoute().path === '/likes'">Liked</span>
                    <span v-else>Liked</span>
                </NuxtLink>
            </div>
            </UTooltip>
            <UTooltip :content="{align:'start'}" text="Settings">
            <div class="pt-3" v-if="useRoute().path !== '/register'">
                <NuxtLink to="/settings" class="text-sl text-neutral-900 dark:text-neutral-100 cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-setting" size="21" />
                    <span class="font-extrabold underline" v-if="useRoute().path === '/settings'">Settings</span>
                    <span v-else>Settings</span>
                </NuxtLink>
            </div>
            </UTooltip>
            <div class="pt-3" v-if="useRoute().path !== '/register'">
                <UTooltip :content="{align:'start'}" text="Log Out">
                <button @click="logOut" class="text-sl cursor-pointer flex flex-row gap-2 items-center text-red-500 w-full rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-80 ease-linear p-1" v-if="guestMode === false">
                    <UIcon name="i-uil-signout" size="21" class="text-red-500"/>
                    <span class="text-red-500">Log Out</span>
                </button>
                </UTooltip>
                <UTooltip :content="{align:'start'}" text="Log In">
                <NuxtLink to="/login" class="text-sl cursor-pointer flex flex-row gap-2 items-center text-red-500 w-full rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-80 ease-linear p-1" v-if="guestMode === true">
                    <UIcon name="i-uil-signin" size="21" class="text-purple-400"/>
                    <span class="text-purple-400">Log In</span>
                </NuxtLink>
                </UTooltip>
            </div>
            <UTooltip :content="{align:'start'}" text="Upload a Podcast">
            <NuxtLink to="/upload" v-if="guestMode === false && useRoute().path !== '/upload'" class="p-2 text-neutral-900 dark:text-neutral-100 text-md flex itemx-center justify-start gap-2 mt-3 tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl w-full cursor-pointer">
                <UIcon name="i-uil-plus" size="20"/> UPLOAD
            </NuxtLink>
            </UTooltip>
        </div>

        <div class="w-full flex flex-col">
            <hr class="w-full pl-0 ml-0" />
            <!-- <div class="pt-3">
            <NuxtLink to="/" class="text-sl text-white cursor-pointer flex flex-row gap-2 items-center">
                <UIcon name="i-uil-sitemap" size="21" />
                <span>Sitemap (?)</span>
            </NuxtLink>
            </div> -->
            
            <UTooltip :content="{align:'start'}" text="Frequently Asked Questions">
            <div class="pt-3">
                <NuxtLink to="/faq" class="text-sl text-neutral-900 dark:text-neutral-100 cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-question-circle" size="40" />
                    <span class="underline" v-if="useRoute().path === '/faq'">Frequently Asked Questions (FAQ)</span>
                    <span v-else>Frequently Asked Questions (FAQ)</span>
                </NuxtLink>
            </div>
            </UTooltip>
            <UTooltip :content="{align:'start'}" text="About Us">
            <div class="pt-3">
                <NuxtLink to="/about" class="text-sl text-neutral-900 dark:text-neutral-100 cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-users-alt" size="21" />
                    <span class="underline" v-if="useRoute().path === '/about'">About Us</span>
                    <span v-else>About Us</span>
                </NuxtLink>
            </div>
            </UTooltip>
            <UTooltip :content="{align:'start'}" text="Contact Us">
            <div class="pt-3">
                <NuxtLink to="/contact" class="text-sl text-neutral-900 dark:text-neutral-100 cursor-pointer flex flex-row gap-2 items-center w-full rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-80 ease-linear p-1">
                    <UIcon name="i-uil-phone" size="21"/>
                    <span>Contact Us</span>
                </NuxtLink>
            </div>
            </UTooltip>
        </div>
    </div>
    <div class="bg-neutral-900 w-70 h-screen justify-left p-5 flex flex-col justify-center items-center gap-5" v-else-if="logOutError === true && loading === false">
        <div class="text-3xl text-neutral-500">Sorry, An unexpected error occurred</div>
        <UIcon name="i-uil-sync-exclamation" class="text-neutral-500" size="80"/>
    </div>
    <div class="bg-neutral-900 w-70 h-screen justify-left p-5 flex flex-col justify-start items-center gap-2" v-else-if="logOutError === false && loading === true">
        <Skeleload class="rounded-lg bg-neutral-600 h-[45px] w-full pb-[4px] pt-[4px]" />
        <hr class="w-full pl-0 ml-0 mt-1" />
        <Skeleload class="rounded-lg bg-neutral-600 h-[32px] w-full mt-1" />
        <Skeleload class="rounded-lg bg-neutral-600 h-[32px] w-full mt-1" />
        <Skeleload class="rounded-lg bg-neutral-600 h-[32px] w-full mt-1" />
    </div>
</template>

<style>
    .logo {
        
    }

    .text-sl, .text-xs {
        font-weight: bold;
    } .text-sl {
        font-size: 1rem;
    }
</style>