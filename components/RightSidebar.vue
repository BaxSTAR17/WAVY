<template>
    <div class="bg-neutral-900 w-40 h-screen">
        <div class="flex flex-row-reverse">
            <div class="fixed pl-4 pt-6 pb-3 pr-6 h-screen max-h-400 justify-left overflow-y-auto">
                <div class="py-1 logo">
                    <NuxtLink to="/main" class="font-bold text-4xl leading-0">
                        <span class="bg-gradient-to-r from-blue-500 from-10% via-violet-600 via-50% to-purple-700 to-100% bg-clip-text text-transparent">WAVY</span>
                    </NuxtLink>
                </div>
                
                <hr class="w-28 pl-0 ml-0" />
                <div class="py-1">
                    <NuxtLink to="/main" class="text-sl text-white">
                        Home
                    </NuxtLink>
                </div>
                <div class="py-1">
                    <NuxtLink to="/" class="text-sl text-white">
                        Profile
                    </NuxtLink>
                </div>
                
                <div class="py-1">
                    <NuxtLink to="/" class="text-sl text-white">
                        Subscriptions
                    </NuxtLink>
                </div>

                <div class="py-1">
                    <NuxtLink to="/" class="text-sl text-white">
                        Liked
                    </NuxtLink>
                </div>

                <div class="py-1">
                    <NuxtLink to="/" class="text-sl text-white">
                        Settings
                    </NuxtLink>
                </div>

                <div class="py-1">
                    <NuxtLink to="/" class="text-sl text-white">
                        Log Out
                    </NuxtLink>
                </div>
                
                <div class="h-87" />

                <hr class="w-full p-0" />
                <div class="py-1">
                    <NuxtLink to="faq" class="text-xs/1 text-white">
                        Frequently Asked<br />Questions
                    </NuxtLink>
                </div>

                <div class="py-1">
                    <NuxtLink to="/" class="text-sl text-white">
                        About Us
                    </NuxtLink>
                </div>

                <div class="py-1">
                    <NuxtLink to="/" class="text-sl text-white">
                        Contact Us
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/*export default {
    setup () {return {}}
}*/
</script>

<style>
    .logo {
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }
</style>