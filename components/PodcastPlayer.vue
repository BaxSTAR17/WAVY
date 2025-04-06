<script setup>
    const endtime = ref('')
    const starttime = ref('')
    const liked = ref('i-basil-heart-outline')
    const isPlaying = ref(false)
    const muted = ref(false)
    const operateAudio = ref(() => {console.log('h')})
    const muteAudio = ref(() => {console.log('h')})
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
            const mins = Math.floor(secs / 60)
            const seconds = `${Math.floor(secs % 60) < 10 ? '0' : ''}${Math.floor(secs % 60)}`
            return `${mins}:${seconds}`
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
    })
</script>

<template>
    <audio src="./audio/test.mp3" id="audio" preload="metadata" />
    <main class="w-full bg-neutral-900 h-25 rounded-lg flex flex-col p-3 box-border">
        <div class="w-full flex flex-row items-center h-full">
            <div class="w-15 h-15 rounded-lg bg-neutral-700"></div>
            <div class="w-full flex flex-col justify-center p-1 box-border">
                <div>
                    <span class="text-lg">Podcast Title&nbsp;</span>
                    <span class="text-sm" style="font-family: 'Arial Narrow', sans-serif; font-weight: 300;">by Creator name</span>
                </div>
                <div class="w-full flex flex-row h-7 items-center">
                    <UIcon v-if="isPlaying === false" name="i-basil-play-solid" size="45" class="text-[#8c52ff] cursor-pointer" @click="operateAudio"/>
                    <UIcon v-else name="i-basil-pause-solid" size="45" class="text-[#8c52ff] cursor-pointer" @click="operateAudio"/>
                    <span>&nbsp;&nbsp;{{starttime}}&nbsp;</span>
                    <!-- <div class="rounded-2xl h-3 bg-neutral-500 w-full"></div> -->
                    <input type="range" id="duration-slide" max="100" value="0" class="w-full">
                    <span id="endtime">&nbsp;&nbsp;{{ endtime }}&nbsp;</span>
                    <UIcon v-if="muted === false" name="i-uil-volume" size="40" class="text-[#8c52ff] cursor-pointer" @click="muteAudio"/>
                    <UIcon v-else name="i-uil-volume-mute" size="40" class="text-[#8c52ff] cursor-pointer" @click="muteAudio"/>
                    <!-- <div class="rounded-2xl h-3 bg-neutral-500 w-40"></div> -->
                    <input type="range" id="volume-slide" max="100" value="100" class="w-40">
                    <UIcon :name="liked" size="60" class="text-[#8c52ff] cursor-pointer" @click="liked = liked == 'i-basil-heart-solid' ? 'i-basil-heart-outline' : 'i-basil-heart-solid'"/>
                    <!-- <UIcon v-else name="i-basil-heart-solid" size="60" class="text-[#8c52ff] cursor-pointer" @click="liked=false"/> -->
                    <UIcon name="i-uil-ellipsis-v" size="50" class="text-neutral-500" />
                </div>
            </div>
        </div>
        <div class="text-sm text-neutral-400 tracking-wide flex flex-row items-center w-full h-5" style="font-family: 'Arial Narrow', sans-serif; font-weight: 300;">
            <UIcon name="i-uil-play" size="15" />
            <span>0  |&nbsp;</span>
            <UIcon name="i-uil-heart" size="15" />
            <span>0</span>
        </div>
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