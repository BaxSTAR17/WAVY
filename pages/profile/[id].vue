<script setup>
    const noUser = ref(false)
    const profileName = ref("PROFILE NAME")
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const route = useRoute()
    const online = ref(false)
    const selfProfile = ref(false)
    const id = ref(0)
    const podcasts = ref([])
    try {
        const { data, error } = await supabase.from('USER').select("*").eq('UserID', route.params.id)
        if(error) throw error
        profileName.value = data[0].UserName
        online.value = data[0].isOnline
    } catch(error) { noUser.value = true; console.log(error) }
    if(user.value) {
        try {
            const { data, error } = await supabase.from('USER').select("*").eq('UserEmail', user.value.email)
            if(error) throw error
            id = data[0].UserID
            if(data[0].UserID == route.params.id) selfProfile.value = true;
            try {
                const { data, error } = await supabase.from('PODCAST').select("*").eq('CreatorID', id).order('PodcastID', { ascending: false })
                if(error) throw error
                data.forEach((podcast) => {podcasts.value.push(podcast)})
            } catch(error) { console.log(error) }
        } catch(error) { console.log(error) }
    }

    onMounted(async () => {
    
    })
</script>

<template>
    <main class="h-screen w-screen flex flex-row">
        <LeftSidebar />
        <div class="bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col border-box p-5" v-if="noUser === false">
            <div class="w-full flex flex-row h-50 gap-3">
                <img src="../../public/WAVY Default Profile Picture.svg" alt="PFP" class="rounded-4xl h-40 w-40">
                <div class="w-full flex flex-col h-40 justify-evenly items-start">
                    <span class="text-4xl m-0 font-bold flex items-center gap-2">{{profileName}} <div v-if="isOnline" class="w-5 h-5 rounded-full bg-green-600"></div></span>
                    <span class="text-xl m-0">0 subscribers</span>
                    <div class="flex flex-row gap-3">
                        <button class="p-3 text-white tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl w-60 cursor-pointer">
                            <NuxtLink v-if="selfProfile" to="/upload" class="flex items-center gap-2"><UIcon name="i-uil-plus" size="25"/> UPLOAD PODCAST</NuxtLink>
                            <NuxtLink v-else-if="!user" to="/login" class="flex items-center gap-2">SIGN IN TO SUBSCRIBE</NuxtLink>
                            <span v-else>SUBSCRIBE</span>
                        </button>
                    </div>
                </div>
            </div>
            <hr class="w-full pl-0 ml-0 mt-0 mb-3" />
            <span class="text-4xl m-0 font-bold" v-if="selfProfile === false">RECENT UPLOADS</span>
            <span class="text-4xl m-0 font-bold" v-else>YOUR UPLOADS</span>
            <div v-if="podcasts.length > 0">
                <div class="w-full flex flex-col h-content" v-for="pod in podcasts">
                    <PodcastPlayer :uid="pod.CreatorID" :pid="pod.PodcastID"/>
                </div>
            </div>
            <div class="w-full h-100 flex flex-col justify-center items-center" v-else>
                <span v-if="selfProfile === false" class="text-neutral-500 text-4xl">The user has not yet uploaded</span>
                <span v-else class="text-neutral-500 text-4xl">You haven't uploaded anything yet</span>
                <UIcon name="i-uil-annoyed" class="text-neutral-500" size="70"/>
            </div>
        </div>
        <div class="bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col border-box p-5 items-center justify-center" v-else>
            <div class="text-3xl text-neutral-500">Sorry, The profile page requested does not exist</div>
            <UIcon name="i-uil-user-times" class="text-neutral-500" size="80"/>
        </div>
        <RightSidebar />
    </main>
</template>

<style>
</style>