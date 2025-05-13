<script setup>
import Icon from '@nuxt/ui/runtime/components/Icon.vue'
import { data } from 'autoprefixer'
import { routerKey } from 'vue-router'

    const endtime = ref('00:00')
    const starttime = ref('00:00')
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
    const backAudio = ref(()=>{})
    const found = ref(true)
    const maxtime = ref(0)
    const loading = ref(true)
    const popUp = ref(false)
    const popUpContent = ref('')
    const popUpIcon = ref('')
    const buffering = ref(true)
    const router = useRouter()
    // const podcastpage = ref(false)
    const deleting = ref(false)
    const creator = ref('')
    const link = ref('')
    const listens = ref(0)
    const title = ref('Podcast Title')
    const cid = ref(0)
    const thumbnail = ref('')
    const dwnld = ref('')
    const deletePod = ref(false)
    const deleteConfirm = ref(async () => {})
    const listenPlus = ref(async() => {})
    const shareLink = ref('Share')
    const backtrack = ref('')
    const fastforward = ref('')
    const props = defineProps({
        src: String,
        uid: Number,
        pid: Number,
        pod: Boolean
    })
    const likes = ref(0)
    const liking = ref(-1)
    const listentime = ref(0)
    const likey = ref(async () => {})
    const items = [
        [
        {
            label: 'Download',
            icon: 'i-uil-down-arrow',
            onSelect: () => { const { data } = supabase.storage.from('files').getPublicUrl(dwnld.value, { download: true }); window.open(data.publicUrl) }
        },
        {
            label: shareLink.value,
            icon: shareLink.value === 'Share' ? 'i-uil-share' : 'i-uil-check',
            onSelect: () => {
                deletePod.value = false
                if(shareLink.value === 'Share') {
                    navigator.clipboard.writeText(`wavy-chi.vercel.app/podcast/${props.pid}`)
                    popUpContent.value = "Podcast link has been copied to the clipboard!"
                    popUpIcon.value = "i-uil-link"
                    popUp.value = true
                }
            }
        },
        ],
        [
        {
            label: 'Report',
            icon: 'i-uil-comment-alt-exclamation',
            to: '/contact'
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
                listenPlus.value = async() => {
                    try {
                        const { data, error } = await supabase.from('PODCAST').update({
                            Listens: podcastdata[0].Listens + 1
                        }).eq("PodcastID", props.pid).select()
                        if(error) throw error
                        listens.value = data[0].Listens
                    } catch(error) { console.log(error); found.value = false}
                }
                try {
                    const { data: userdata, error } = await supabase.from('USER').select("UserID, UserName, HasPFP, PFPExtension").eq("UserID", podcastdata[0].CreatorID)
                    if(error) throw error
                    creator.value = userdata[0].UserName
                    cid.value = podcastdata[0].CreatorID
                    if(userdata[0].HasPFP === false) thumbnail.value = supabase.storage.from('files').getPublicUrl('thumbnails/01110.svg').data.publicUrl
                    else thumbnail.value = supabase.storage.from('files').getPublicUrl(`pfps/${userdata[0].UserID}.${userdata[0].PFPExtension}`).data.publicUrl
                    title.value = podcastdata[0].Title
                } catch (error) { found.value = false; console.log(error) }
                loading.value = false
                if(user.value) {
                    try {
                        const { data, error } = await supabase.from('USER').select("UserID").eq("UserEmail", user.value.email)
                        if(error) throw error
                        id.value = data[0].UserID
                        if(id.value === podcastdata[0].CreatorID) {
                            deleteConfirm.value = async () => {
                                deleting.value = true
                                popUpContent.value = "Deleting Podcast..."
                                const deletePodcast = await supabase.from('PODCAST').delete().eq("PodcastID", props.pid)
                                if(deletePodcast.status === 404) { popUpContent.value = "Deleting failed. Try Again Later"; deletePod.value = false; deleting.value = false; return; }
                                popUpContent.value = "Delete Successful!"
                                const deleteLike = await supabase.from('LIKE FEED').delete().eq("PodcastID", props.pid)
                                try {
                                    const { data, error } = await supabase.storage.from('files').remove([dwnld.value])
                                    if(error) throw error
                                } catch(error) { popUpContent.value = "Deleting failed. Try Again Later"; deleting.value = false; console.log(error)}
                                deletePod.value = false
                                popUp.value = false
                                router.push("/")
                                reloadNuxtApp()
                            }
                            items[0].push({
                                label: 'Delete',
                                class: 'text-red-500',
                                icon: 'i-uil-trash-alt',
                                color: 'error',
                                onSelect: () => {
                                    deletePod.value = true
                                    popUpIcon.value = "uil-exclamation-triangle"
                                    popUpContent.value = "Are you sure? (Deleting is irreversible)"
                                    popUp.value = true
                                }
                            })
                        }
                        try {
                            const { data, error } = await supabase.from('LIKE FEED').select("LikeID").match({ LikerID: id.value, PodcastID: props.pid })
                            if(error) throw error
                            if(data.length > 0) { liking.value = data[0].LikeID; liked.value = true }
                        } catch(error) { console.log(error) }
                        likey.value = async () => {
                            if(buffering.value===false) {
                                buffering.value = true
                                if(liked.value === true) {
                                    try {
                                        const { data: likedata, error } = await supabase.from('LIKE FEED').insert({
                                            LikerID: id.value,
                                            PodcastID: props.pid
                                        }).select()
                                        if(error) throw error
                                        try {
                                            const { data, error } = await supabase.from('PODCAST').update({
                                                Likes: podcastdata[0].Likes + 1
                                            }).eq("PodcastID", props.pid).select()
                                            if(error) throw error
                                            likes.value = data[0].Likes
                                        } catch(error) { found.value = true; console.log(error)}
                                    } catch(error) { found.value = true; console.log(error) }
                                } else {
                                    if(liking.value !== -1) {
                                        try {
                                            const { error } = await supabase.from('LIKE FEED').delete().eq("LikeID", liking.value)
                                            if(error) throw error
                                            try {
                                                const { data, error } = await supabase.from('PODCAST').update({
                                                    Likes: likes.value > 0 ? likes.value - 1 : 0
                                                }).eq("PodcastID", props.pid).select()
                                                if(error) throw error
                                                likes.value = data[0].Likes
                                                if(useRoute().path === '/likes') reloadNuxtApp()
                                            } catch(error) { found.value = true; console.log(error)}
                                        } catch(error) { found.value = true; console.log(error) }
                                    }
                                }
                                buffering.value = false
                            }
                        }
                    } catch(error) { found.value = true; console.log(error)}
                }
            }
        } catch (error) { found.value = false; console.log(error) }
    } else {
        found.value = false;
    }
    if(!user.value) guestMode.value = true
    onMounted(() => {
        const duration_slide = document.getElementById(`durationslide${props.pid}`)
        const volume_slide = document.getElementById(`volumeslide${props.pid}`)
        const audio = document.getElementById(`audio${props.pid}`)
        fastforward.value = document.documentElement.id.substring(0, 2)
        backtrack.value = document.documentElement.id.substring(3)
        let hack = null
        volume_slide.style.background = `linear-gradient(to right, #8c52ff ${volume_slide.value*(1/3)}%, #5735fd ${volume_slide.value*(2/3)}%, #2299ef ${volume_slide.value}%, gray ${duration_slide.value}%)`
        duration_slide.addEventListener('input', () => {
            duration_slide.style.background = `linear-gradient(to right, #8c52ff ${(duration_slide.value/audio.duration*100)*(1/3)}%, #5735fd ${(duration_slide.value/audio.duration*100)*(2/3)}%, #2299ef ${(duration_slide.value/audio.duration*100)}%, gray ${(duration_slide.value/audio.duration*100)}%)`
            audio.currentTime = duration_slide.value
            starttime.value = endTime(Math.floor(audio.currentTime))
            if(!audio.paused) cancelAnimationFrame(hack)
        })
        duration_slide.addEventListener('change', () => {
            audio.currentTime = duration_slide.value
            if(!audio.paused) requestAnimationFrame(whilePlayingHack)
        })
        volume_slide.addEventListener('input', () => {
            volume_slide.style.background = `linear-gradient(to right, #8c52ff ${volume_slide.value*(1/3)}%, #5735fd ${volume_slide.value*(2/3)}%, #2299ef ${volume_slide.value}%, gray ${volume_slide.value}%)`
            audio.volume = volume_slide.value / 100
        })
        const endTime = (secs) => {
            if(!secs) return `00:00`
            const mins = `${Math.floor((secs / 60) % 60) < 10 ? '0' : ''}${Math.floor((secs / 60) % 60)}`
            const seconds = `${Math.floor(secs % 60) < 10 ? '0' : ''}${Math.floor(secs % 60)}`
            if((secs / 60) >= 60) {
                const hours = Math.floor(Math.floor(secs / 60) / 60)
                return `${hours}:${mins}:${seconds}`
            }
            return `${mins}:${seconds}`
        }
        skipAudio.value = () => {
            const number = parseInt(document.documentElement.id.substring(0, 2))
            if(audio.currentTime + number < audio.duration && buffering.value == false) {
                duration_slide.disabled = true
                volume_slide.disabled = true
                audio.currentTime += number
                duration_slide.value += number
                starttime.value = endTime(Math.floor(audio.currentTime))
                duration_slide.style.background = `linear-gradient(to right, #8c52ff ${(duration_slide.value/audio.duration*100)*(1/3)}%, #5735fd ${(duration_slide.value/audio.duration*100)*(2/3)}%, #2299ef ${(duration_slide.value/audio.duration*100)}%, gray ${(duration_slide.value/audio.duration*100)}%)`
                if(!audio.paused) requestAnimationFrame(whilePlayingHack)
            }
        }
        backAudio.value = () => {
            const number = parseInt(document.documentElement.id.substring(3))
            if(audio.currentTime - number > 0 && buffering.value == false) {
                duration_slide.disabled = true
                volume_slide.disabled = true
                audio.currentTime -= number
                duration_slide.value -= number
                starttime.value = endTime(Math.floor(audio.currentTime))
                duration_slide.style.background = `linear-gradient(to right, #8c52ff ${(duration_slide.value/audio.duration*100)*(1/3)}%, #5735fd ${(duration_slide.value/audio.duration*100)*(2/3)}%, #2299ef ${(duration_slide.value/audio.duration*100)}%, gray ${(duration_slide.value/audio.duration*100)}%)`
                if(!audio.paused) requestAnimationFrame(whilePlayingHack)
            }
        }
        operateAudio.value = () => {
            if(buffering.value === false) {
                maxtime.value = audio.duration
                duration_slide.max = audio.duration
                if(isPlaying.value) {
                    audio.pause()
                    cancelAnimationFrame(hack)
                    isPlaying.value = false
                } else {
                    if(audio.currentTime === 0) {
                        listenPlus.value()
                    }
                    audio.play()
                    requestAnimationFrame(whilePlayingHack)
                    isPlaying.value = true
                }
            }
        }
        muteAudio.value = () => {
            if(buffering.value === false) {
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
        }
        const whilePlayingHack = () => {
            duration_slide.value = Math.floor(audio.currentTime)//Math.floor(Math.floor(audio.currentTime)/Math.floor(audio.duration)*100)
            starttime.value = endTime(Math.floor(audio.currentTime))
            duration_slide.style.background = `linear-gradient(to right, #8c52ff ${(duration_slide.value/audio.duration*100)*(1/3)}%, #5735fd ${(duration_slide.value/audio.duration*100)*(2/3)}%, #2299ef ${(duration_slide.value/audio.duration*100)}%, gray ${(duration_slide.value/audio.duration*100)}%)`
            hack = requestAnimationFrame(whilePlayingHack)
        }
        audio.addEventListener("loadedmetadata", () => {
            maxtime.value = audio.duration
            endtime.value = endTime(audio.duration)
            buffering.value = false
            duration_slide.disabled = false
            volume_slide.disabled = false
            starttime.value = endTime(Math.floor(duration_slide.value*audio.duration/100))
        })
        audio.addEventListener("ended", () => {
            isPlaying.value = false
            cancelAnimationFrame(hack)
            duration_slide.value = Math.floor(audio.currentTime/audio.duration*100)
            starttime.value = endTime(Math.floor(duration_slide.value*audio.duration/100))
        })
        audio.addEventListener("playing", () => {
            buffering.value = false
            duration_slide.disabled = false
            volume_slide.disabled = false
        })
        audio.addEventListener("play", () => {
            buffering.value = false
            duration_slide.disabled = false
            volume_slide.disabled = false
        })
        audio.addEventListener("pause", () => {
            buffering.value = false
            duration_slide.disabled = false
            volume_slide.disabled = false
        })
        audio.addEventListener("waiting", () => {
            buffering.value = true
            duration_slide.disabled = true
            volume_slide.disabled = true
        })
        endtime.value = endTime(audio.duration)
        loading.value = false
        if(props.pod === true) {
            document.body.onkeyup = function(event) {
                if(event.key === ' ' || event.key === 'Spacebar' || event.code === 'Space') operateAudio.value()
            }
        }
    })
</script>

<template>
    <main class="w-full bg-neutral-100 dark:bg-neutral-900 h-content rounded-lg flex flex-col p-3 box-border" v-if="found === true && loading == false">
        <audio :src="link" :id="`audio${props.pid}`" preload="metadata" />
        <div class="w-full flex flex-row items-center h-full gap-3">
            <UTooltip :content="{align:'start'}" :text="`${title}`">
            <NuxtLink :to="`/podcast/${props.pid}`" class="w-15 h-15 rounded-lg hidden lg:block bg-neutral-200 dark:bg-neutral-800"><img :src="thumbnail" class="w-full h-full" id="img" alt="Thumbnail"></NuxtLink>
            </UTooltip>
            <div class="w-full flex flex-col justify-center p-1 box-border" v-if="props.pod === false">
                <div>
                    <UTooltip :content="{align:'start'}" :text="`${title}`">
                    <NuxtLink :to="`/podcast/${props.pid}`" class="text-neutral-900 dark:text-neutral-100 text-lg font-bold hover:underline">{{ title }}&nbsp;</NuxtLink>
                    </UTooltip>
                    <UTooltip :content="{align:'start'}" :text="`${creator}`">
                    <NuxtLink :to="`/profile/${cid}`" class="text-neutral-900 dark:text-neutral-100 text-sm hover:underline" style="font-family: 'Arial Narrow', sans-serif; font-weight: 300;">by {{ creator }}</NuxtLink>
                    </UTooltip>
                    <UTooltip :content="{align:'start'}" text="Loading...">
                    <UIcon v-show="buffering === true" name="i-svg-spinners-bars-scale" size="25" class="ml-2 mt-2 text-neutral-600 transition-all sel"/>
                    </UTooltip>
                </div>
                <div class="w-full flex flex-row justify-center items-center">
                    <UTooltip :content="{align:'start'}" :text="`Backtrack (${backtrack} seconds)`">
                    <UIcon name="i-uil-backward" size="40" class="text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="backAudio"/>
                    </UTooltip>
                    <UTooltip :content="{align:'start'}" text="Play">
                    <UIcon v-show="isPlaying === false" name="i-basil-play-solid" size="45" class="text-[#8c52ff] cursor-pointer hover:text-purple-900 rounded-full active:bg-neutral-200 dark:active:bg-neutral-800" @click="operateAudio"/>
                    </UTooltip>
                    <UTooltip :content="{align:'start'}" text="Pause">
                    <UIcon v-show="isPlaying === true" name="i-basil-pause-solid" size="45" class="text-[#8c52ff] cursor-pointer hover:text-purple-900 rounded-full active:bg-neutral-200 dark:active:bg-neutral-800" @click="operateAudio"/>
                    </UTooltip>
                    <UTooltip :content="{align:'start'}" :text="`Fast-Forward (${fastforward} seconds)`">
                    <UIcon name="i-uil-forward" size="40" class="text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="skipAudio"/>
                    </UTooltip>
                </div>
                <div class="w-full flex flex-row h-7 items-center">
                    <UTooltip :content="{align:'start'}" :text="`${starttime}`">
                    <span class="text-neutral-900 dark:text-neutral-100">&nbsp;&nbsp;{{starttime}}&nbsp;</span>
                    </UTooltip>
                    <!-- <div class="rounded-2xl h-3 bg-neutral-500 w-full"></div> -->
                    <input type="range" :id="`durationslide${props.pid}`" min="0" :max="maxtime" value="0" class="w-full disabled:opacity-30" disabled>
                    <UTooltip :content="{align:'start'}" :text="`${endtime}`">
                    <span id="endtime" class="text-neutral-900 dark:text-neutral-100">&nbsp;&nbsp;{{ endtime }}&nbsp;</span>
                    </UTooltip>
                    <UTooltip :content="{align:'start'}" text="Volume">
                    <UIcon v-show="muted === false" name="i-uil-volume" size="40" class="hidden lg:block text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="muteAudio"/>
                    </UTooltip>
                    <UTooltip :content="{align:'start'}" text="Volume Muted">
                    <UIcon v-show="muted === true" name="i-uil-volume-mute" size="40" class="hidden lg:block text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="muteAudio"/>
                    </UTooltip>
                    <!-- <div class="rounded-2xl h-3 bg-neutral-500 w-40"></div> -->
                    <input type="range" :id="`volumeslide${props.pid}`" max="100" value="100" class="hidden lg:block w-40 disabled:opacity-30" disabled>
                    <div v-if="guestMode === false && buffering === false" class="self-center">
                        <UTooltip :content="{align:'start'}" text="Like">
                        <UIcon v-if="liked === true" name="i-basil-heart-solid" size="40" class="text-[#8c52ff] cursor-pointer" @click="liked = false; likey()"/>
                        </UTooltip>
                        <UTooltip :content="{align:'start'}" text="Liked">
                        <UIcon v-if="liked === false" name="i-basil-heart-outline" size="40" class="text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="liked = true; likey()"/>
                        </UTooltip>
                    </div>
                    <UDropdownMenu :items="items" :content="{ align: 'end', side: 'bottom'}" :ui="{content: 'bg-neutral-300 dark:bg-neutral-700 shadow-xl rounded-lg box-border p-2', item: 'mt-2'}">
                        <UTooltip :content="{align:'start'}" text="More...">
                        <UButton class="cursor-pointer active:bg-neutral-800 rounded-full" color="black"><UIcon name="i-uil-ellipsis-v" size="30" class="text-neutral-500" /></UButton>
                        </UTooltip>
                    </UDropdownMenu>
                </div>
            </div>
            <div v-if="props.pod === true">
                <UTooltip :content="{align:'start'}" :text="`${title}`">
                <span class="text-neutral-900 dark:text-neutral-100 text-xl font-bold">{{ title }}&nbsp;</span>
                </UTooltip>
                <UTooltip :content="{align:'start'}" :text="`${creator}`">
                <NuxtLink :to="`/profile/${cid}`" class="text-neutral-900 dark:text-neutral-100 text-sm hover:underline" style="font-family: 'Arial Narrow', sans-serif; font-weight: 300;">by {{ creator }}</NuxtLink>
                </UTooltip>
            </div>
        </div>
        <div class="text-md text-neutral-600 dark:text-neutral-400 tracking-wide flex flex-row items-center w-full h-5 justify-between" style="font-family: 'Arial Narrow', sans-serif; font-weight: 300;">
            <div class="w-content h-5 flex flex-row items-center">
                <UTooltip :content="{align:'start'}" :text="`${listens} Listens`">
                <UIcon name="i-uil-play" size="15" />
                </UTooltip>
                <span>{{ listens }}  |&nbsp;</span>
                <UTooltip :content="{align:'start'}" :text="`${likes} Likes`">
                <UIcon name="i-uil-heart" size="15" />
                </UTooltip>
                <span>{{ likes }}</span>
            </div>
            <UTooltip :content="{align:'start'}" text="View Transcript">
            <NuxtLink :to="`/podcast/${props.pid}`" v-if="props.pod === false" class="text-neutral-500 hover:text-neutral-400 w-content ">View Transcript</NuxtLink>
            </UTooltip>
        </div>
        <div v-if="props.pod === true">
            <div class="w-full flex flex-col h-content">
                <div class="w-full flex flex-row items-center">
                    <UTooltip :content="{align:'start'}" :text="`${starttime}`">
                    <span class="text-neutral-900 dark:text-neutral-100">&nbsp;&nbsp;{{starttime}}&nbsp;</span>
                    </UTooltip>
                    <!-- <div class="rounded-2xl h-3 bg-neutral-500 w-full"></div> -->
                    <input type="range" :id="`durationslide${props.pid}`" max="100" value="0" class="w-full disabled:opacity-30" disabled>
                    <UTooltip :content="{align:'start'}" :text="`${endtime}`">
                    <span id="endtime" class="text-neutral-900 dark:text-neutral-100">&nbsp;&nbsp;{{ endtime }}&nbsp;</span>
                    </UTooltip>
                </div>
                <div class="w-full flex flex-row items-center justify-between">
                    <div class="flex flex-row items-center">
                        <UTooltip :content="{align:'start'}" :text="`Backtrack (${backtrack} seconds)`">
                        <UIcon name="i-uil-backward" size="45" class="text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="backAudio"/>
                        </UTooltip>
                        <UTooltip :content="{align:'start'}" text="Play">
                        <UIcon v-show="isPlaying === false" name="i-basil-play-solid" size="45" class="text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="operateAudio"/>
                        </UTooltip>
                        <UTooltip :content="{align:'start'}" text="Pause">
                        <UIcon v-show="isPlaying === true" name="i-basil-pause-solid" size="45" class="text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="operateAudio"/>
                        </UTooltip>
                        <UTooltip :content="{align:'start'}" :text="`Fast-Forward (${fastforward} seconds)`">
                        <UIcon name="i-uil-forward" size="45" class="text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="skipAudio"/>
                        </UTooltip>
                        <UTooltip :content="{align:'start'}" text="Volume">
                        <UIcon v-show="muted === false" name="i-uil-volume" size="40" class="hidden lg:block text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="muteAudio"/>
                        </UTooltip>
                        <UTooltip :content="{align:'start'}" text="Volume Muted">
                        <UIcon v-show="muted===true" name="i-uil-volume-mute" size="40" class="hidden lg:block text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="muteAudio"/>
                        </UTooltip>
                        <!-- <div class="rounded-2xl h-3 bg-neutral-500 w-40"></div> -->
                        <input type="range" :id="`volumeslide${props.pid}`" max="100" value="100" class="hidden lg:block w-40 disabled:opacity-30" disabled>
                        <UIcon v-show="buffering === true" name="i-svg-spinners-bars-scale" size="45" class="text-neutral-600"/>
                    </div>
                    <div class="flex">
                        <div class="flex flex-row items-center" v-if="guestMode === false">
                            <UTooltip :content="{align:'start'}" text="Like">
                            <UIcon v-if="liked === true" name="i-basil-heart-solid" size="50" class="text-[#8c52ff] cursor-pointer absolute" @click=""/>
                            </UTooltip>
                            <UTooltip :content="{align:'start'}" text="Liked">
                            <UIcon name="i-basil-heart-outline" size="50" class="text-[#8c52ff] cursor-pointer hover:text-purple-900" @click="liked = !liked; likey()"/>
                            </UTooltip>
                        </div>
                        <UDropdownMenu :items="items" :content="{ align: 'end', side: 'bottom'}" :ui="{content: 'bg-neutral-300 dark:bg-neutral-700 shadow-xl rounded-lg box-border p-2', item: 'mt-2'}">
                            <UTooltip :content="{align:'start'}" text="More...">
                            <UButton class="cursor-pointer active:bg-neutral-200 dark:active:bg-neutral-800 rounded-full" color="black"><UIcon name="i-uil-ellipsis-v" size="30" class="text-neutral-500" /></UButton>
                            </UTooltip>
                        </UDropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <main class="w-full bg-neutral-100 dark:bg-neutral-900 h-content rounded-lg flex flex-col p-3 box-border justify-center items-center" v-else-if="found === false && (loading === true || loading === false)">
        <span class="text-neutral-500">Sorry, we are having trouble loading the audio</span>
        <UIcon name="i-uil-annoyed" class="text-neutral-500" size="40" />
        <input type="range" :id="`durationslide`" max="100" value="0" class="w-0 h-0 invisible">
        <input type="range" :id="`volumeslide`" max="100" value="0" class="w-0 h-0 invisible">
        <audio src="" :id="`audio`" preload="metadata" />
    </main>
    <main class="w-full bg-neutral-100 dark:bg-neutral-900 h-content rounded-lg flex flex-col p-3 box-border justify-center items-center" v-else-if="found===true && loading === true">
        <Skeleload class="w-full h-25 rounded-lg bg-neutral-700" />
        <input type="range" :id="`durationslide`" max="100" value="0" class="w-0 h-0 invisible">
        <input type="range" :id="`volumeslide`" max="100" value="0" class="w-0 h-0 invisible">
        <audio src="" :id="`audio`" preload="metadata" />
    </main>
    <hr class="w-full pl-0 ml-0 text-neutral-400" style="height: 5px;"/>
    <UModal v-model:open="popUp" class="border-box p-10">
        <template #content>
            <UIcon name="i-uil-link" id="modalicon" v-show="deletePod === false" class="text-neutral-500 self-center mb-5" size="60"/>
            <UIcon name="i-uil-exclamation-triangle" v-show="deletePod === true && popUpContent !== 'Delete Successful!'" id="modalicon" class="text-yellow-500 self-center mb-5" size="60"/>
            <UIcon name="i-uil-check" v-show="popUpContent === 'Delete Successful!'" id="modalicon" class="text-green-500 self-center mb-5" size="60"/>
            <span class="text-neutral-900 dark:text-neutral-100 self-center font-bold text-xl text-center">{{ popUpContent }}</span>
            <div class="w-full flex gap-5 mt-3" v-show="deletePod === true">
                <button class="pr-3 pl-3 text-white w-full h-10 tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl font-bold cursor-pointer" @click="popUp = false" v-show="deleting === false">CANCEL</button>
                <button class="pr-3 pl-3 text-white w-full h-10 tracking-widest bg-neutral-700 hover:bg-neutral-800 rounded-2xl font-bold cursor-pointer transition-all ease-linear delay-[0.3s]" @click="deleteConfirm">
                    <UIcon name="i-svg-spinners-bars-scale" v-show="deleting === true"/>
                    <span class="text-red-500" v-show="deleting === false">DELETE</span>
                </button>
            </div>
        </template>
    </UModal>
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