<script setup>
    const route = useRoute()
    const search = ref('')
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()
    const guestMode = ref(false)
    const fetchError = ref(false)
    const groups = ref([
    {
        id: 'Podcasts',
        label: 'Podcasts',
        items: [
            {
                label: 'test',
                icon: 'i-uil-play'
            }
        ]
    },
    {
        id: 'Users',
        label: 'Users',
        items: [
            
        ]
    }
    ])

    onMounted(async () => {
        if(!user.value) {
            guestMode.value = true;
        } else {
            guestMode.value = false
        }
        try{
            const { data, error } = await supabase.from('USER').select().order('Listeners', { ascending: false})
            if(error) throw error
            data.forEach((user) => {
                groups.value[1].items.push(
                    {
                        label: user.UserName,
                        icon: 'i-uil-user'
                    }
                )
            })
        } catch(error) { console.log(error) }
    })
</script>

<template>
    <div class="bg-neutral-900 w-80 h-screen p-5 flex flex-col">
        <div class="w-full flex flex-col">
            <div class="w-full h-110">
                <UCommandPalette placeholder="Search" :groups="groups" v-model="search" class="w-full flex-1 h-110"/>
            </div>
            <hr class="w-full pl-0 ml-0" />
            <h1 class="text-xl">FAVORITE CREATORS</h1>
            <NuxtLink to="/login" v-if="guestMode" style="font-weight: 100; font-family: 'Arial Narrow', sans-serif; text-decoration: underline; cursor: pointer">Sign in to subscribe to channels!</NuxtLink>
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