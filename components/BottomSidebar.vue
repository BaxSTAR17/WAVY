<script setup>
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const guestMode = ref(true)
    const id = ref(0)

    onMounted(async () => {
        if(user.value) {
            guestMode.value = false
            try {
                const { data:userdata, error } = await supabase.from('USER').select("UserID").eq("UserEmail", user.value.email)
                if(error) throw error
                id.value = userdata[0].UserID
            } catch(error) { console.log(error) }
        }
    })
</script>

<template>
    <div class="bg-neutral-100 dark:bg-neutral-900 min-h-20 w-full flex items-center">
        <NuxtLink to="/" class="flex flex-col w-full min-h-20 justify-center items-center rounded-3xl hover:bg-neutral-200 dark:hover:bg-neutral-800" v-show="useRoute().path !== '/'">
            <UIcon name="i-basil-home-outline" size="30" class="text-neutral-900 dark:text-neutral-100"/>
            <span class="text-neutral-900 dark:text-neutral-100">Home</span>
        </NuxtLink>
        <div class="flex flex-col w-full min-h-20 justify-center items-center rounded-3xl" v-show="useRoute().path === '/'">
            <UIcon name="i-basil-home-solid" size="30" class="text-neutral-900 dark:text-neutral-100"/>
            <span class="font-bold text-neutral-900 dark:text-neutral-100">Home</span>
        </div>
        <NuxtLink to="/favoritesmob" v-show="useRoute().path !== '/favoritesmob' && useRoute().path !== '/likes' && useRoute().path !== '/subscriptions'" class="flex flex-col w-full min-h-20 justify-center items-center rounded-3xl hover:bg-neutral-200 dark:hover:bg-neutral-800">
            <UIcon name="i-basil-star-outline" size="30" class="text-neutral-900 dark:text-neutral-100"/>
            <span class="text-neutral-900 dark:text-neutral-100">Favorites</span>
        </NuxtLink>
        <NuxtLink to="/favoritesmob" v-show="useRoute().path === '/favoritesmob' || useRoute().path === '/likes' || useRoute().path === '/subscriptions'" class="flex flex-col w-full min-h-20 justify-center items-center rounded-3xl hover:bg-neutral-200 dark:hover:bg-neutral-800">
            <UIcon name="i-basil-star-solid" size="30" class="text-neutral-900 dark:text-neutral-100"/>
            <span class="font-bold text-neutral-900 dark:text-neutral-100">Favorites</span>
        </NuxtLink>
        <NuxtLink to="/login" class="flex flex-col w-full min-h-20 justify-center items-center rounded-3xl hover:bg-neutral-200 dark:hover:bg-neutral-800" v-if="guestMode === true">
            <UIcon name="i-basil-user-outline" size="30" class="text-neutral-900 dark:text-neutral-100"/>
            <span class="text-neutral-900 dark:text-neutral-100">Log In</span>
        </NuxtLink>
        <NuxtLink :to="`/profile/${id}`" class="flex flex-col w-full min-h-20 justify-center items-center rounded-3xl hover:bg-neutral-200 dark:hover:bg-neutral-800" v-show="guestMode === false && useRoute().path !== `/profile/${id}`">
            <UIcon name="i-basil-user-outline" size="30" class="text-neutral-900 dark:text-neutral-100"/>
            <span class="text-neutral-900 dark:text-neutral-100">Profile</span>
        </NuxtLink>
        <NuxtLink :to="`/profile/${id}`" class="flex flex-col w-full min-h-20 justify-center items-center rounded-3xl hover:bg-neutral-200 dark:hover:bg-neutral-800" v-show="guestMode === false && useRoute().path === `/profile/${id}`">
            <UIcon name="i-basil-user-solid" size="30" class="text-neutral-900 dark:text-neutral-100"/>
            <span class="font-bold text-neutral-900 dark:text-neutral-100">Profile</span>
        </NuxtLink>
        <NuxtLink to="/informationmob" v-show="useRoute().path !== '/informationmob' && useRoute().path !== '/faq' && useRoute().path !== '/about' && useRoute().path !== '/contact'" class="flex flex-col w-full min-h-20 justify-center items-center rounded-3xl hover:bg-neutral-200 dark:hover:bg-neutral-800">
            <UIcon name="i-basil-info-circle-outline" size="30" class="text-neutral-900 dark:text-neutral-100"/>
            <span class="text-neutral-900 dark:text-neutral-100">Information</span>
        </NuxtLink>
        <NuxtLink to="/informationmob" v-show="useRoute().path === '/informationmob' || useRoute().path === '/faq' || useRoute().path === '/about' || useRoute().path === '/contact'" class="flex flex-col w-full min-h-20 justify-center items-center rounded-3xl hover:bg-neutral-200 dark:hover:bg-neutral-800">
            <UIcon name="i-basil-info-circle-solid" size="30" class="text-neutral-900 dark:text-neutral-100"/>
            <span class="font-bold text-neutral-900 dark:text-neutral-100">Information</span>
        </NuxtLink>
    </div>
</template>

<style>

</style>