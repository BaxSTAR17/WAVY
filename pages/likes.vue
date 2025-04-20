<script setup>
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const likings = ref([])
    const likeError = ref(false)
    if(user.value) {
        try{
            const { data: userdata, error } = await supabase.from('USER').select("UserID").eq("UserEmail", user.value.email)
            if(error) throw error
            try {
                const { data: likedata, error } = await supabase.from('LIKE FEED').select("PodcastID").eq("LikerID", userdata[0].UserID)
                if(error) throw error
                likedata.forEach((liked)=>{likings.value.push(liked)})
            } catch(error) {likeError.value = true; console.log(error)}
        } catch(error) {likeError.value = true; console.log(error)}
    } else { likeError.value = true; }
</script>

<template>
        <div class="bg-neutral-300 dark:bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col p-3 gap-3" v-if="likings.length > 0">
            <h1 class="text-4xl bg-neutral-100 dark:bg-neutral-900 p-5 text-center rounded-xl font-bold tracking-widest">LIKED</h1>
            <div v-if="likeError === true" class="bg-neutral-300 dark:bg-neutral-800 h-full overflow-y-auto w-full box-border flex flex-col justify-center items-center gap-5">
                <div class="text-3xl text-neutral-500">Sorry... We cannot connect to the network!</div>
                <UIcon name="i-uil-wifi-slash" class="text-neutral-500" size="80"/>
            </div>
            <div v-else class="w-full h-content flex flex-col">
                <PodcastPlayer v-for="likee in likings" :pid="likee.PodcastID" />
            </div>
        </div>
        <div class="bg-neutral-300 dark:bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col border-box p-5 items-center justify-center" v-else>
            <div class="text-3xl text-neutral-500">You haven't liked a podcast yet</div>
            <UIcon name="i-uil-annoyed" class="text-neutral-500" size="80"/>
        </div>
</template>

<style>
</style>