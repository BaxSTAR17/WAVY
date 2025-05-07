<script setup>
import Subscriptions from '../subscriptions.vue'

    const noUser = ref(false)
    const profileName = ref("PROFILE NAME")
    const listeners = ref(0)
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const route = useRoute()
    const online = ref(false)
    const selfProfile = ref(false)
    const id = ref(0)
    const podcasts = ref([])
    const hasUploaded = ref(false)
    const subscribed = ref(false)
    const subscribe = ref(async () => {})
    const subscribings = ref(-1)
    const src = ref('')
    try {
        const { data, error } = await supabase.from('USER').select("*").eq('UserID', route.params.id)
        if(error) throw error
        profileName.value = data[0].UserName
        online.value = data[0].isOnline
        id.value = data[0].UserID
        listeners.value = data[0].Listeners
        useHead({title:`${data[0].UserName} | WAVY`})
        if(data[0].HasPFP === true) src.value = supabase.storage.from('files').getPublicUrl(`pfps/${data[0].UserID}.${data[0].PFPExtension}`).data.publicUrl
        else src.value = supabase.storage.from('files').getPublicUrl(`pfps/01110.svg`).data.publicUrl
        if(user.value) {
            try {
                const { data: userdata, error } = await supabase.from('USER').select("UserID").eq('UserEmail', user.value.email)
                if(error) throw error
                if(id.value == userdata[0].UserID) selfProfile.value = true
                else {
                    try {
                        const {data: subbed, error} = await supabase.from('SUBSCRIBE FEED').select("SubID").match({
                            CreatorID: id.value,
                            SubscriberID: userdata[0].UserID
                        })
                        if(error) throw error
                        if(subbed.length > 0) { subscribings.value = subbed[0].SubID; subscribed.value = true }
                    } catch(error) {noUser.value = true; console.log(error)}
                    subscribe.value = async () => {
                        if(subscribed.value === true) {
                            try {
                                const { data: subdata, error } = await supabase.from('SUBSCRIBE FEED').insert({
                                    CreatorID: id.value,
                                    SubscriberID: userdata[0].UserID
                                }).select()
                                if(error) throw error
                                try {
                                    const { data: subscriberdata, error } = await supabase.from('USER').update({
                                        Listeners: listeners.value+1
                                    }).eq("UserID", id.value).select()
                                    if(error) throw error
                                    listeners.value = subscriberdata[0].Listeners
                                } catch(error) { noUser.value = true; console.log(error)}
                            } catch(error) { noUser.value = true; console.log(error) }
                        } else {
                            if(subscribings.value !== -1) {
                                try {
                                    const { error } = await supabase.from('SUBSCRIBE FEED').delete().eq("SubID", subscribings.value)
                                    if(error) throw error
                                    try {
                                        const { data, error } = await supabase.from('USER').update({
                                            Listeners: listeners.value > 0 ? listeners.value - 1 : 0
                                        }).eq("UserID", id.value).select()
                                        if(error) throw error
                                        listeners.value = data[0].Listeners
                                    } catch(error) { noUser.value = true; console.log(error)}
                                } catch(error) { noUser.value = true; console.log(error) }
                            }
                        }
                    }
                }
            } catch(error) { noUser.value = true; console.log(error)}
        }
        try {
            const { data, error } = await supabase.from('PODCAST').select("*").eq('CreatorID', id.value).order('PodcastID', { ascending: false })
            if(error) throw error
            data.forEach((podcast) => {podcasts.value.push(podcast)})
            if(podcasts.value.length > 0) hasUploaded.value = true
        } catch(error) { console.log(error) }
    } catch(error) { noUser.value = true; console.log(error) }
    if(noUser.value === true) useHead({title: 'User Not Found | WAVY'})

    onMounted(async () => {
    
    })
</script>

<template>
        <div class="bg-neutral-200 dark:bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col border-box p-5" v-if="noUser === false">
            <div class="w-full flex flex-row h-50 gap-3">
                <UTooltip :content="{align:'start'}" :text="`${profileName}'s Profile Picture'`">
                <img :src="src" alt="PFP" class="rounded-4xl h-40 w-40">
                </UTooltip>
                <div class="w-full flex flex-col h-40 justify-evenly items-start">
                    <UTooltip :content="{align:'start'}" :text="`${profileName}`">
                    <span class="text-neutral-900 dark:text-neutral-100 text-4xl m-0 font-bold flex items-center gap-2">{{profileName}} <div v-if="online" class="w-5 h-5 rounded-full bg-green-600"></div></span>
                    </UTooltip>
                    <UTooltip :content="{align:'start'}" :text="`${listeners} ${listeners === 1 ? 'subscriber' : 'subscribers'}`">
                    <span class="text-neutral-900 dark:text-neutral-100 text-xl m-0">{{ listeners }} {{ listeners === 1 ? 'subscriber' : 'subscribers' }}</span>
                    </UTooltip>
                    <div class="flex flex-row gap-3">
                        <span class="pr-3 pl-3 text-white w-content tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl">
                            <UTooltip :content="{align:'start'}" text="Upload a Podcast">
                            <NuxtLink v-if="selfProfile && user" to="/upload" class="flex items-center gap-2 pt-3 pb-3"><UIcon name="i-uil-plus" size="25"/> UPLOAD</NuxtLink>
                            </UTooltip>
                            <UTooltip :content="{align:'start'}" text="Log In to an account">
                            <NuxtLink v-if="!user" to="/login" class="flex items-center gap-2">LOG IN TO SUBSCRIBE</NuxtLink>
                            </UTooltip>
                            <UTooltip :content="{align:'start'}" text="Subscribe">
                            <button class="w-content pt-3 pb-3 cursor-pointer" v-if="subscribed === false && user && selfProfile === false" @click="subscribed = true; subscribe()">SUBSCRIBE</button>
                            </UTooltip>
                            <UTooltip :content="{align:'start'}" text="Unsubscribe">
                            <button class="w-content pt-3 pb-3 cursor-pointer flex items-center gap-2" v-if="subscribed === true && user && selfProfile === false" @click="subscribed = false; subscribe()"><UIcon name="i-uil-user-minus" size="25"/>UNSUBSCRIBE</button>
                            </UTooltip>
                        </span>
                    </div>
                </div>
            </div>
            <hr class="w-full pl-0 ml-0 mt-0 mb-3 text-neutral-900 dark:text-neutral-100" />
            <UTooltip :content="{align:'start'}" text="Recent Podcast Uploads">
            <span class="text-neutral-900 dark:text-neutral-100 text-4xl m-0 font-bold" v-if="selfProfile === false">RECENT UPLOADS</span>
            </UTooltip>
            <UTooltip :content="{align:'start'}" text="Your Podcast Uploads">
            <span class="text-neutral-900 dark:text-neutral-100 text-4xl m-0 font-bold" v-if="selfProfile === true">YOUR UPLOADS</span>
            </UTooltip>
            <div v-if="hasUploaded">
                <div class="w-full flex flex-col h-content" v-for="pod in podcasts">
                    <PodcastPlayer :pid="pod.PodcastID"/>
                </div>
            </div>
            <div class="w-full h-100 flex flex-col justify-center items-center" v-else>
                <span v-if="selfProfile === false" class="text-neutral-500 text-4xl">The user has not yet uploaded</span>
                <span v-else class="text-neutral-500 text-4xl">You haven't uploaded anything yet</span>
                <UIcon name="i-uil-annoyed" class="text-neutral-500" size="70"/>
            </div>
        </div>
        <div class="bg-neutral-200 dark:bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col border-box p-5 items-center justify-center" v-else>
            <div class="text-3xl text-neutral-500">Sorry, The profile page requested does not exist</div>
            <UIcon name="i-uil-user-times" class="text-neutral-500" size="80"/>
        </div>
</template>

<style>
</style>