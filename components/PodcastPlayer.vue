<script setup>
import Icon from '@nuxt/ui/runtime/components/Icon.vue'
import { data } from 'autoprefixer'

    const endtime = ref('0:00')
    const starttime = ref('0:00')
    const liked = ref(false)
    const id = ref(0)
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const guestMode = ref(false)
    const isPlaying = ref(false)
    const muted = ref(false)
    const operateAudio = ref(() => {console.log('h')})
    const muteAudio = ref(() => {console.log('h')})
    const skipAudio = ref(()=>{})
    const found = ref(true)
    const loading = ref(false)
    // const podcastpage = ref(false)
    const creator = ref('')
    const link = ref('')
    const listens = ref(0)
    const title = ref('Podcast Title')
    const cid = ref(0)
    const thumbnail = ref('')
    const dwnld = ref('')
    const props = defineProps({
        src: String,
        uid: Number,
        pid: Number,
        pod: Boolean
    })
    const likes = ref(0)
    const liking = ref([])
    const likey = ref(async () => {})
    const items = [
        [
        {
            label: 'Download',
            icon: 'i-uil-down-arrow',
            onSelect: () => { const { data } = supabase.storage.from('files').getPublicUrl(dwnld.value, { download: true }); window.open(data.publicUrl) }
        },
        {
            label: 'Share',
            icon: 'i-uil-share',
            onSelect: () => {}
        },
        ],
        [
        {
            label: 'Report',
            icon: 'i-uil-comment-alt-exclamation'
        }
        ]
    ]
    if(props.src && props.src.length != 0 && props.uid && props.uid.length != 0) {
        link.value = props.src
        try {
            const { data: userdata, error } = await supabase.from('USER').select("UserName, HasPFP").eq("UserID", props.uid)
            if(error) throw error
            creator.value = userdata[0].UserName
            cid.value = props.uid
            if(userdata[0].HasPFP === false) thumbnail.value = supabase.storage.from('files').getPublicUrl('thumbnails/01110.svg').data.publicUrl
            else thumbnail.value = supabase.storage.from('files').getPublicUrl(`pfps/${cid.value}.svg`).data.publicUrl
        } catch (error) { found.value = false; console.log(error) }
    } else if(props.pid) {
        try {
            const { data: podcastdata, error } = await supabase.from('PODCAST').select("*").eq("PodcastID", props.pid)
            if(error) throw error
            if(podcastdata.length != 0) {
                link.value = supabase.storage.from('files').getPublicUrl(`podcasts/${props.pid}.mp3`).data.publicUrl
                dwnld.value = `podcasts/${props.pid}.mp3`
                if(link.value.length == 0) { 
                    link.value = supabase.storage.from('files').getPublicUrl(`podcasts/${props.pid}.ogg`).data.publicUrl
                    dwnld.value = `podcasts/${props.pid}.ogg`
                }
                if(link.value.length == 0) {
                    link.value = supabase.storage.from('files').getPublicUrl(`podcasts/${props.pid}.wav`).data.publicUrl
                    dwnld.value = `podcasts/${props.pid}.wav`
                }
                likes.value = podcastdata[0].Likes
                listens.value = podcastdata[0].Listens
                try {
                    const { data: userdata, error } = await supabase.from('USER').select("UserName, HasPFP").eq("UserID", podcastdata[0].CreatorID)
                    if(error) throw error
                    creator.value = userdata[0].UserName
                    cid.value = podcastdata[0].CreatorID
                    if(userdata[0].HasPFP === false) thumbnail.value = supabase.storage.from('files').getPublicUrl('thumbnails/01110.svg').data.publicUrl
                    else thumbnail.value = supabase.storage.from('files').getPublicUrl(`pfps/${cid.value}.svg`).data.publicUrl
                    title.value = podcastdata[0].Title
                } catch (error) { found.value = false; console.log(error) }
                if(user.value) {
                    try {
                        const { data, error } = await supabase.from('USER').select("UserID").eq("UserEmail", user.value.email)
                        if(error) throw error
                        id.value = data[0].UserID
                        try {
                            const { data, error } = await supabase.from('LIKE FEED').select("LikeID").match({ LikerID: id.value, PodcastID: props.pid })
                            if(error) throw error
                            if(data.length > 0) liked.value = true
                        } catch(error) { console.log(error) }
                        likey.value = async () => {
                            if(liked.value === true) {
                                try {
                                    const { data: likedata, error } = await supabase.from('LIKE FEED').insert({
                                        LikerID: id.value,
                                        PodcastID: props.pid
                                    }).select()
                                    if(error) throw error
                                    liking.value.push(likedata)
                                    try {
                                        const { data, error } = await supabase.from('PODCAST').update({
                                            Likes: podcastdata[0].Likes + 1
                                        }).eq("PodcastID", props.pid).select()
                                        if(error) throw error
                                        likes.value = data[0].Likes
                                    } catch(error) { found.value = true; console.log(error)}
                                } catch(error) { found.value = true; console.log(error) }
                            } else {
                                if(liking.value.length > 0) {
                                    try {
                                        const { error } = await supabase.from('LIKE FEED').delete().eq("LikeID", liking.value[0].LikeID)
                                        if(error) throw error
                                        liking.value.pop()
                                        try {
                                            const { data, error } = await supabase.from('PODCAST').update({
                                                Likes: podcastdata[0].Likes > 0 ? podcastdata[0].Likes - 1 : 0
                                            }).eq("PodcastID", props.pid).select()
                                            if(error) throw error
                                            likes.value = data[0].Likes
                                        } catch(error) { found.value = true; console.log(error)}
                                    } catch(error) { found.value = true; console.log(error) }
                                }
                            }
                        }
                    } catch(error) { found.value; console.log(error)}
                }
            }
        } catch (error) { found.value = false; console.log(error) }
    } else {
        found.value = false;
    }
    if(!user.value) guestMode.value = true
    onMounted(() => {
        const duration_slide = document.getElementById('durationslide')
        const volume_slide = document.getElementById(`volumeslide${props.pid}`)
        const audio = document.getElementById(`audio${props.pid}`)
        let hack = null
        volume_slide.style.background = `linear-gradient(to right, #8c52ff ${volume_slide.value*(1/3)}%, #5735fd ${volume_slide.value*(2/3)}%, #2299ef ${volume_slide.value}%, gray ${duration_slide.value}%)`
        duration_slide.addEventListener('input', () => {
            duration_slide.style.background = `linear-gradient(to right, #8c52ff ${duration_slide.value*(1/3)}%, #5735fd ${duration_slide.value*(2/3)}%, #2299ef ${duration_slide.value}%, gray ${duration_slide.value}%)`
            starttime.value = endTime(Math.floor(audio.currentTime))
            if(!audio.paused) cancelAnimationFrame(hack)
        })
        duration_slide.addEventListener('change', () => {
            audio.currentTime = duration_slide.value/100*audio.duration
            if(!audio.paused) requestAnimationFrame(whilePlayingHack)
        })
        volume_slide.addEventListener('input', () => {
            volume_slide.style.background = `linear-gradient(to right, #8c52ff ${volume_slide.value*(1/3)}%, #5735fd ${volume_slide.value*(2/3)}%, #2299ef ${volume_slide.value}%, gray ${duration_slide.value}%)`
            audio.volume = volume_slide.value / 100
        })
        const endTime = (secs) => {
            if(!secs) return `0:00`
            const mins = Math.floor(secs / 60)
            const seconds = `${Math.floor(secs % 60) < 10 ? '0' : ''}${Math.floor(secs % 60)}`
            return `${mins}:${seconds}`
        }
        skipAudio.value = () => {
            if(audio.currentTime + 30 < audio.duration) {
                audio.currentTime += 30
                duration_slide.value += 30
                starttime.value = endTime(Math.floor(audio.currentTime))
                duration_slide.style.background = `linear-gradient(to right, #8c52ff ${duration_slide.value*(1/3)}%, #5735fd ${duration_slide.value*(2/3)}%, #2299ef ${duration_slide.value}%, gray ${duration_slide.value}%)`
                if(!audio.paused) requestAnimationFrame(whilePlayingHack)
            }
        }
        operateAudio.value = () => {
            if(isPlaying.value) {
                audio.pause()
                cancelAnimationFrame(hack)
                isPlaying.value = false
            } else {
                audio.play()
                requestAnimationFrame(whilePlayingHack)
                isPlaying.value = true
            }
        }
        muteAudio.value = () => {
            if(muted.value) {
                audio.muted = false
                muted.value = false
                volume_slide.disabled = false
            } else {
                audio.muted = true
                muted.value = true
                volume_slide.disabled = true
            }
        }
        const whilePlayingHack = () => {
            duration_slide.value = Math.floor(Math.floor(audio.currentTime)/Math.floor(audio.duration)*100)
            starttime.value = endTime(Math.floor(audio.currentTime))
            duration_slide.style.background = `linear-gradient(to right, #8c52ff ${duration_slide.value*(1/3)}%, #5735fd ${duration_slide.value*(2/3)}%, #2299ef ${duration_slide.value}%, gray ${duration_slide.value}%)`
            hack = requestAnimationFrame(whilePlayingHack)
        }
        audio.addEventListener("loadedmetadata", () => {
            endtime.value = endTime(audio.duration)
            starttime.value = endTime(Math.floor(duration_slide.value*audio.duration/100))
        })
        audio.addEventListener("ended", () => {
            isPlaying.value = false
            cancelAnimationFrame(hack)
            duration_slide.value = Math.floor(audio.currentTime/audio.duration*100)
            starttime.value = endTime(Math.floor(duration_slide.value*audio.duration/100))
        })
        endtime.value = endTime(audio.duration)
        loading.value = false
    })
</script>

<template>
    <main class="w-full bg-neutral-900 h-content rounded-lg flex flex-col p-3 box-border" v-if="found === true && loading == false">
        <audio :src="link" :id="`audio${props.pid}`" preload="metadata" />
        <div class="w-full flex flex-row items-center h-full gap-3">
            <NuxtLink :to="`/podcast/${props.pid}`" class="w-15 h-15 rounded-lg bg-neutral-800"><img :src="thumbnail" id="img" alt="Thumbnail"></NuxtLink>
            <div class="w-full flex flex-col justify-center p-1 box-border" v-if="props.pod === false">
                <div>
                    <NuxtLink :to="`/podcast/${props.pid}`" class="text-lg font-bold hover:underline">{{ title }}&nbsp;</NuxtLink>
                    <NuxtLink :to="`/profile/${cid}`" class="text-sm hover:underline" style="font-family: 'Arial Narrow', sans-serif; font-weight: 300;">by {{ creator }}</NuxtLink>
                </div>
                <div class="w-full flex flex-row h-7 items-center">
                    <UIcon v-if="isPlaying === false" name="i-basil-play-solid" size="45" class="text-[#8c52ff] hover:bg-purple-900 cursor-pointer" @click="operateAudio"/>
                    <UIcon v-else name="i-basil-pause-solid" size="45" class="text-[#8c52ff] hover:bg-purple-900 cursor-pointer" @click="operateAudio"/>
                    <span>&nbsp;&nbsp;{{starttime}}&nbsp;</span>
                    <!-- <div class="rounded-2xl h-3 bg-neutral-500 w-full"></div> -->
                    <input type="range" id="durationslide" max="100" value="0" class="w-full">
                    <span id="endtime">&nbsp;&nbsp;{{ endtime }}&nbsp;</span>
                    <UIcon v-if="muted === false" name="i-uil-volume" size="40" class="text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="muteAudio"/>
                    <UIcon v-else name="i-uil-volume-mute" size="40" class="text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="muteAudio"/>
                    <!-- <div class="rounded-2xl h-3 bg-neutral-500 w-40"></div> -->
                    <input type="range" :id="`volumeslide${props.pid}`" max="100" value="100" class="w-40">
                    <div v-if="guestMode === false">
                        <UIcon v-if="liked === true" name="i-basil-heart-solid" size="40" class="text-[#8c52ff] cursor-pointer absolute" @click=""/>
                        <UIcon name="i-basil-heart-outline" size="40" class="text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="liked = !liked; likey()"/>
                    </div>
                    <UDropdownMenu :items="items" :content="{ align: 'end', side: 'bottom'}" :ui="{content: 'bg-neutral-700 shadow-xl rounded-lg box-border p-2', item: 'mt-2'}">
                        <UButton class="cursor-pointer active:bg-neutral-800 rounded-full"><UIcon name="i-uil-ellipsis-v" size="30" class="text-neutral-500" /></UButton>
                    </UDropdownMenu>
                </div>
            </div>
            <div v-if="props.pod === true">
                <span class="text-3xl font-bold">{{ title }}&nbsp;</span>
                <NuxtLink :to="`/profile/${cid}`" class="text-sm hover:underline" style="font-family: 'Arial Narrow', sans-serif; font-weight: 300;">by {{ creator }}</NuxtLink>
            </div>
        </div>
        <div class="text-sm text-neutral-400 tracking-wide flex flex-row items-center w-full h-5" style="font-family: 'Arial Narrow', sans-serif; font-weight: 300;">
            <UIcon name="i-uil-play" size="15" />
            <span>{{ listens }}  |&nbsp;</span>
            <UIcon name="i-uil-heart" size="15" />
            <span>{{ likes }}</span>
        </div>
        <NuxtLink :to="`/podcast/${props.pid}`" v-if="props.pod === false" class="text-neutral-500 hover:text-neutral-400 w-content">View Transcript</NuxtLink>
        <div v-if="props.pod === true">
            <div class="w-full flex flex-col h-content">
                <div class="w-full flex flex-row items-center">
                    <span>&nbsp;&nbsp;{{starttime}}&nbsp;</span>
                    <!-- <div class="rounded-2xl h-3 bg-neutral-500 w-full"></div> -->
                    <input type="range" id="durationslide" max="100" value="0" class="w-full">
                    <span id="endtime">&nbsp;&nbsp;{{ endtime }}&nbsp;</span>
                </div>
                <div class="w-full flex flex-row items-center justify-between">
                    <div class="flex flex-row items-center">
                        <UIcon v-if="isPlaying === false" name="i-basil-play-solid" size="45" class="text-[#8c52ff] cursor-pointer" @click="operateAudio"/>
                        <UIcon v-else name="i-basil-pause-solid" size="45" class="text-[#8c52ff] cursor-pointer" @click="operateAudio"/>
                        <UIcon name="i-uil-forward" size="45" class="text-[#8c52ff] cursor-pointer" @click="skipAudio"/>
                        <UIcon v-if="muted === false" name="i-uil-volume" size="40" class="text-[#8c52ff] cursor-pointer" @click="muteAudio"/>
                        <UIcon v-else name="i-uil-volume-mute" size="40" class="text-[#8c52ff] cursor-pointer" @click="muteAudio"/>
                        <!-- <div class="rounded-2xl h-3 bg-neutral-500 w-40"></div> -->
                        <input type="range" :id="`volumeslide${props.pid}`" max="100" value="100" class="w-40">
                    </div>
                    <div class="flex flex-row items-center" v-if="guestMode === false">
                        <UIcon v-if="liked === true" name="i-basil-heart-solid" size="50" class="text-[#8c52ff] cursor-pointer absolute" @click=""/>
                        <UIcon name="i-basil-heart-outline" size="50" class="text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="liked = !liked; likey()"/>
                        <UIcon name="i-uil-share" size="55" class="text-[#8c52ff] self-end" />
                    </div>
                </div>
            </div>
        </div>
    </main>
    <main class="w-full bg-neutral-900 h-content rounded-lg flex flex-col p-3 box-border justify-center items-center" v-else-if="found === false && (loading === true || loading === false)">
        <span class="text-neutral-500">Sorry, we are having trouble loading the audio</span>
        <UIcon name="i-uil-annoyed" class="text-neutral-500" size="40" />
        <input type="range" id="durationslide" max="100" value="0" class="w-0 h-0 invisible">
        <input type="range" id="volumeslide0" max="100" value="0" class="w-0 h-0 invisible">
        <audio src="" id="audio" preload="metadata" />
    </main>
    <main class="w-full bg-neutral-900 h-content rounded-lg flex flex-col p-3 box-border justify-center items-center" v-else-if="found===true && loading === true">
        <Skeleload class="w-full h-25 rounded-lg bg-neutral-700" />
        <input type="range" id="durationslide" max="100" value="0" class="w-0 h-0 invisible">
        <input type="range" id="volumeslide0" max="100" value="0" class="w-0 h-0 invisible">
        <audio src="" id="audio" preload="metadata" />
    </main>
    <hr class="w-full pl-0 ml-0 text-neutral-400" style="height: 5px;"/>
</template>

<style>
    input[type=range] {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        background: gray;
        cursor: pointer;
        outline: none;
        border-radius: 5px;
        height: 10px;
    } input[type=range]::-webkit-slider-thumb {
        appearance: none;
        width: 17px;
        height: 17px;
        border-radius: 50%;
        cursor: pointer;
        background: #8c52ff;
    }
</style>