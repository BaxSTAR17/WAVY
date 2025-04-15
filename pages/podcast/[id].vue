<script setup>
    const noPodcast = ref(false)
    const supabase = useSupabaseClient()
    const route = useRoute()
    const pid = ref(0)
    const subtitles = ref('')
    try {
        const { data, error } = await supabase.from('PODCAST').select("*").eq('PodcastID', route.params.id)
        pid.value = data[0].PodcastID
        subtitles.value = data[0].Subtitles
        if(error) throw error
    } catch(error) { noPodcast.value = true; console.log(error) }
</script>

<template>
    <main class="h-screen w-screen flex flex-row">
        <LeftSidebar />
        <div class="bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col border-box p-5 gap-2" v-if="noPodcast === false">
            <PodcastPlayer :pid="pid" pod/>
            <div class="p-3 text-white tracking-widest bg-purple-800 rounded-2xl w-40 text-center">
                <!-- <span>UPLOAD PODCAST</span> -->
                <span>TRANSCRIPT</span>
            </div>
            <div class="w-full h-content rounded-lg overflow-y-auto bg-neutral-600 border-box p-3">
                {{ subtitles }}
            </div>
        </div>
        <div class="bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col border-box p-5 items-center justify-center" v-else>
            <div class="text-3xl text-neutral-500">Sorry, The podcast requested does not exist</div>
            <UIcon name="i-uil-headphone-slash" class="text-neutral-500" size="80"/>
        </div>
        <RightSidebar />
    </main>
</template>

<style></style>