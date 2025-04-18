<script setup>
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const setError = ref(false)
    const darkMode = ref(true)
    const guestMode = ref(true)
    const readyToChange = ref(false)
    const uploadFile = ref(() => {})
    const fileSelected = ref(() => {})
    const changePFP = ref(async () => {})
    const pfpChanged = ref(false)
    const src = ref('')
    const format = ref('')
    const content = ref('')
    const username = ref('')
    const isPrivate = ref(false)
    const changeTheme = () => {
        if(darkMode.value === false) document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
    }
    if(user.value) guestMode.value = false
    else if(!user.value) guestMode.value = true
    if(document.documentElement.classList.contains('dark')) darkMode.value = true
    else darkMode.value = false

    onMounted(async ()=> {
        const fileTag = document.getElementById('file')
        if(user.value) {
            try {
                const { data: userdata, error } = await supabase.from('USER').select("*").eq("UserEmail", user.value.email)
                if(error) throw error
                isPrivate.value = userdata[0].isPrivate
            } catch(error) {setError.value = true; console.log(error)}
            uploadFile.value = () => {
                fileTag.click()
            }
            
            fileSelected.value = () => {
                readyToChange.value = true
                const blob = window.URL || window.webkitURL
                if(!blob) { console.log("FAILED"); return; }
                const fileURL = blob.createObjectURL(fileTag.files[0])
                src.value = fileURL
                document.getElementById('pfp').setAttribute("src", fileURL)
                if(fileTag.value.endsWith('.jpg') === true) format.value = 'jpg'
                else if(fileTag.value.endsWith('.png') === true) format.value = 'png'
            }

            changePFP.value = async () => {
                if(readyToChange.value === true) {
                    try {
                        const { error } = await supabase.storage.from('files').upload(`pfps/${userdata[0].UserID}.${format.value}`, fileTag.files[0])
                        if(error) throw error
                        try {
                            const { error } = await supabase.from('USER').update({ HasPFP: true }).eq("UserID", userdata[0].UserID)
                            if(error) throw error
                            content.value = "Your Profile Picture has been changed!"
                            pfpChanged.value = true
                        } catch(error) {setError.value = true; console.log(error)}
                    } catch(error) {setError.value = true; console.log(error)}
                }
            }
        }
    })
</script>

<template>
        <div class="bg-neutral-300 dark:bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col p-3 gap-3">
            <h1 class="text-4xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-5 text-center rounded-xl font-bold tracking-widest">SETTINGS</h1>
            <div v-if="setError === true" class="bg-neutral-800 h-full overflow-y-auto w-full box-border flex flex-col justify-center items-center gap-5">
                <div class="text-3xl text-neutral-500">Sorry... We cannot connect to the network!</div>
                <UIcon name="i-uil-wifi-slash" class="text-neutral-500" size="80"/>
            </div>
            <div v-else class="w-full h-content flex flex-col gap-2">
                <h1 class="text-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-5 text-center rounded-xl font-bold tracking-widest w-content self-start">GENERAL</h1>
                <div class="flex self-start">
                    <USwitch v-model="darkMode" label="Dark Mode" @click="changeTheme()" default-value class="w-40 mt-3 cursor-pointer font-bold" size="xl"/>
                </div>
                <div v-if="guestMode === false" class="w-full h-content flex flex-col gap-2">
                    <h1 class="mt-10 text-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-5 text-center rounded-xl font-bold tracking-widest w-content self-start">PROFILE</h1>
                    <div class="flex gap-2 items-center">
                        <img id="pfp" src="../public/WAVY Default Profile Picture.svg" alt="pfp" class="w-25 h-25 rounded-full">
                        <input type="file" id="file" @change="fileSelected" accept=".jpg,.png" class="hidden">
                        <div class="bg-neutral-400 dark:bg-[#4e4b55] rounded-3xl p-3 w-80 box-border h-10 flex justify-center items-center text-center font-bold cursor-pointer hover:bg-[#37363c] gap-3" @click="uploadFile">
                            <UIcon name="i-uil-upload" size="21"/> <span>UPLOAD IMAGE (.jpg, png)</span>
                        </div>
                        <UModal v-model:open="pfpChanged">
                            <template #content>
                                <img :src="src" alt="pfp" class="w-25 h-25 rounded-full self-center mt-10 mb-3">
                                <span class="text-neutral-900 dark:text-neutral-100 self-center mb-10 font-bold">{{ content }}</span>
                            </template>
                        </UModal>
                    </div>
                    <button class="pr-3 pl-3 text-white w-60 tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl cursor-pointer mt-2" v-show="readyToChange" @click="changePFP">Change Profile Picture</button>
                    <span class="mb-2 mt-5 text-neutral-900 dark:text-neutral-100">Change Username</span>
                    <input type="text" id="username" v-model="username" class="h-9 bg-[#4e4b55] rounded-3xl p-3 w-60"/>
                    <!-- <USwitch v-model="isPrivate" label="Dark Mode" default-value class="w-40 mt-3 cursor-pointer font-bold" size="xl"/> -->
                </div>
            </div>
        </div>
</template>

<style>
</style>