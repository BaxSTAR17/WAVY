<template>
    <div class="bg-neutral-900 w-64 h-screen">
        <div class="flex flex-col">
            <div class="fixed pl-6 pt-8 pb-6 pr-12 h-screen max-h-400 justify-left overflow-y-auto">
                <div class="py-1 logo">
                    <NuxtLink to="/main" class="font-bold text-4xl leading-0">
                        <span class="bg-gradient-to-r from-blue-500 from-10% via-violet-600 via-50% to-purple-700 to-100% bg-clip-text text-transparent">WAVY</span>
                    </NuxtLink>
                </div>
                
                <div class="py-1">
                    <NuxtLink to="/main" class="text-xl text-white">
                        Home
                    </NuxtLink>
                </div>

                <div class="py-1">
                    <NuxtLink to="/" class="text-xl text-white">
                        Search
                    </NuxtLink>
                </div>
                
                <div class="py-1">
                    <NuxtLink to="/" class="text-xl text-white">
                        Liked
                    </NuxtLink>
                </div>

                <div class="py-1">
                    <NuxtLink to="/" class="text-xl text-white">
                        Profile
                    </NuxtLink>
                </div>

                <div class="py-1">
                    <NuxtLink to="/" class="text-xl text-white">
                        Settings
                    </NuxtLink>
                </div>

                <div class="py-1">
                    <NuxtLink to="/" class="text-xl text-white">
                        About Us
                    </NuxtLink>
                </div>

                <div class="py-1">
                    <NuxtLink to="/" class="text-xl text-white">
                        Contact Us
                    </NuxtLink>
                </div>

                <div class="py-1">
                    <NuxtLink to="/faq" class="text-xl text-white">
                        FAQ
                    </NuxtLink>
                </div>

                <div class="py-1">
                    <NuxtLink to="/" class="text-xl text-white">
                        Log Out
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style>
    .logo {
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }
</style>