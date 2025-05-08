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
    const hasFYP = ref(false)
    const payload = ref(20)
    const fypload = ref(3)
    const infiniteLoad = () => {
        const mainpage = document.getElementById('homepage')
        if(mode.value === 'mode1' && (mainpage.scrollHeight - mainpage.scrollTop - mainpage.clientHeight) === 0 && payload.value < explore.value.length) payload.value += 1
        else if(mode.value === 'mode1' && user.value && (mainpage.scrollHeight - mainpage.scrollTop - mainpage.clientHeight) === 0 && fypload.value < foryou.value.length) fypload.value += 1
    }
    const shuffle = (array) => {
        let length = array.length
        let rand = 0
        while(length > 0) {
            rand = Math.floor(Math.random() * length)
            length--;
            [array[length], array[rand]] = [array[rand], array[length]]
        }
        hasFYP.value = true
    }
    try {
        const { data, error } = await supabase.from('PODCAST').select('*').order('Likes', { ascending: false })
        if(error) throw error
        data.forEach((explores) => { explore.value.push(explores)})
    } catch(error) { homeError.value = true; console.log(error) }
    src.value = supabase.storage.from('files').getPublicUrl('pfps/01110.svg').data.publicUrl
    if(user.value) {
        guestMode.value = false
        const { data: userdata, error } = await supabase.from('USER').select('*').eq('UserEmail', user.value.email)
        if(error) homeError.value = true;
        else {
            username.value = userdata[0].UserName
            id.value = userdata[0].UserID
        }
        if(userdata[0].HasPFP === true) src.value = supabase.storage.from('files').getPublicUrl(`pfps/${userdata[0].UserID}.${userdata[0].PFPExtension}`).data.publicUrl
        try {
            const { data: subdata, error } = await supabase.from('SUBSCRIBE FEED').select("*").eq('SubscriberID', id.value)
            if(error) throw error
            subdata.forEach(async (subbed) => {
                try {
                    const { data: poddata, error } = await supabase.from('PODCAST').select("*").eq('CreatorID', subbed.CreatorID).order('PodcastID', { ascending: false })
                    if(error) throw error
                    poddata.forEach((pod)=>{foryou.value.push(pod)})
                    shuffle(foryou.value)
                } catch(error) { homeError.value = true; console.log(error) }
            })
        } catch(error) { homeError.value = true; console.log(error) }
    } else {
        mode.value = 'mode1'
        guestMode.value = true
    }
    onMounted(async () => {
        const setSpeed = () => {document.documentElement.id = "30:30"}
        callOnce(setSpeed)
    })
    useHead({title:'Home | WAVY'})
</script>

<template>
        <div id="homepage" class="bg-neutral-200 dark:bg-neutral-800 overflow-y-auto w-screen box-border flex flex-col p-3 gap-3" v-if="homeError === false" @scroll="infinteLoad">
            <div class="w-full flex flex-row h-20 gap-3">
                <img :src="src" alt="PFP" class="rounded-2xl h-20 w-20">
                <div class="w-full flex flex-col h-20 justify-around items-start">
                    <UTooltip :content="{align:'start'}" text="Guest Profile">
                    <span class="text-4xl m-0 font-bold text-neutral-900 dark:text-neutral-100" v-if="guestMode">GUEST</span>
                    </UTooltip>
                    <UTooltip :content="{align:'start'}" :text="`${username}`" v-show="username !== ''">
                    <span class="text-4xl m-0 font-bold text-neutral-900 dark:text-neutral-100" v-if="guestMode === false">{{ username }}</span>
                    </UTooltip>
                    <UTooltip :content="{align:'start'}" text="Log In">
                    <NuxtLink to="/login" class="underline text-lg text-neutral-900 dark:text-neutral-100" v-if="guestMode">Log in</NuxtLink>
                    </UTooltip>
                    <UTooltip :content="{align:'start'}" text="View Profile Page">
                    <NuxtLink :to="`/profile/${id}`" class="underline text-lg text-neutral-900 dark:text-neutral-100" v-if="guestMode === false">View Profile</NuxtLink>
                    </UTooltip>
                </div>
            </div>
            <div class="w-full flex flex-row h-10 box-border">
                <button v-if="mode !== 'mode1' && guestMode" class="hover:bg-zinc-500 dark:hover:bg-neutral-500 w-full font-thin rounded-4xl tracking-widest text-neutral-900 dark:text-neutral-100 bg-neutral-300 dark:bg-[#37363c] cursor-pointer font-bold h-content" @click="mode = 'mode1'"><UTooltip :content="{align:'start'}" text="Tutorial"><span class="w-full">TUTORIAL</span></UTooltip></button>
                <div v-if="mode === 'mode1' && guestMode" class="font-bold w-full font-thin rounded-4xl tracking-widest text-neutral-100 bg-purple-800 dark:bg-[#4e4b55] flex justify-center items-center font-bold h-content">TUTORIAL</div>
                <button v-if="mode !== 'mode1' && guestMode === false" class="hover:bg-zinc-500 dark:hover:bg-neutral-500 w-full font-thin rounded-4xl tracking-widest text-neutral-900 dark:text-neutral-100 bg-neutral-300 dark:bg-[#37363c] cursor-pointer font-bold h-content" @click="mode = 'mode1'"><UTooltip :content="{align:'start'}" text="For You Page"><span class="w-full">FOR YOU</span></UTooltip></button>
                <div v-if="mode === 'mode1' && guestMode === false" class="font-bold w-full font-thin rounded-4xl tracking-widest text-neutral-100 bg-purple-800 dark:bg-[#4e4b55] flex justify-center items-center font-bold h-content">FOR YOU</div>
                <button v-if="mode !== 'mode2'" class="hover:bg-zinc-500 dark:hover:bg-neutral-500 w-full font-thin rounded-4xl tracking-widest text-neutral-900 dark:text-neutral-100 bg-neutral-300 dark:bg-[#37363c] cursor-pointer font-bold h-content" @click="mode = 'mode2'"><UTooltip :content="{align:'start'}" text="Explore Page"><span class="w-full">EXPLORE</span></UTooltip></button>
                <div v-if="mode === 'mode2'" class="font-bold w-full font-thin rounded-4xl tracking-widest text-neutral-100 bg-purple-800 dark:bg-[#4e4b55] flex justify-center items-center font-bold h-content">EXPLORE</div>
            </div>
            <div class="w-full flex flex-col h-content" v-show="mode === 'mode2'">
                <PodcastPlayer v-for="(exp, index) in explore" :pid="exp.PodcastID" :key="exp.PodcastID" v-if="index <= payload"/>
            </div>
            <div class="w-full flex flex-col h-content" v-show="mode === 'mode1' && guestMode === true">
                <UTooltip :content="{align:'start'}" text="Tutorial Video">
                <video src="../public/audio/WAVY Tutorial with Subs.mp4" controls class="w-full h-130"></video>
                </UTooltip>
                <p class="w-full h-content bg-neutral-100 dark:bg-[#4e4b55] text-neutral-900 dark:text-neutral-100 box-border p-3 text-justify rounded-lg text-lg">
                    Welcome to WAVY! Your number one podcast-hosting platform. Using WAVY, you can get access and create your favorite podcasts efficiently with our UI.
                    <br/><br/>
                    To get started, Log in to your WAVY account or register using a valid email if you do not have an account. Once signed in, you will be redirected to the home page.
                    <br/><br/>
                    The Home Page includes podcasts recommended to you via the 'For You' section and popular podcasts from unrelated channels on the 'Explore' section.
                    <br/><br/>
                    The Profile page includes your subscriber count as well as all the podcast episodes uploaded under your channel name.
                    <br/><br/>
                    The Subscriptions page shows a list of all the channels you are subscribed to, to make it easier to keep track of your favorite content.
                    <br/><br/>
                    The Liked page shows a list of all the individual podcasts that you have liked via the heart button at the right of the podcast player.
                    <br/><br/>
                    To upload your own podcast, click on the upload button at the left-hand side bar. Fill in the necessary information, such as the episode title, the subtitles if applicable, and of course, the audio file for the episode itself. Once confirmed, you have successfully uploaded your own podcast episode for the world to see.
                    <br/><br/>
                    There are more features that WAVY provides to ease your podcast-listening experience. Don't be afraid to explore our website and enjoy browsing through WAVY and let your voice be heard.
                </p>
            </div>
            <div class="w-full flex flex-col h-content" v-show="mode === 'mode1' && guestMode === false">
                <PodcastPlayer v-for="(fyp, index) in foryou" :pid="fyp.PodcastID" :key="fyp.PodcastID" v-if="hasFYP === true && index <= fypload"/>
                <div class="w-full min-h-dvh box-border flex flex-col p-5 items-center justify-center" v-if="foryou.length == 0">
                    <div class="text-3xl text-neutral-500">You're not subscribed to anyone yet</div>
                    <UIcon name="i-uil-annoyed" class="text-neutral-500" size="80"/>
                </div>
            </div>
        </div>
        <div class="bg-neutral-200 dark:bg-neutral-800 min-h-dvh overflow-y-auto w-full box-border flex flex-col justify-center items-center gap-5" v-else>
            <div class="text-3xl text-center text-neutral-400 dark:text-neutral-500">Sorry... We cannot connect to the network!</div>
            <UIcon name="i-uil-wifi-slash" class="text-neutral-400 dark:text-neutral-400" size="80"/>
        </div>
</template>

<style>
    body {
        color:white;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
</style>