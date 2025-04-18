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
    const subscribings = ref([])
    const src = ref('')
    try {
        const { data, error } = await supabase.from('USER').select("*").eq('UserID', route.params.id)
        if(error) throw error
        profileName.value = data[0].UserName
        online.value = data[0].isOnline
        id.value = data[0].UserID
        listeners.value = data[0].Listeners
        if(data[0].HasPFP === true) {
            const { error } = await supabase.storage.from('files').exists(`pfps/${data[0].UserID}.jpg`)
            if(error) src.value = supabase.storage.from('files').getPublicUrl(`pfps/${data[0].UserID}.png`).data.publicUrl
            else src.value = supabase.storage.from('files').getPublicUrl(`pfps/${data[0].UserID}.jpg`).data.publicUrl
        } else src.value = supabase.storage.from('files').getPublicUrl(`pfps/01110.svg`).data.publicUrl
        if(user.value) {
            try {
                const { data: userdata, error } = await supabase.from('USER').select("UserID").eq('UserEmail', user.value.email)
                if(error) throw error
                if(id.value == userdata[0].UserID) selfProfile.value = true
                else {
                    try {
                        const {data: subbed, error} = await supabase.from('SUBSCRIBE FEED').select("CreatorID").match({
                            CreatorID: id.value,
                            SubscriberID: userdata[0].UserID
                        })
                        if(error) throw error
                        if(subbed.length > 0) subscribed.value = true
                    } catch(error) {noUser.value = true; console.log(error)}
                    subscribe.value = async () => {
                        if(subscribed.value === true) {
                            try {
                                const { data: subdata, error } = await supabase.from('SUBSCRIBE FEED').insert({
                                    CreatorID: id.value,
                                    SubscriberID: userdata[0].UserID
                                }).select()
                                if(error) throw error
                                subscribings.value.push(subdata)
                                try {
                                    const { data: subscriberdata, error } = await supabase.from('USER').update({
                                        Listeners: listeners.value+1
                                    }).eq("UserID", id.value).select()
                                    if(error) throw error
                                    listeners.value = subscriberdata[0].Listeners
                                } catch(error) { noUser.value = true; console.log(error)}
                            } catch(error) { noUser.value = true; console.log(error) }
                        } else {
                            if(subscribings.value.length > 0) {
                                try {
                                    const { error } = await supabase.from('SUBSCRIBE FEED').delete().eq("SubID", subscribings.value[0].SubID)
                                    if(error) throw error
                                    subscribings.value.pop()
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

    onMounted(async () => {
    
    })
</script>

<template>
        <div class="bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col border-box p-5" v-if="noUser === false">
            <div class="w-full flex flex-row h-50 gap-3">
                <img :src="src" alt="PFP" class="rounded-4xl h-40 w-40">
                <div class="w-full flex flex-col h-40 justify-evenly items-start">
                    <span class="text-4xl m-0 font-bold flex items-center gap-2">{{profileName}} <div v-if="online" class="w-5 h-5 rounded-full bg-green-600"></div></span>
                    <span class="text-xl m-0">{{ listeners }} {{ listeners === 1 ? 'subscriber' : 'subscribers' }}</span>
                    <div class="flex flex-row gap-3">
                        <span class="pr-3 pl-3 text-white w-content tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl">
                            <NuxtLink v-if="selfProfile" to="/upload" class="flex items-center gap-2 pt-3 pb-3"><UIcon name="i-uil-plus" size="25"/> UPLOAD PODCAST</NuxtLink>
                            <NuxtLink v-else-if="!user" to="/login" class="flex items-center gap-2">SIGN IN TO SUBSCRIBE</NuxtLink>
                            <button class="w-content pt-3 pb-3 cursor-pointer" v-else-if="subscribed === false" @click="subscribed = true; subscribe()">SUBSCRIBE</button>
                            <button class="w-content pt-3 pb-3 cursor-pointer" v-else-if="subscribed === true" @click="subscribed = false; subscribe()"> X UNSUBSCRIBE</button>
                        </span>
                    </div>
                </div>
            </div>
            <hr class="w-full pl-0 ml-0 mt-0 mb-3" />
            <span class="text-4xl m-0 font-bold" v-if="selfProfile === false">RECENT UPLOADS</span>
            <span class="text-4xl m-0 font-bold" v-else>YOUR UPLOADS</span>
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
        <div class="bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col border-box p-5 items-center justify-center" v-else>
            <div class="text-3xl text-neutral-500">Sorry, The profile page requested does not exist</div>
            <UIcon name="i-uil-user-times" class="text-neutral-500" size="80"/>
        </div>
</template>

<style>
</style>