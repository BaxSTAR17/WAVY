<script setup>
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()
    const username = ref('')
    const guestMode = ref(true)
    const mode = ref('mode1')
    const homeError = ref(false)
    const id = ref(0)
    const explore = ref([])
    const foryou = ref([])
    const src = ref('')
    const compare = (a, b) => {
        if(a < b) return -1
        else if(a > b) return 1
        return 0
    }
    try {
        const { data, error } = await supabase.from('PODCAST').select('*').order('Likes', { ascending: false })
        if(error) throw error
        data.forEach((explores) => { explore.value.push(explores)})
    } catch(error) { homeError.value = true; console.log(error) }
    src.value = supabase.storage.from('files').getPublicUrl('pfps/01110.svg').data.publicUrl
    onMounted(async () => {
        if(!user.value) {
            mode.value = 'mode1'
            guestMode.value = true
        } else {
            guestMode.value = false
            const { data: userdata, error } = await supabase.from('USER').select('*').eq('UserEmail', user.value.email)
            if(error) homeError.value = true;
            else {
                username.value = userdata[0].UserName
                id.value = userdata[0].UserID
            }
            if(userdata[0].HasPFP === true) {
                const { error } = await supabase.storage.from('files').exists(`pfps/${userdata[0].UserID}.jpg`)
                if(error) src.value = supabase.storage.from('files').getPublicUrl(`pfps/${userdata[0].UserID}.png`).data.publicUrl
                else src.value = supabase.storage.from('files').getPublicUrl(`pfps/${userdata[0].UserID}.jpg`).data.publicUrl
            }
            try {
                const { data: subdata, error } = await supabase.from('SUBSCRIBE FEED').select("*").eq('SubscriberID', id.value)
                if(error) throw error
                subdata.forEach(async (subbed) => {
                    try {
                        const { data: poddata, error } = await supabase.from('PODCAST').select("*").eq('CreatorID', subbed.CreatorID).order('PodcastID', { ascending: false })
                        if(error) throw error
                        poddata.forEach((pod)=>{foryou.value.push(pod)})
                    } catch(error) { homeError.value = true; console.log(error) }
                })
            } catch(error) { homeError.value = true; console.log(error) }
        }
    })
</script>

<template >
        <div class="bg-neutral-800 h-full overflow-y-auto w-full box-border flex flex-col p-3 gap-3" v-if="homeError === false">
            <div class="w-full flex flex-row h-20 gap-3">
                <img :src="src" alt="PFP" class="rounded-2xl h-20 w-20">
                <div class="w-full flex flex-col h-20 justify-around items-start">
                    <span class="text-4xl m-0 font-bold" v-if="guestMode">GUEST</span>
                    <span class="text-4xl m-0" v-else>{{ username }}</span>
                    <NuxtLink to="/login" class="underline text-lg" v-if="guestMode">Sign in</NuxtLink>
                    <NuxtLink :to="`/profile/${id}`" class="underline text-lg" v-else>View Profile</NuxtLink>
                </div>
            </div>
            <div class="w-full flex flex-row h-10 box-border">
                <button v-if="mode !== 'mode1' && guestMode" class="hover:bg-zinc-700 w-full font-thin rounded-4xl tracking-widest bg-[#37363c] cursor-pointer font-bold" @click="mode = 'mode1'">TUTORIAL</button>
                <div v-else-if="mode === 'mode1' && guestMode" class="w-full font-thin rounded-4xl tracking-widest bg-[#4e4b55] flex justify-center items-center font-bold">TUTORIAL</div>
                <button v-if="mode !== 'mode1' && guestMode === false" class="hover:bg-zinc-700 w-full font-thin rounded-4xl tracking-widest bg-[#37363c] cursor-pointer font-bold" @click="mode = 'mode1'">FOR YOU</button>
                <div v-else-if="mode === 'mode1' && guestMode === false" class="w-full font-thin rounded-4xl tracking-widest bg-[#4e4b55] flex justify-center items-center font-bold">FOR YOU</div>
                <button v-if="mode !== 'mode2'" class="hover:bg-zinc-700 w-full font-thin rounded-4xl tracking-widest bg-[#37363c] cursor-pointer font-bold" @click="mode = 'mode2'">EXPLORE</button>
                <div v-else-if="mode === 'mode2'" class="w-full font-thin rounded-4xl tracking-widest bg-[#4e4b55] flex justify-center items-center font-bold">EXPLORE</div>
            </div>
            <div class="w-full flex flex-col h-content" v-show="mode === 'mode2'">
                <PodcastPlayer v-for="exp in explore" :pid="exp.PodcastID" :key="exp.PodcastID"/>
            </div>
            <div class="w-full flex flex-col h-content" v-show="mode === 'mode1' && guestMode === false">
                <PodcastPlayer v-for="fyp in foryou" :pid="fyp.PodcastID" :key="fyp.PodcastID"/>
            </div>
        </div>
        <div class="bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col justify-center items-center gap-5" v-else>
            <div class="text-3xl text-neutral-500">Sorry... We cannot connect to the network!</div>
            <UIcon name="i-uil-wifi-slash" class="text-neutral-500" size="80"/>
        </div>
</template>

<style>
    body {
        color:white;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
</style>