<script setup>
    const noPodcast = ref(false)
    const supabase = useSupabaseClient()
    const route = useRoute()
    const pid = ref(0)
    const subtitles = ref('')
    try {
        const { data, error } = await supabase.from('PODCAST').select("*").eq('PodcastID', route.params.id)
        if(error) throw error
        pid.value = data[0].PodcastID
        subtitles.value = data[0].Subtitles
        useHead({title: `${data[0].Title} | WAVY`})
    } catch(error) { noPodcast.value = true; console.log(error) }
    const formatText = (text) => {
        const forPeriods = text.replaceAll(/\. /g, ".\n\n")
        return forPeriods.replaceAll(/\? /g, "?\n\n")
    }
    if(noPodcast.value === true) useHead({title: 'Podcast Not Found | WAVY'})
</script>

<template>
        <div class="bg-neutral-200 dark:bg-neutral-800 min-h-dvh overflow-y-auto w-full box-border flex flex-col border-box p-5 gap-2" v-if="noPodcast === false">
            <PodcastPlayer :pid="pid" pod/>
            <UTooltip :content="{align:'start'}" text="Transcript of the Podcast">
            <div class="p-3 text-white tracking-widest bg-purple-800 rounded-2xl w-40 text-center">
                <!-- <span>UPLOAD PODCAST</span> -->
                <span>TRANSCRIPT</span>
            </div>
            </UTooltip>
            <div class="w-full text-lg text-wrap h-content rounded-lg overflow-y-auto bg-neutral-100 dark:bg-neutral-600 text-neutral-900 dark:text-neutral-100 text-justify border-box p-3" style="white-space: pre-wrap; line-height: 20px">
                {{ formatText(subtitles) }}
            </div>
        </div>
        <div class="bg-neutral-200 dark:bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col border-box p-5 items-center justify-center" v-else>
            <div class="text-3xl text-neutral-500">Sorry, The podcast requested does not exist</div>
            <UIcon name="i-uil-headphone-slash" class="text-neutral-500" size="80"/>
        </div>
</template>

<style></style>