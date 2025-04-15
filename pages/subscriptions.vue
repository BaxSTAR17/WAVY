<script setup>
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const subscripts = ref([])
    const subError = ref(false)
    // if(user.value) {
    //     try{
    //         const { data: userdata, error } = await supabase.from('USER').select("UserID").eq("UserEmail", user.value.email)
    //         if(error) throw error
    //         try {
    //             const { data: likedata, error } = await supabase.from('LIKE FEED').select("PodcastID").eq("LikerID", userdata[0].UserID)
    //             if(error) throw error
    //             likedata.forEach((liked)=>{likings.value.push(liked)})
    //         } catch(error) {likeError.value = true; console.log(error)}
    //     } catch(error) {likeError.value = true; console.log(error)}
    // } else { likeError.value = true; }
</script>

<template>
    <main class="h-screen w-screen flex flex-row">
        <LeftSidebar />
        <div class="bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col p-3 gap-3">
            <h1 class="text-4xl bg-neutral-900 p-5 text-center rounded-xl font-bold tracking-widest">YOUR SUBSCRIPTIONS</h1>
            <div v-if="subError === true" class="bg-neutral-800 h-full overflow-y-auto w-full box-border flex flex-col justify-center items-center gap-5">
                <div class="text-3xl text-neutral-500">Sorry... We cannot connect to the network!</div>
                <UIcon name="i-uil-wifi-slash" class="text-neutral-500" size="80"/>
            </div>
            <div v-else class="w-full h-content flex flex-col">
                
            </div>
        </div>
        <RightSidebar />
    </main>
</template>

<style>
</style>