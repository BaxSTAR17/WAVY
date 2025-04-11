<script setup>
    const upload = ref(() => {})
    const title = ref('')
    const subtitles = ref('')
    const uploadFile = ref(() => {})
    const checked = ref(false)

    onMounted(() => {
        const file = document.getElementById('file')
        upload.value = () => {

        }
        uploadFile.value = () => {
            file.click()
        }
    })
</script>

<template>
    <main class="h-screen w-screen flex flex-row">
        <LeftSidebar />
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
                <UTextarea v-if="checked === false" id="subarea" rows="10" autoresizing="false" size="lg" placeholder="Input transcript..." v-model="subtitles" class="h-full bg-[#4e4b55] rounded-3xl p-3 w-full box-border overflow-y-auto mb-5" />
                <input type="file" id="file" accept=".wav,.mp3,.ogg" class="hidden">
                <button class="bg-[#4e4b55] rounded-3xl p-3 w-full box-border h-content flex justify-center items-center text-center font-bold cursor-pointer hover:bg-[#37363c] gap-3" @click="uploadFile"><UIcon name="i-uil-upload" size="21"/> UPLOAD AUDIO FILE (.wav, .mp3, .ogg)</button>
                <button type="submit" class="p-3 text-white tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl w-cpntent self-end cursor-pointer h-content">
                    <span class="font-bold flex items-center justify-center text-center text-xl"><UIcon name="i-uil-plus" size="25"/>UPLOAD</span>
                </button> 
            </form>
        </div>
        <RightSidebar />
    </main>
</template>

<style>
    body, h3 {
        color:white;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
</style>