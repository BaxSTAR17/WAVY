<script setup>
    const supabase = useSupabaseClient()
    const groups = ref([
    {
        id: 'Podcasts',
        label: 'Podcasts',
        items: [
            
        ]
    },
    {
        id: 'Users',
        label: 'Users',
        items: [
            
        ]
    }
    ])
    const fetchError = ref(false)
    const podsrc = ref('')
    const src = ref('')

    try{
        const { data, error } = await supabase.from('USER').select().order('Listeners', { ascending: false})
        if(error) throw error
        data.forEach(async (user) => {
            if(user.HasPFP === true) {
                const { error } = await supabase.storage.from('files').exists(`pfps/${user.UserID}.jpg`)
                if(error) src.value = supabase.storage.from('files').getPublicUrl(`pfps/${user.UserID}.png`).data.publicUrl
                else src.value = supabase.storage.from('files').getPublicUrl(`pfps/${user.UserID}.jpg`).data.publicUrl
            } else src.value = supabase.storage.from('files').getPublicUrl(`pfps/01110.svg`).data.publicUrl
            groups.value[1].items.push(
                {
                    label: user.UserName,
                    avatar: {
                        src: src.value
                    },
                    to: `/profile/${user.UserID}`
                }
            )
        })
        try {
            const { data: podcastdata, error } = await supabase.from('PODCAST').select('*').order('Listens', { ascending: false})
            if(error) throw error
            podcastdata.forEach(async (pod) => {
                try {
                    const { data: user, error } = await supabase.from('USER').select("UserID, HasPFP").eq("UserID", pod.CreatorID)
                    if(error) throw error
                    if(user[0].HasPFP === true) {
                        const { error } = await supabase.storage.from('files').exists(`pfps/${user[0].UserID}.jpg`)
                        if(error) podsrc.value = supabase.storage.from('files').getPublicUrl(`pfps/${user[0].UserID}.png`).data.publicUrl
                        else podsrc.value = supabase.storage.from('files').getPublicUrl(`pfps/${user[0].UserID}.jpg`).data.publicUrl
                    } else podsrc.value = supabase.storage.from('files').getPublicUrl(`thumbnails/01110.svg`).data.publicUrl
                } catch(error) { fetchError.value = true; console.log(error)}
                groups.value[0].items.push(
                    {
                        label: pod.Title,
                        avatar: {
                            src: podsrc.value
                        },
                        to: `/podcast/${pod.PodcastID}`
                    }
                )
            })
            fetchError.value = false;
        } catch(error) { fetchError.value = true;console.log(error) }
    } catch(error) { fetchError.value = true;console.log(error) }
    useHead({title:'Search | Wavy'})
</script>

<template>
    <div class="bg-neutral-300 dark:bg-neutral-800 w-full min-h-full block lg:hidden">
        <UCommandPalette :groups="groups"/>
    </div>
    <div class="bg-neutral-300 dark:bg-neutral-800 w-full min-h-full hidden lg:flex flex-col justify-center items-center">
        <div class="text-3xl text-center text-neutral-400 dark:text-neutral-500">Sorry, This page is only for mobile devices</div>
        <UIcon name="i-uil-desktop-slash" class="text-neutral-400 dark:text-neutral-400" size="80"/>
    </div>
</template>

<style>
</style>