<script setup>
    const noPodcast = ref(false)
    try {
        const { data, error } = await supabase.from('PODCAST').select("*").eq('PodcastID', route.params.id)
        if(error) throw error
    } catch(error) { noPodcast.value = true; console.log(error) }
</script>

<template>
    <main class="h-screen w-screen flex flex-row">
        <LeftSidebar />
        <div class="bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col border-box p-5 gap-2" v-if="noPodcast === false">
            <PodcastPlayer src="https://krkvsaegpxmilldbextp.supabase.co/storage/v1/object/public/files/podcasts/Mind%20the%20Beat%20Podcast%20-%20Coffin%20Dance%20Makes%20Me%20Feel%20Alive.mp3"/>
            <div class="p-3 text-white tracking-widest bg-purple-800 rounded-2xl w-40 text-center">
                <!-- <span>UPLOAD PODCAST</span> -->
                <span>TRANSCRIPT</span>
            </div>
            <div class="w-full h-content rounded-lg overflow-y-auto bg-neutral-600 border-box p-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique veniam dignissimos reprehenderit aut optio praesentium illo, ipsa maiores quod laborum perferendis deleniti, nisi nam! Consequatur in odit modi culpa maxime.
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