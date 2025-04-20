<script setup>
import { data } from 'autoprefixer'

    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const subscripts = ref([])
    const uploads = ref([])
    const subError = ref(false)
    const src = ref('')
    if(user.value) {
        try{
            const { data: userdata, error } = await supabase.from('USER').select("UserID").eq("UserEmail", user.value.email)
            if(error) throw error
            try {
                const { data: subdata, error } = await supabase.from('SUBSCRIBE FEED').select("CreatorID").eq("SubscriberID", userdata[0].UserID)
                if(error) throw error
                subdata.forEach(async (sub)=>{
                    try {
                        const { data: subbed, error } = await supabase.from('USER').select("*").eq("UserID", sub.CreatorID)
                        if(error) throw error
                        if(subbed.HasPFP === true) {
                            const { error } = await supabase.storage.from('files').exists(`pfps/${subbed.UserID}.jpg`)
                            if(error) src.value = supabase.storage.from('files').getPublicUrl(`pfps/${subbed.UserID}.png`).data.publicUrl
                            else src.value = supabase.storage.from('files').getPublicUrl(`pfps/${subbed.UserID}.jpg`).data.publicUrl
                        } else src.value = supabase.storage.from('files').getPublicUrl(`pfps/01110.svg`).data.publicUrl
                        subscripts.value.push(subbed)
                        try {
                            const { data, error } = await supabase.from('PODCAST').select("CreatorID").eq("CreatorID", sub.CreatorID)
                            if(error) throw error
                            uploads.value.push(data.length)
                        } catch(error) { subError.value = true; console.log(error)}
                    } catch(error) { subError.value = true; console.log(error)}
                })
            } catch(error) {subError.value = true; console.log(error)}
        } catch(error) {subError.value = true; console.log(error)}
    } else { subError.value = true; }
</script>

<template>
        <div class="bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col p-3 gap-3" v-if="subscripts.length > 0">
            <h1 class="text-4xl bg-neutral-900 p-5 text-center rounded-xl font-bold tracking-widest">YOUR SUBSCRIPTIONS</h1>
            <div v-if="subError === true" class="bg-neutral-800 h-full overflow-y-auto w-full box-border flex flex-col justify-center items-center gap-5">
                <div class="text-3xl text-neutral-500">Sorry... We cannot connect to the network!</div>
                <UIcon name="i-uil-wifi-slash" class="text-neutral-500" size="80"/>
            </div>
            <div v-else class="w-full h-content flex flex-col">
                <NuxtLink v-for="(sub, index) in subscripts" :to="`/profile/${sub[0].UserID}`" class="rounded-xl bg-neutral-700 h-content border-box p-3 w-full flex justify-start items-center gap-2">
                    <img :src="src" alt="pfp" class="w-25 h-25 rounded-xl">
                    <div class="flex flex-col gap-1">
                        <span class="text-white text-lg font-bold">{{sub[0].UserName}}</span>
                        <span class="text-white text-sm">{{''+sub[0].Listeners+' '+(sub[0].Listeners == 1 ? 'subscriber' : 'subscribers')+' | '+uploads[index]+' '+(uploads[index] == 1 ? 'upload' : 'uploads')}}</span>
                        <NuxtLink :to="`/profile/${sub[0].UserID}`" class="rounded-xl bg-purple-800 hover:bg-purple-900 text-center w-content border-box p-2 h-content">X UNSUBSCRIBE</NuxtLink>
                    </div>
                </NuxtLink>
            </div>
        </div>
        <div class="bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col border-box p-5 items-center justify-center" v-else>
            <div class="text-3xl text-neutral-500">You're not subscribed to anyone yet</div>
            <UIcon name="i-uil-annoyed" class="text-neutral-500" size="80"/>
        </div>
</template>

<style>
</style>