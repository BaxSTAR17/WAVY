<script setup>
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()
    const username = ref('')
    const guestMode = ref(true)
    const mode = ref('mode1')
    onMounted(async () => {
        if(!user.value) {
            mode.value = 'mode1'
            guestMode.value = true
        } else {
            guestMode.value = false
            const { data, error } = await supabase.from('USER').select('UserName').eq('UserEmail', user.value.email)
            if(error) console.log(error)
            else {
                username.value = data[0].UserName
            }
        }
    })
</script>

<template >
    <main class="h-screen w-screen flex flex-row">
        <LeftSidebar />
        <div class="bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col p-3">
            <div class="w-full flex flex-row h-20">
                <UIcon name="i-uil-user" size="80" />
                <div class="w-full flex flex-col h-20 justify-around items-start">
                    <span class="text-4xl m-0" v-if="guestMode">GUEST</span>
                    <span class="text-4xl m-0" v-else>{{ username }}</span>
                    <NuxtLink to="/login" class="underline text-lg" v-if="guestMode">Sign in</NuxtLink>
                    <NuxtLink to="/" class="underline text-lg" v-else>View Channel</NuxtLink>
                </div>
            </div>
            <div class="w-full flex flex-row h-10 box-border">
                <button v-if="mode !== 'mode1' && guestMode" class="hover:bg-zinc-700 w-full font-thin rounded-4xl tracking-widest bg-[#37363c] cursor-pointer" @click="mode = 'mode1'">TUTORIAL</button>
                <div v-else-if="mode === 'mode1' && guestMode" class="w-full font-thin rounded-4xl tracking-widest bg-[#4e4b55] flex justify-center items-center">TUTORIAL</div>
                <button v-if="mode !== 'mode1' && guestMode === false" class="hover:bg-zinc-700 w-full font-thin rounded-4xl tracking-widest bg-[#37363c] cursor-pointer" @click="mode = 'mode1'">FOR YOU</button>
                <div v-else-if="mode === 'mode1' && guestMode === false" class="w-full font-thin rounded-4xl tracking-widest bg-[#4e4b55] flex justify-center items-center">FOR YOU</div>
                <button v-if="mode !== 'mode2'" class="hover:bg-zinc-700 w-full font-thin rounded-4xl tracking-widest bg-[#37363c] cursor-pointer" @click="mode = 'mode2'">EXPLORE</button>
                <div v-else-if="mode === 'mode2'" class="w-full font-thin rounded-4xl tracking-widest bg-[#4e4b55] flex justify-center items-center">EXPLORE</div>
            </div>
            <div class="w-full flex flex-col h-content" v-if="mode === 'mode2'">
                <PodcastPlayer />
            </div>
        </div>
        <RightSidebar />
    </main>
</template>

<style>
    body {
        color:white;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
</style>