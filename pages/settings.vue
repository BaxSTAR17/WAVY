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
    const changeUsername = ref( async () => {})
    const pfpsrc = ref('')
    const pfpChanged = ref(false)
    const src = ref('')
    const deleteMode = ref(false)
    const deleteWarn = ref(() => {})
    const deleting = ref(false)
    const deleteUser = ref(async () => {})
    const format = ref('')
    const content = ref('')
    const username = ref('')
    const isPrivate = ref(false)
    const changeTheme = ref(false)
    onMounted(async ()=> {
        changeTheme.value = () => {
            if(darkMode.value === false) document.documentElement.classList.add('dark')
            else document.documentElement.classList.remove('dark')
        }
        if(user.value) guestMode.value = false
        else if(!user.value) guestMode.value = true
        if(document.documentElement.classList.contains('dark')) darkMode.value = true
        else darkMode.value = false
        const link = supabase.storage.from('files').getPublicUrl('pfps/01110.svg').data.publicUrl
        const fileTag = document.getElementById('file')
        if(user.value) {
            document.getElementById('pfp').setAttribute("src", link)
            try {
                const { data: userdata, error } = await supabase.from('USER').select("*").eq("UserEmail", user.value.email)
                if(error) throw error
                isPrivate.value = userdata[0].isPrivate
                changeUsername.value = async () => {
                    try {
                        const { error } = await supabase.from('USER').update({ UserName: username.value}).eq("UserID", userdata[0].UserID)
                        if(error) throw error
                        content.value = `You changed your username to ${username.value}!`
                        pfpChanged.value = true
                    } catch(error) {setError.value = true; console.log(error)}
                }
                deleteWarn.value = async () => {
                    deleteMode.value = true
                    content.value = "Are you sure? (Deleting is irreversible)"
                    pfpChanged.value = true
                }
                if(userdata[0].HasPFP === true) {
                    const { error } = await supabase.storage.from('files').exists(`pfps/${userdata[0].UserID}.jpg`)
                    if(error) pfpsrc.value = supabase.storage.from('files').getPublicUrl(`pfps/${userdata[0].UserID}.png`).data.publicUrl
                    else pfpsrc.value = supabase.storage.from('files').getPublicUrl(`pfps/${userdata[0].UserID}.jpg`).data.publicUrl
                    document.getElementById('pfp').setAttribute("src", pfpsrc.value)
                }
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
                    <USwitch v-model="darkMode" label="Dark Mode" @click="changeTheme" default-value class="w-40 mt-3 cursor-pointer font-bold" size="xl"/>
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
                                <img v-if="deleteMode === false" :src="src" alt="pfp" class="w-25 h-25 rounded-full self-center mt-10 mb-3">
                                <UIcon name="i-uil-exclamation-triangle" v-show="deleteMode === true" id="modalicon" class="text-yellow-500 self-center mb-5" size="60"/>
                                <span class="text-neutral-900 dark:text-neutral-100 self-center mb-10 font-bold">{{ content }}</span>
                                <div class="w-full flex gap-5 mt-3" v-show="deleteMode === true">
                                    <button class="pr-3 pl-3 text-white w-full h-10 tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl font-bold cursor-pointer" @click="pfpChanged = false" v-show="deleting === false">CANCEL</button>
                                    <button class="pr-3 pl-3 text-white w-full h-10 tracking-widest bg-neutral-700 hover:bg-neutral-800 rounded-2xl font-bold cursor-pointer transition-all ease-linear delay-[0.3s]" @click="deleteUser">
                                        <UIcon name="i-svg-spinners-bars-scale" v-show="deleting === true"/>
                                        <span class="text-red-500" v-show="deleting === false">DELETE</span>
                                    </button>
                                </div>
                            </template>
                        </UModal>
                    </div>
                    <button class="pr-3 pl-3 text-white w-60 tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl cursor-pointer mt-2" v-show="readyToChange" @click="changePFP">Change Profile Picture</button>
                    <span class="mb-2 mt-5 text-neutral-900 dark:text-neutral-100">Change Username</span>
                    <div class="flex gap-3 items-center">
                        <input type="text" id="username" v-model="username" class="h-9 bg-[#4e4b55] rounded-3xl p-3 w-60"/>
                        <button class="pr-3 pl-3 text-white w-content tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl cursor-pointer mt-2" v-show="username" @click="changeUsername">Change Username</button>
                    </div>
                    <UButton color="error" variant="outline" class="text-red-500 w-30 mt-10 cursor-pointer h-10"><UIcon name="i-uil-trash-alt" class="text-red-500" @click="deleteWarn"/>Delete User</UButton>
                    <!-- <USwitch v-model="isPrivate" label="Dark Mode" default-value class="w-40 mt-3 cursor-pointer font-bold" size="xl"/> -->
                </div>
            </div>
        </div>
</template>

<style>
</style>