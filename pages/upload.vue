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
    const autosubtitles = ref('')
    const progress = ref(0)
    // const assembly = new AssemblyAI({
    //     apiKey: '91b0ee4da9f34ecf9afb4c05a2f61b7e'
    // })
    const fileCheck = async () => {
        if(user.value && uploading.value === false) {
            accepting.value = true
            const blob = window.URL || window.webkitURL
            if(!blob) { console.log("FAILED"); return; }
            file.value = document.getElementById('file')
            const fileURL = blob.createObjectURL(file.value.files[0])
            const audio = document.getElementById('audio')
            if(file.value.value.endsWith('.mp3') === true) format.value = 'mp3'
            else if(file.value.value.endsWith('.ogg') === true) format.value = 'ogg'
            else if(file.value.value.endsWith('.wav') === true) format.value = 'wav'
            const transcript = await useFetch('/api/transcribe', {
                method: 'post',
                body: { url: "https://krkvsaegpxmilldbextp.supabase.co/storage/v1/object/public/files/podcasts/You%20Know%20Ball%20-%202019%20Kawhi.mp3" }
            })
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
        if(uploading.value === true) return;
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
        progress.value = 25
        document.getElementById('title').disabled = true
        document.getElementById('generatesubs').disabled = true
        if(readytoupload.value === true) {
            errormsg.value = ''
            uploading.value = true
            useHead({title:'Uploading... 25%'})
            try {
            const { data: userdata, error } = await supabase.from('USER').select("UserID").eq('UserEmail', user.value.email)
            if(error) throw error
            progress.value = 50
            useHead({title:'Uploading... 50%'})
            try {
                const { data: poddata, error } = await supabase.from('PODCAST').insert({
                    Title: title.value,
                    CreatorID: userdata[0].UserID,
                    Subtitles: subtitles.value
                }).select()
                if(error) throw error
                progress.value = 75
                useHead({title:'Uploading... 75%'})
                try {
                    const { error } = await supabase.storage.from('files').upload(`podcasts/${poddata[0].PodcastID}.${format.value}`, file.value.files[0])
                    if(error) throw error
                    progress.value = 90
                    useHead({title:'Uploading... 90%'})
                    if(checked.value === true) {
                        const link = supabase.storage.from('files').getPublicUrl(`podcasts/${poddata[0].PodcastID}.${format.value}`).data.publicUrl
                        const transcript = await useFetch('/api/transcribe', {
                            method: 'post',
                            body: { url: link }
                        })
                        progress.value = 95
                        useHead({title:'Uploading... 95%'})
		                console.log(transcript)
                        try {
                            const { error } = await supabase.from('PODCAST').update({ Subtitles: transcript.data.value.text }).eq("PodcastID", poddata[0].PodcastID)
                            if(error) throw error
                        } catch(error) { errormsg.value = "* Sorry, we're having trouble making subtitles for your upload"; uploading.value = false; console.log(error)}
                    }
                    router.push(`/podcast/${poddata[0].PodcastID}`)
                } catch(error) { errormsg.value = "* Sorry, we're having trouble uploading your audio"; uploading.value = false; console.log(error); document.getElementById('title').disabled = false;
        document.getElementById('generatesubs').disabled = false; useHead({title:'Upload a Podcast | WAVY'}); }
            } catch(error) { errormsg.value = "* Sorry, we're having trouble creating your upload"; uploading.value = false; console.log(error); document.getElementById('title').disabled = false;
        document.getElementById('generatesubs').disabled = false; useHead({title:'Uploading a Podcast | WAVY'}); }
        } catch(error) { errormsg.value = "* Sorry, we're having trouble loading your profile"; uploading.value = false; console.log(error); document.getElementById('title').disabled = false;
        document.getElementById('generatesubs').disabled = false; useHead({title:'Upload a Podcast | WAVY'}); }
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
    useHead({title:'Upload a Podcast | WAVY'})
</script>

<template>
        <div class="bg-neutral-300 dark:bg-neutral-800 min-h-dvh overflow-y-auto w-full box-border flex flex-col p-3 gap-3">
            <UTooltip :content="{align:'start'}" text="Upload a Podcast">
            <h1 class="text-4xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-5 text-center rounded-xl font-bold">UPLOAD PODCAST</h1>
            </UTooltip>
            <form @submit.prevent="upload()" name="form" id="form" class="w-full flex flex-col gap-2 items-start justify-start">
                <h3 class="m-0 font-bold text-lg text-neutral-900 dark:text-neutral-100">Podcast Title</h3>
                <UTooltip :content="{align:'start'}" text="Input your podcast title">
                <input id="title" type="text" placeholder="Input a captivating title..." v-model="title" class="h-9 bg-neutral-400 dark:bg-[#4e4b55] text-neutral-900 dark:text-neutral-100 rounded-3xl p-3 w-full disabled:opacity-40">
                </UTooltip>
                <hr class="w-full pl-0 ml-0 mt-0 mb-3 text-neutral-900 dark:text-neutral-100" />
                <h3 class="m-0 font-bold text-lg text-neutral-900 dark:text-neutral-100">Transcript</h3>
                <UTooltip :content="{align:'start'}" text="Auto-generate the Podcast's Transcript">
                <div class="flex gap-1 mb-3">
                    <input type="checkbox" name="subtitles" value="autogenerate" class="w-10 cursor-pointer disabled:opacity-40" style="accent-color: #8c52ff;" id="generatesubs" v-model="checked">
                    <label for="subtitles" class="text-neutral-900 dark:text-neutral-100">Auto-generate</label>
                </div>
                </UTooltip>
                <UTooltip :content="{align:'start'}" text="Input transcript manually">
                <UTextarea v-if="checked === false" id="subarea" rows=7 autoresizing="false" size="lg" placeholder="Input transcript..." v-model="subtitles" class="h-full bg-neutral-400 dark:bg-[#4e4b55] text-neutral-900 dark:text-neutral-100 rounded-3xl w-full box-border overflow-y-auto mb-5 disabled:opacity-40" />
                </UTooltip>
                <input type="file" @change="fileCheck" id="file" accept=".wav,.mp3,.ogg" class="hidden">
                <audio id="audio"></audio>
                <div class="text-red-500 error h-10">{{ errormsg }}</div>
                <UTooltip :content="{align:'start'}" :text="`${accepting ? 'Uploading...' : 'Upload your podcast file'}`">
                <div class="bg-neutral-400 dark:bg-[#4e4b55] rounded-3xl text-neutral-900 dark:text-neutral-100 p-3 w-full box-border h-content flex justify-center items-center text-center font-bold cursor-pointer hover:bg-[#37363c] gap-3" @click="uploadFile">
                    <UIcon name="i-uil-upload" size="21" v-if="accepting === false && readytoupload === false"/> <span v-if="accepting === false && readytoupload === false">UPLOAD AUDIO FILE (.wav, .mp3, .ogg)</span>
                    <UIcon name="i-uil-check" size="21" v-else-if="readytoupload === true"/> 
                    <UIcon name="i-svg-spinners-bars-scale" size="21" v-else/> 
                </div>
                </UTooltip>
                <UTooltip :content="{align:'start'}" :text="`${progress}%`">
                <UProgress v-model="progress" />
                </UTooltip>
                <UTooltip :content="{align:'start'}" :text="`${uploading ? 'Uploading...' : 'Upload Your Podcast'}`">
                <button type="submit" class="p-3 tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl w-cpntent self-end cursor-pointer h-content">
                    <span class="font-bold flex items-center justify-center text-center text-xl" v-if="uploading === false"><UIcon name="i-uil-plus" size="25"/>UPLOAD</span>
                    <UIcon name="i-svg-spinners-bars-scale" v-else size="25"/>
                </button>
                </UTooltip>
            </form>
        </div>
</template>

<style>
</style>