<script setup>
import Icon from '@nuxt/ui/runtime/components/Icon.vue'
import { data } from 'autoprefixer'

    const endtime = ref('0:00')
    const starttime = ref('0:00')
    const liked = ref('i-basil-heart-outline')
    const supabase = useSupabaseClient()
    const isPlaying = ref(false)
    const muted = ref(false)
    const operateAudio = ref(() => {console.log('h')})
    const muteAudio = ref(() => {console.log('h')})
    const skipAudio = ref(()=>{})
    const found = ref(true)
    const loading = ref(false)
    const creator = ref('')
    const link = ref('')
    const likes = ref(0)
    const listens = ref(0)
    const title = ref('Podcast Title')
    const cid = ref(0)
    const thumbnail = ref('')
    const props = defineProps({
        src: String,
        uid: Number,
        pid: Number
    })
    if(props.src.length != 0 && props.uid.length != 0) {
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
            if(data.length != 0) {
                link.value = supabase.storage.from('files').getPublicUrl(`podcasts/${pid.value}.mp3`).data.publicUrl
                if(link.value.length == 0) link.value = supabase.storage.from('files').getPublicUrl(`podcasts/${pid.value}.ogg`).data.publicUrl
                if(link.value.length == 0) link.value = supabase.storage.from('files').getPublicUrl(`podcasts/${pid.value}.wav`).data.publicUrl
                props.uid = data[0].CreatorID
                try {
                    const { data: userdata, error } = await supabase.from('USER').select("UserName, HasPFP").eq("UserID", props.uid)
                    if(error) throw error
                    creator.value = userdata[0].UserName
                    cid.value = props.uid
                    if(userdata[0].HasPFP === false) thumbnail.value = supabase.storage.from('files').getPublicUrl('thumbnails/01110.svg').data.publicUrl
                    else thumbnail.value = supabase.storage.from('files').getPublicUrl(`pfps/${cid.value}.svg`).data.publicUrl
                } catch (error) { found.value = false; console.log(error) }
            }
        } catch (error) { found.value = false; console.log(error) }
    } else {
        found.value = false;
    }
    onMounted(async () => {
        const duration_slide = document.getElementById('duration-slide')
        const volume_slide = document.getElementById('volume-slide')
        const audio = document.getElementById('audio')
        let hack = null
        volume_slide.style.background = `linear-gradient(to right, #8c52ff ${volume_slide.value*(1/3)}%, #5735fd ${volume_slide.value*(2/3)}%, #2299ef ${volume_slide.value}%, gray ${duration_slide.value}%)`
        duration_slide.addEventListener('input', () => {
            duration_slide.style.background = `linear-gradient(to right, #8c52ff ${duration_slide.value*(1/3)}%, #5735fd ${duration_slide.value*(2/3)}%, #2299ef ${duration_slide.value}%, gray ${duration_slide.value}%)`
            starttime.value = endTime(Math.floor(duration_slide.value*audio.duration/100))
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
                starttime.value = endTime(Math.floor(duration_slide.value*audio.duration/100))
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
            duration_slide.value = Math.floor(audio.currentTime/audio.duration*100)
            starttime.value = endTime(Math.floor(duration_slide.value*audio.duration/100))
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
        <audio :src="src" id="audio" preload="metadata" />
        <div class="w-full flex flex-row items-center h-full gap-3">
            <div class="w-15 h-15 rounded-lg bg-neutral-800"><img :src="thumbnail" id="img" alt="Thumbnail"></div>
            <div class="w-full flex flex-col justify-center p-1 box-border" v-if="useRoute().path.startsWith('/podcast') === false">
                <div>
                    <NuxtLink :to="`/profile/${props.pid}`" class="text-lg font-bold hover:underline">{{ title }}&nbsp;</NuxtLink>
                    <NuxtLink :to="`/profile/${cid}`" class="text-sm hover:underline" style="font-family: 'Arial Narrow', sans-serif; font-weight: 300;">by {{ creator }}</NuxtLink>
                </div>
                <div class="w-full flex flex-row h-7 items-center">
                    <UIcon v-if="isPlaying === false" name="i-basil-play-solid" size="45" class="text-[#8c52ff] hover:bg-purple-900 cursor-pointer" @click="operateAudio"/>
                    <UIcon v-else name="i-basil-pause-solid" size="45" class="text-[#8c52ff] hover:bg-purple-900 cursor-pointer" @click="operateAudio"/>
                    <span>&nbsp;&nbsp;{{starttime}}&nbsp;</span>
                    <!-- <div class="rounded-2xl h-3 bg-neutral-500 w-full"></div> -->
                    <input type="range" id="duration-slide" max="100" value="0" class="w-full">
                    <span id="endtime">&nbsp;&nbsp;{{ endtime }}&nbsp;</span>
                    <UIcon v-if="muted === false" name="i-uil-volume" size="40" class="text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="muteAudio"/>
                    <UIcon v-else name="i-uil-volume-mute" size="40" class="text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="muteAudio"/>
                    <!-- <div class="rounded-2xl h-3 bg-neutral-500 w-40"></div> -->
                    <input type="range" id="volume-slide" max="100" value="100" class="w-40">
                    <UIcon :name="liked" size="60" class="text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="liked = liked == 'i-basil-heart-solid' ? 'i-basil-heart-outline' : 'i-basil-heart-solid'"/>
                    <!-- <UIcon v-else name="i-basil-heart-solid" size="60" class="text-[#8c52ff] cursor-pointer" @click="liked=false"/> -->
                    <UIcon name="i-uil-ellipsis-v" size="50" class="text-neutral-500" />
                </div>
            </div>
            <div v-if="useRoute().path.startsWith('/podcast') === true">
                <span class="text-3xl font-bold">Podcast Title&nbsp;</span>
                <NuxtLink to="/profile/0" class="text-sm" style="font-family: 'Arial Narrow', sans-serif; font-weight: 300;">by Creator name</NuxtLink>
            </div>
        </div>
        <div class="text-sm text-neutral-400 tracking-wide flex flex-row items-center w-full h-5" style="font-family: 'Arial Narrow', sans-serif; font-weight: 300;">
            <UIcon name="i-uil-play" size="15" />
            <span>{{ listens }}  |&nbsp;</span>
            <UIcon name="i-uil-heart" size="15" />
            <span>{{ likes }}</span>
        </div>
        <div v-if="useRoute().path.startsWith('/podcast') === true">
            <div class="w-full flex flex-col h-content">
                <div class="w-full flex flex-row items-center">
                    <span>&nbsp;&nbsp;{{starttime}}&nbsp;</span>
                    <!-- <div class="rounded-2xl h-3 bg-neutral-500 w-full"></div> -->
                    <input type="range" id="duration-slide" max="100" value="0" class="w-full">
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
                        <input type="range" id="volume-slide" max="100" value="100" class="w-40">
                    </div>
                    <div class="flex flex-row items-center">
                        <UIcon :name="liked" size="60" class="text-[#8c52ff] cursor-pointer" @click="liked = liked == 'i-basil-heart-solid' ? 'i-basil-heart-outline' : 'i-basil-heart-solid'"/>
                        <!-- <UIcon v-else name="i-basil-heart-solid" size="60" class="text-[#8c52ff] cursor-pointer" @click="liked=false"/> -->
                        <UIcon name="i-uil-share" size="55" class="text-[#8c52ff] self-end" />
                    </div>
                </div>
            </div>
        </div>
    </main>
    <main class="w-full bg-neutral-900 h-content rounded-lg flex flex-col p-3 box-border justify-center items-center" v-else-if="found === false && (loading === true || loading === false)">
        <span class="text-neutral-500">Sorry, we are having trouble loading the audio</span>
        <UIcon name="i-uil-annoyed text-neutral-500" size="40" />
        <input type="range" id="duration-slide" max="100" value="0" class="w-0 h-0 invisible">
        <input type="range" id="volume-slide" max="100" value="0" class="w-0 h-0 invisible">
        <audio src="" id="audio" preload="metadata" />
    </main>
    <main class="w-full bg-neutral-900 h-content rounded-lg flex flex-col p-3 box-border justify-center items-center" v-else-if="found===true && loading === true">
        <Skeleload class="w-full h-25 rounded-lg bg-neutral-700" />
        <input type="range" id="duration-slide" max="100" value="0" class="w-0 h-0 invisible">
        <input type="range" id="volume-slide" max="100" value="0" class="w-0 h-0 invisible">
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