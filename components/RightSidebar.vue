<script setup>
    const route = useRoute()
    const search = ref('')
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()
    const guestMode = ref(false)
    const fetchError = ref(true)
    const thumbnail = supabase.storage.from('files').getPublicUrl('thumbnails/01110.svg')
    const favorites = ref([])
    const favored = ref(false)
    const groups = ref([
    {
        id: 'Podcasts',
        label: 'Podcasts',
        items: [
            // {
            //     label: 'test',
            //     avatar: {
            //         src: thumbnail.data.publicUrl
            //     },
            //     to: '/podcast/0'
            // }
        ]
    },
    {
        id: 'Users',
        label: 'Users',
        items: [
            
        ]
    }
    ])

    try{
        const { data, error } = await supabase.from('USER').select().order('Listeners', { ascending: false})
        if(error) throw error
        const url = supabase.storage.from('files').getPublicUrl('pfps/01110.svg')
        data.forEach((user) => {
            groups.value[1].items.push(
                {
                    label: user.UserName,
                    avatar: {
                        src: url.data.publicUrl
                    },
                    to: `/profile/${user.UserID}`
                }
            )
        })
        try {
            const { data, error } = await supabase.from('PODCAST').select('*').order('Listens', { ascending: false})
            if(error) throw error
            const url = supabase.storage.from('files').getPublicUrl('thumbnails/01110.svg')
            data.forEach((pod) => {
                groups.value[0].items.push(
                    {
                        label: pod.Title,
                        avatar: {
                            src: url.data.publicUrl
                        },
                        to: `/podcast/${pod.PodcastID}`
                    }
                )
            })
            fetchError.value = false;
        } catch(error) { fetchError.value = true; }
    } catch(error) { fetchError.value = true; }

    onMounted(async () => {
        if(!user.value) {
            guestMode.value = true;
        } else {
            guestMode.value = false
            try {
                const { data: userdata, error } = await supabase.from('USER').select("UserID").eq("UserEmail", user.value.email)
                if(error) throw error
                try {
                    const { data: subdata, error } = await supabase.from('SUBSCRIBE FEED').select("CreatorID").eq("SubscriberID", userdata[0].UserID)
                    if(error) throw error
                    subdata.forEach(async (sub) => {
                        try {
                            const { data, error } = await supabase.from('USER').select("*").eq("UserID", sub.CreatorID)
                            if(error) throw error
                            favorites.value.push(data)
                            favored.value = true
                        } catch(error) { console.log(error) }
                    })
                } catch(error) { console.log(error) }
            } catch(error) { console.log(error) }
        }
    })
</script>

<template>
    <div class="bg-neutral-900 w-80 h-screen p-5 flex flex-col">
        <div class="w-full flex flex-col">
            <div class="w-full h-110" v-if="fetchError === false">
                <UCommandPalette placeholder="Search" :groups="groups" v-model="search" class="w-full flex-1 h-110"/>
            </div>
            <div class="w-full h-110 flex flex-col items-center" v-else>
                <Skeleload class="w-full h-110 rounded-xl bg-neutral-700" />
            </div>
            <hr class="w-full pl-0 ml-0" />
            <h1 class="text-xl font-bold">FAVORITE CREATORS</h1>
            <div class="w-full h-full overflow-y-auto flex flex-col gap-2">
                <NuxtLink to="/login" v-if="guestMode" style="font-weight: 100; font-family: 'Arial Narrow', sans-serif; text-decoration: underline; cursor: pointer">Sign in to subscribe to channels!</NuxtLink>
                <span v-if="favored === false && guestMode === false" class="text-lg text-center text-neutral-500 self-center">Users you subscribe to appear here</span>
                <UIcon v-if="favored===false && guestMode === false" name="i-uil-star" class="text-neutral-500 self-center" size="40" />
                <NuxtLink v-for="fav in favorites" :to="`/profile/${fav[0].UserID}`" class="rounded-xl bg-neutral-900 h-content w-full flex justify-start items-center gap-2">
                    <img src="../public/WAVY Default Profile Picture.svg" alt="pfp" class="w-5 h-5 rounded-full">
                    <span class="text-white text-lg">{{ fav[0].UserName }}</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style>
    .text-sl, .text-xs {
        font-family: Arial;
        font-weight: bold;
    } .text-sl {
        font-size: 1rem;
    }
</style>