<script setup>
    const accepting = ref(false)
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const errormsg = ref('')
    const format = ref('')
    const router = useRouter()
    const file = ref()
    const readytoupload = ref(false)
    const uploading = ref(false)
    // const assembly = new AssemblyAI({
    //     apiKey: '91b0ee4da9f34ecf9afb4c05a2f61b7e'
    // })
    const fileCheck = async () => {
        if(user.value) {
            accepting.value = true
            const blob = window.URL || window.webkitURL
            if(!blob) { console.log("FAILED"); return; }
            file.value = document.getElementById('file')
            const fileURL = blob.createObjectURL(file.value.files[0])
            const audio = document.getElementById('audio')
            if(file.value.value.endsWith('.mp3') === true) format.value = 'mp3'
            else if(file.value.value.endsWith('.ogg') === true) format.value = 'ogg'
            else if(file.value.value.endsWith('.wav') === true) format.value = 'wav'
            audio.src = fileURL
            audio.preload = "metadata"
            audio.addEventListener("loadedmetadata", async () => { 
                if(audio.duration < 1800) errormsg.value = "* Audio file must be 30 minutes or more"
                else { readytoupload.value = true; errormsg.value = '' }
                accepting.value = false
            })
        }
    }
    const title = ref('')
    const subtitles = ref('')
    const uploadFile = ref(() => {})
    const checked = ref(false)
    const upload = async () => {
        if(title.value.length === 0) {
            errormsg.value = "* Your upload must have a title"
            return;
        } if(subtitles.value.length === 0 && checked.value === false) {
            errormsg.value = "* Input subtitles for your upload or auto-generate the transcript"
            return;
        } if(!file.value) {
            errormsg.value = "* Your upload needs an audio file"
            return;
        }
        if(readytoupload.value === true) {
            errormsg.value = ''
            uploading.value = true
            try {
            const { data: userdata, error } = await supabase.from('USER').select("UserID").eq('UserEmail', user.value.email)
            if(error) throw error
            try {
                if(checked === true) {
                    //do transcribing code here
                }
                const { data: poddata, error } = await supabase.from('PODCAST').insert({
                    Title: title.value,
                    CreatorID: userdata[0].UserID,
                    Subtitles: subtitles.value
                }).select()
                if(error) throw error
                try {
                    const { error } = await supabase.storage.from('files').upload(`podcasts/${poddata[0].PodcastID}.${format.value}`, file.value.files[0])
                    if(error) throw error
                    router.push(`/podcast/${poddata[0].PodcastID}`)
                } catch(error) { errormsg.value = "* Sorry, we're having trouble uploading your audio"; uploading.value = false; console.log(error) }
            } catch(error) { errormsg.value = "* Sorry, we're having trouble creating your upload"; uploading.value = false; console.log(error) }
        } catch(error) { errormsg.value = "* Sorry, we're having trouble loading your profile"; uploading.value = false; console.log(error) }
        }
    }

    onMounted(() => {
        if(user.value) {
            const fileTag = document.getElementById('file')
            uploadFile.value = () => {
                if(accepting.value === false) fileTag.click()
            }
        }
    })
</script>

<template>
        <div class="bg-neutral-800 min-h-dvh overflow-y-auto w-full box-border flex flex-col p-3 gap-3">
            <h1 class="text-4xl bg-neutral-900 p-5 text-center rounded-xl font-bold">UPLOAD PODCAST</h1>
            <form @submit.prevent="upload()" name="form" id="form" class="w-full flex flex-col gap-2 items-start justify-start">
                <h3 class="m-0 font-bold text-lg">Podcast Title</h3>
                <input type="text" placeholder="Input a captivating title..." v-model="title" class="h-9 bg-[#4e4b55] rounded-3xl p-3 w-full">
                <hr class="w-full pl-0 ml-0 mt-0 mb-3" />
                <h3 class="m-0 font-bold text-lg">Subtitles</h3>
                <div class="flex gap-1 mb-3">
                    <input type="checkbox" name="subtitles" value="autogenerate" class="w-10 cursor-pointer" style="accent-color: #8c52ff;" id="generatesubs" v-model="checked">
                    <label for="subtitles">Auto-generated subtitles</label>
                </div>
                <UTextarea v-if="checked === false" id="subarea" rows=7 autoresizing="false" size="lg" placeholder="Input transcript..." v-model="subtitles" class="h-full bg-[#4e4b55] rounded-3xl w-full box-border overflow-y-auto mb-5" />
                <input type="file" @change="fileCheck" id="file" accept=".wav,.mp3,.ogg" class="hidden">
                <audio id="audio"></audio>
                <div class="text-red-500 error h-10">{{ errormsg }}</div>
                <div class="bg-[#4e4b55] rounded-3xl p-3 w-full box-border h-content flex justify-center items-center text-center font-bold cursor-pointer hover:bg-[#37363c] gap-3" @click="uploadFile">
                    <UIcon name="i-uil-upload" size="21" v-if="accepting === false && readytoupload === false"/> <span v-if="accepting === false && readytoupload === false">UPLOAD AUDIO FILE (.wav, .mp3, .ogg)</span>
                    <UIcon name="i-uil-check" size="21" v-else-if="readytoupload === true"/> 
                    <UIcon name="i-svg-spinners-bars-scale" size="21" v-else/> 
                </div>
                <button type="submit" class="p-3 text-white tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl w-cpntent self-end cursor-pointer h-content">
                    <span class="font-bold flex items-center justify-center text-center text-xl" v-if="uploading === false"><UIcon name="i-uil-plus" size="25"/>UPLOAD</span>
                    <UIcon name="i-svg-spinners-bars-scale" v-else size="25"/>
                </button> 
            </form>
        </div>
</template>

<style>
    body, h3 {
        color:white;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
</style>