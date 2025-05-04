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
    const logOut = ref(false)
    const changeSpeed = ref(() => {})
    const changeBack = ref(() => {})
    const back = ref(20)
    const backmsg = ref('Apply')
    const email = ref('')
    const router = useRouter()
    const font = ref('')
    const speed = ref(20)
    const speedmsg = ref('Apply')
    const items = [
        {
            label: 'Arial (default)',
            onSelect: () => { document.getElementsByTagName('body')[0].style.fontFamily = "'Arial'" },
            ui: 'font-sans'
        },
        {
            label: 'Georgia',
            onSelect: () => { document.getElementsByTagName('body')[0].style.fontFamily = "serif" },
            ui: 'font-serif'
        },{
            label: 'Brush Script MT',
            onSelect: () => { document.getElementsByTagName('body')[0].style.fontFamily = "'Brush Script MT'" }
        },{
            label: 'Tahoma',
            onSelect: () => { document.getElementsByTagName('body')[0].style.fontFamily = "'Tahoma'" }
        },{
            label: 'Courier New',
            onSelect: () => { document.getElementsByTagName('body')[0].style.fontFamily = "monospace" }
        },{
            label: 'Verdana',
            onSelect: () => { document.getElementsByTagName('body')[0].style.fontFamily = "'Verdana'" }
        },{
            label: 'Times New Roman',
            onSelect: () => { document.getElementsByTagName('body')[0].style.fontFamily = "'Times New Roman'" }
        },{
            label: 'Comic Sans / Cursive',
            onSelect: () => { document.getElementsByTagName('body')[0].style.fontFamily = "cursive" }
        },{
            label: 'Wingdings',
            onSelect: () => { document.getElementsByTagName('body')[0].style.fontFamily = "'Wingdings'" }
        }
    ]
    onMounted(async ()=> {
        changeTheme.value = () => {
            if(darkMode.value === false) document.documentElement.classList.add('dark')
            else document.documentElement.classList.remove('dark')
        }
        changeSpeed.value = () => {
            document.documentElement.id = `${speed.value}` + document.documentElement.id.substring(2)
            speedmsg.value = 'Applied'
            document.getElementById('gauge').disabled = true
        }
        changeBack.value = () => {
            document.documentElement.id = document.documentElement.id.substring(0, 3) + `${back.value}`
            backmsg.value = 'Applied'
            document.getElementById('backer').disabled = true
        }
        if(document.documentElement.classList.contains('dark')) darkMode.value = true
        else darkMode.value = false
        speed.value = parseInt(document.documentElement.id.substring(0, 2))
        back.value = parseInt(document.documentElement.id.substring(3))
        const link = supabase.storage.from('files').getPublicUrl('pfps/01110.svg').data.publicUrl
        pfpsrc.value = link
        const fileTag = document.getElementById('file')
        if(user.value) {
            guestMode.value = false
            logOut.value = async () => {
                try {
                    email.value = user.value.email
                    const { error } = await supabase.auth.signOut()
                    if(error) throw error;
                    try {
                        const { error } = await supabase.from('USER').update({ isOnline: false}).eq('UserEmail', email.value);
                        if(error) throw error;
                        router.push("/login")
                    } catch(error) { setError.value = true; console.log(error) }
                } catch(error) { setError.value = true; console.log(error) }
            }
            deleteUser.value = async () => {
                if(deleting.value === false) {
                    deleting.value = true
                    try {
                        const { data: userdata, error } = await supabase.from('USER').select("UserID").eq('UserEmail', user.value.email)
                        if(error) throw error
                        content.value = "Deleting subscriptions..."
                        try {
                            const subresponse = await supabase.from('SUBSCRIBE FEED').delete().eq("CreatorID", userdata[0].UserID)
                            const subberresponse = await supabase.from('SUBSCRIBE FEED').delete().eq("SubscriberID", userdata[0].UserID)
                            content.value = "Deleting Liked Videos..."
                            const likerresponse = await supabase.from('LIKE FEED').delete().eq("LikerID", userdata[0].UserID)
                            content.value = "Deleting Podcasts..."
                            const { data: podcastdata, error } = await supabase.from('PODCAST').delete().eq("CreatorID", userdata[0].UserID).select("PodcastID")
                            if(error) throw error
                            content.value = "Deleting user..."
                            try {
                                const { error } = await supabase.auth.signOut()
                                if(error) throw error;
                                const userresponse = await supabase.from('USER').delete().eq("UserID", userdata[0].UserID)
                                content.value = "Deleting Successful!"
                                router.push('/login')
                            } catch(error) {setError.value = true; console.log(error)}
                        } catch(error) {setError.value = true; console.log(error)}
                    } catch(error) {setError.value = true; console.log(error)}
                }
            }
            try {
                const { data: userdata, error } = await supabase.from('USER').select("*").eq("UserEmail", user.value.email)
                if(error) throw error
                document.getElementById('pfp').setAttribute("src", link)
                isPrivate.value = userdata[0].isPrivate
                changeUsername.value = async () => {
                    deleteMode.value = false
                    try {
                        const { error } = await supabase.from('USER').update({ UserName: username.value}).eq("UserID", userdata[0].UserID)
                        if(error) throw error
                        src.value = pfpsrc.value
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
                document.getElementById('file').click()
            }
            
            fileSelected.value = () => {
                readyToChange.value = true
                const blob = window.URL || window.webkitURL
                if(!blob) { console.log("FAILED"); return; }
                const fileTag = document.getElementById('file')
                const fileURL = blob.createObjectURL(fileTag.files[0])
                src.value = fileURL
                document.getElementById('pfp').setAttribute("src", fileURL)
                if(fileTag.value.endsWith('.jpg') === true) format.value = 'jpg'
                else if(fileTag.value.endsWith('.png') === true) format.value = 'png'
            }

            changePFP.value = async () => {
                deleteMode.value = false
                if(readyToChange.value === true) {
                    const fileTag = document.getElementById('file')
                    try {
                        const { data: userdata, error } = await supabase.from('USER').select("*").eq("UserEmail", user.value.email)
                        if(error) throw error
                        try {
                            const { error } = await supabase.storage.from('files').upload(`pfps/${userdata[0].UserID}.${format.value}`, fileTag.files[0], { upsert: true })
                            if(error) throw error
                            try {
                                const { error } = await supabase.from('USER').update({ HasPFP: true }).eq("UserID", userdata[0].UserID)
                                if(error) throw error
                                content.value = "Your Profile Picture has been changed!"
                                pfpChanged.value = true
                            } catch(error) {setError.value = true; console.log(error)}
                        } catch(error) {setError.value = true; console.log(error)}
                    } catch(error) {setError.value = true; console.log(error)}
                }
            }
        }
    })
    useHead({title:'Settings | WAVY'})
</script>

<template>
        <div class="bg-neutral-300 dark:bg-neutral-800 min-h-dvh overflow-y-auto w-screen box-border flex flex-col p-3 gap-3">
            <UTooltip :content="{align:'start'}" text="Settings">
            <h1 class="text-4xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-5 text-center rounded-xl font-bold tracking-widest">SETTINGS</h1>
            </UTooltip>
            <div v-if="setError === true" class="bg-neutral-800 h-full overflow-y-auto w-full box-border flex flex-col justify-center items-center gap-5">
                <div class="text-3xl text-neutral-500">Sorry... We cannot connect to the network!</div>
                <UIcon name="i-uil-wifi-slash" class="text-neutral-500" size="80"/>
            </div>
            <div v-else class="w-full h-content flex flex-col gap-2">
                <h1 class="text-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-5 text-center rounded-xl font-bold tracking-widest w-content self-start">GENERAL</h1>
                <div class="flex flex-col gap-2 self-start">
                    <UTooltip :content="{align:'start'}" text="Theme Switch">
                    <div><USwitch v-model="darkMode" label="Dark Mode" @click="changeTheme" default-value class="w-40 mt-3 cursor-pointer font-bold" size="xl"/></div>
                    </UTooltip>
                    <span class="mt-5 text-neutral-900 dark:text-neutral-100">Change Website Font</span>
                    <UTooltip :content="{align:'start'}" text="Change the main font of the website">
                    <USelectMenu v-model="font" icon="i-uil-font" :items="items" class="w-48" :ui="{
                        item: `first:font-sans nth-2:font-serif nth-3:font-['Brush Script MT'] nth-4:font-['Tahoma'] nth-5:font-mono nth-6:font-['Verdana'] nth-7:font-['Times New Roman'] nth-8:font-[cursive] nth-9:font-['Wingdings']`
                    }"/>
                    </UTooltip>
                    <span class="mt-5 text-neutral-900 dark:text-neutral-100 flex items-center gap-2"><UIcon name="i-uil-forward" class="bg-purple-800" size="30"/> Fast-Forward Value (in minutes)</span>
                    <div class="flex items-center gap-2">
                        <UTooltip :content="{align:'start'}" text="Change the fast-forward value of the fast-forward feature in a podcast page">
                        <UInputNumber v-model="speed" :min="1" :max="60" class="w-40"/>
                        </UTooltip>
                        <UTooltip :content="{align:'start'}" text="Apply Changes">
                        <button id="gauge" class="pr-3 pl-3 text-white w-content tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl cursor-pointer mt-2 disabled:opacity-40" @click="changeSpeed">{{ speedmsg }}</button>
                        </UTooltip>
                    </div>
                    <span class="mt-5 text-neutral-900 dark:text-neutral-100 flex items-center gap-2"><UIcon name="i-uil-backward" class="bg-purple-800" size="30"/> Backtrack Value (in minutes)</span>
                    <div class="flex items-center gap-2">
                        <UTooltip :content="{align:'start'}" text="Change the backtrack value of backtrack feature in a podcast page">
                        <UInputNumber v-model="back" :min="1" :max="60" class="w-40"/>
                        </UTooltip>
                        <UTooltip :content="{align:'start'}" text="Apply Changes">
                        <button id="backer" class="pr-3 pl-3 text-white w-content tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl cursor-pointer mt-2 disabled:opacity-40" @click="changeBack">{{ backmsg }}</button>
                        </UTooltip>
                    </div>
                </div>
                <div v-if="guestMode === false" class="w-full h-content flex flex-col gap-2">
                    <h1 class="mt-10 text-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-5 text-center rounded-xl font-bold tracking-widest w-content self-start">PROFILE</h1>
                    <div class="flex gap-2 items-center">
                        <UTooltip :content="{align:'start'}" text="Current Profile Picture">
                        <img id="pfp" src="../public/WAVY Default Profile Picture.svg" alt="pfp" class="w-25 h-25 rounded-full">
                        </UTooltip>
                        <UTooltip :content="{align:'start'}" text="Upload file of your new profile picture">
                        <input type="file" id="file" @change="fileSelected" accept=".jpg,.png" class="hidden">
                        </UTooltip>
                        <UTooltip :content="{align:'start'}" text="Upload image file">
                        <div class="bg-neutral-400 dark:bg-[#4e4b55] rounded-3xl p-3 w-80 box-border h-10 flex justify-center items-center text-center font-bold cursor-pointer hover:bg-[#37363c] gap-3" @click="uploadFile">
                            <UIcon name="i-uil-upload" size="21"/> <span>UPLOAD IMAGE (.jpg, png)</span>
                        </div>
                        </UTooltip>
                        <UModal v-model:open="pfpChanged">
                            <template #content>
                                <img v-if="deleteMode === false" :src="src" alt="pfp" class="w-25 h-25 rounded-full self-center mt-10 mb-3">
                                <UIcon name="i-uil-exclamation-triangle" v-show="deleteMode === true" id="modalicon" class="text-yellow-500 self-center mb-5" size="60"/>
                                <span class="text-neutral-900 dark:text-neutral-100 self-center mb-10 font-bold">{{ content }}</span>
                                <div class="w-full flex gap-5 mt-3 box-border p-5" v-show="deleteMode === true">
                                    <UTooltip :content="{align:'start'}" text="Cancel">
                                    <button class="pr-3 pl-3 text-white w-full h-10 tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl font-bold cursor-pointer" @click="pfpChanged = false" v-show="deleting === false">CANCEL</button>
                                    </UTooltip>
                                    <UTooltip :content="{align:'start'}" text="Delete">
                                    <button class="pr-3 pl-3 text-white w-full h-10 tracking-widest bg-neutral-700 hover:bg-neutral-800 rounded-2xl font-bold cursor-pointer transition-all ease-linear delay-[0.3s]" @click="deleteUser">
                                        <UIcon name="i-svg-spinners-bars-scale" v-show="deleting === true"/>
                                        <span class="text-red-500" v-show="deleting === false">DELETE</span>
                                    </button>
                                    </UTooltip>
                                </div>
                            </template>
                        </UModal>
                    </div>
                    <UTooltip :content="{align:'start'}" text="Change Profile Picture">
                    <button class="pr-3 pl-3 text-white w-60 tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl cursor-pointer mt-2" v-show="readyToChange" @click="changePFP">Change Profile Picture</button>
                    </UTooltip>
                    <span class="mb-2 mt-5 text-neutral-900 dark:text-neutral-100">Change Username</span>
                    <div class="flex gap-3 items-center">
                        <UTooltip :content="{align:'start'}" text="Input your new username">
                        <input type="text" id="username" v-model="username" class="h-9 bg-[#4e4b55] rounded-3xl p-3 w-60"/>
                        </UTooltip>
                        <UTooltip :content="{align:'start'}" text="Change Username">
                        <button class="pr-3 pl-3 text-white w-content tracking-widest bg-purple-800 hover:bg-purple-900 rounded-2xl cursor-pointer mt-2" v-show="username" @click="changeUsername">Change Username</button>
                        </UTooltip>
                    </div>
                    <UTooltip :content="{align:'start'}" text="Log Out">
                    <button @click="logOut" class="block lg:hidden mt-5 text-sl cursor-pointer flex flex-row gap-2 items-center text-red-500 w-full hover:bg-neutral-300 h-15 dark:hover:bg-neutral-600 transition-all duration-80 ease-linear p-1" v-if="guestMode == false">
                        <UIcon name="i-uil-signout" size="21" class="text-red-500"/>
                        <span class="text-red-500">Log Out</span>
                    </button>
                    </UTooltip>
                    <UTooltip :content="{align:'start'}" text="Delete User">
                    <UButton color="error" variant="outline" class="text-red-500 w-30 mt-10 cursor-pointer h-10" @click="deleteWarn"><UIcon name="i-uil-trash-alt" class="text-red-500"/>Delete User</UButton>
                    </UTooltip>
                    <!-- <USwitch v-model="isPrivate" label="Dark Mode" default-value class="w-40 mt-3 cursor-pointer font-bold" size="xl"/> -->
                </div>
            </div>
        </div>
</template>

<style>
</style>