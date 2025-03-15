<template>
    <div class="bg-neutral-900">
        <div class="flex flex-col w-64">
            <div class="fixed pl-6 pt-8 pb-6 pr-12 h-full justify-left overflow-y-auto">
                <div class="py-1 logo">
                    <NuxtLink to="/" class="font-bold text-4xl leading-0">
                        <span class="bg-gradient-to-r from-blue-500 from-10% via-violet-600 via-50% to-purple-700 to-100% bg-clip-text text-transparent">WAVY</span>
                    </NuxtLink>
                </div>
                
                <div class="py-1">
                    <NuxtLink to="/" class="text-xl text-white">
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
                        Favorites
                    </NuxtLink>
                </div>

                <div class="py-1">
                    <NuxtLink to="/" class="text-xl text-white">
                        Saved
                    </NuxtLink>
                </div>

                <div class="py-1">
                    <NuxtLink to="/" class="text-xl text-white">
                        History
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