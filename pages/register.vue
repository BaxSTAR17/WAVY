<script setup defer>
    const supabase = useSupabaseClient()
    const email = ref('')
    const pass2 = ref('')
    const pass = ref('')
    const username = ref('')
    const errormsg = ref('')
    const verifying = ref(false)
    const loading = ref(false)
    const checked = ref(false)
    const checkterms = ref(false)

    const register = async () => {
        if(loading.value === false) {
            const form = document.getElementById('form')
            if(email.value.length == 0 || pass.value.length == 0 || username.value.length == 0 || pass2.value.length == 0) {
                errormsg.value = "* Please fill up all fields"
                return;
            } else if(pass.value !== pass2.value) {
                errormsg.value = "* Cannot confirm password, Please type your password correctly"
                form.reset()
                return;
            } else if(pass.value.length < 6 || pass2.value.length < 6) {
                errormsg.value = "* Password should be at least 6 characters"
                form.reset()
                return;
            } else if(checked.value === false) {
                errormsg.value = "* You must agree to our Terms & Conditions"
                form.reset()
                return;
            }
            const { data, error: error } = await supabase.from('USER').select('*').eq('UserName', username.value)
            if(data.length > 0) {
                errormsg.value = "* Username already taken"
                form.reset()
                return;
            }
            const { data: emaildata, error: error2 } = await supabase.from('USER').select('*').eq('UserEmail', email.value)
            if(emaildata.length > 0) {
                errormsg.value = "* Email already taken"
                form.reset()
                return;
            }
            loading.value = true;
            try {
                const { error } = await supabase.auth.signUp({
                    email: email.value,
                    password: pass.value
                })
                if(error) throw error;
                try {
                    const { error } = await supabase.from('USER').insert({
                        UserName: username.value,
                        UserEmail: email.value,
                        isOnline: false,
                        isPrivate: false,
                        HasPFP: false,
                        Listeners: 0
                    })
                    if(error) throw error;
                    verifying.value = true;
                } catch(error) { console.log(error); loading.value = false; errormsg.value = "* Sorry, We're having trouble creating your account, Please try again later"; form.reset() }
            } catch(error) { console.log(error); loading.value = false; errormsg.value = "* Sorry, We're having trouble registering your account, Please try again later"; form.reset() }
        }
    }
    // const pfpUpload = async (ev) {
    //     const pfp = event?.target.files[0]
    // }
    useHead({title:'Sign Up | Wavy'})
    onMounted(() => {
        
    })
</script>

<template >
    <main class="h-screen w-screen flex flex-row">
        <div class="bg-neutral-100 dark:bg-neutral-900 min-h-dvh w-full hidden lg:flex flex-col items-start">
            <div class="p-3">
                <NuxtLink to="/" class="font-bold text-4xl leading-0">
                    <img id="logo" class="hidden dark:block h-10" src='../public/WAVY Main Logo (White).svg' alt="Wavy Logo">
                    <img id="logo" class="block dark:hidden h-10" src='../public/WAVY Main Logo (Black).svg' alt="Wavy Logo">
                </NuxtLink>
            </div>
            <hr class="w-full pl-0 ml-0 mt-3 text-neutral-900 dark:text-neutral-100" />
            <div class="w-full h-full flex items-center gap-6 border-box p-6 flex-wrap">
                <div class="w-15 h-100" style="background:linear-gradient(#00A2E8, #7E84F7, #732BF5)"></div>
                <div class="flex flex-col h-100 w-50 text-9xl font-bold text-neutral-900 dark:text-neutral-100"> WE ALWAYS LISTEN</div>
            </div>
        </div>
        <div class="bg-neutral-300 dark:bg-neutral-800 min-h-dvh p-5 w-full lg:w-120 flex flex-col justify-start lg:justify-center items-center">
            <NuxtLink to="/" class="font-bold text-4xl leading-0 block lg:hidden self-start mb-20">
                <img id="logo" class="hidden dark:block h-10" src='../public/WAVY Main Logo (White).svg' alt="Wavy Logo">
                <img id="logo" class="block dark:hidden h-10" src='../public/WAVY Main Logo (Black).svg' alt="Wavy Logo">
            </NuxtLink>
            <form @submit.prevent="register()" id="form" class="w-100 flex flex-col gap-2 items-start justify-center">
                <h1 v-if="verifying" class="w-full self-center text-center text-neutral-900 dark:text-neutral-100 text-4xl flex flex-col items-center">Please check your email to verify your account<UIcon name="i-uil-fast-mail" size="100"/></h1>
                <h3 class="m-0 text-neutral-900 dark:text-neutral-100" v-if="!verifying">Username</h3>
                <!-- <input v-if="registerMode" type="file" placeholder="Upload a Profile Picture" @change="pfpUpload" class="bg-gray-800 rounded p-3 w-full" accept="image/png, image/jpeg"> -->
                <input name="username" v-if="!verifying" type="text" placeholder="podcastLover17" v-model="username" class="h-9 bg-neutral-400 dark:bg-[#4e4b55] rounded-3xl mb-6 p-3 w-full text-neutral-900 dark:text-neutral-100">
                <h3 v-if="!verifying" class="m-0 text-neutral-900 dark:text-neutral-100">Email</h3>
                <input name="email" v-if="!verifying" type="email" placeholder="email@RGB.com" v-model="email" class="h-9 bg-neutral-400 dark:bg-[#4e4b55] rounded-3xl p-3 w-full text-neutral-900 dark:text-neutral-100">
                <h3 v-if="!verifying" class="m-0 text-neutral-900 dark:text-neutral-100">Password</h3>
                <input name="password" v-if="!verifying" type="password" autocomplete="new-password" placeholder="pass123" v-model="pass" class="h-9 bg-neutral-400 dark:bg-[#4e4b55] rounded-3xl p-3 w-full text-neutral-900 dark:text-neutral-100">
                <h3 class="m-0 text-neutral-900 dark:text-neutral-100" v-if="!verifying">Confirm Password</h3>
                <input name="confirm" v-if="!verifying" type="password" autocomplete="new-password" placeholder="pass123" v-model="pass2" class="h-9 bg-neutral-400 dark:bg-[#4e4b55] rounded-3xl p-3 w-full text-neutral-900 dark:text-neutral-100">
                <div class="flex gap-1 mt-3">
                    <input type="checkbox" name="terms" value="terms" class="w-10 cursor-pointer" style="accent-color: #8c52ff;" id="termsandconditions" v-model="checked">
                    <label for="terms" class="text-neutral-900 dark:text-neutral-100">I agree to the <span class="text-purple-600 dark:text-purple-400 cursor-pointer" @click="checkterms = true">Terms & Conditions</span></label>
                </div>
                <div class="text-red-500 error h-10" v-if="!verifying">{{ errormsg }}</div>
                <button v-if="!verifying" type="submit" class="p-3 text-white tracking-widest bg-purple-800 rounded-2xl w-50 self-center cursor-pointer">
                    <span v-if="loading === false">REGISTER</span>
                    <span v-else><UIcon name="i-svg-spinners-bars-scale" /></span>
                </button> 
            </form>
            <div class="p-3 mt-6 text-white w-full cursor-pointer flex items-center justify-center">
                <span class="flex text-neutral-900 dark:text-neutral-100">Already have an account? <NuxtLink to="./login" class="text-purple-600 dark:text-purple-400">&nbsp;Log In Instead!</NuxtLink></span>
            </div>
            <NuxtLink to="/" class="pt-3 text-neutral-400 underline">Continue as Guest</NuxtLink>
        </div>
        <UModal v-model:open="checkterms">
            <template #content>
                <div class="flex justify-center items-center p-5 flex-col">
                    <h1 class="text-2xl font-bold underline">TERMS AND CONDITIONS</h1>
                    <div class="text-justify w-100 h-50 overflow-y-auto text-wrap bg-neutral-300 dark:bg-neutral-800 border-box p-3 rounded-lg">
                    Welcome to WAVY!
<br/><br/>
These Terms & Conditions govern your access and use of Wavy, and provide information about the Wavy Services outlined below.
<br/><br/>
These Terms of Use therefore constitute an agreement between you and RGBStudios. If you do not agree to these Terms, then do not access or use Wavy.
<br/><br/>
1. <u>WAVY Services</u><br/>
We agree to provide you with the Wavy Services which include all of Wavy's features, services, technologies, and software that we provide to achieve our vision at RGBStudios: To become a leading name in digital entertainment, fostering a community where creativity thrives and every viewer feels connected. We offer personalized opportunities to create, connect, communicate, discover and share podcasts. We offer you different types of features to help you create, share, and grow your presence in the world of podcasts. So we build systems that try to understand who and what you and everybody care about. Part of that is highlighting content specialized for your interest, features, and accounts that you might be interested in, based on podcasts that you and others listen to. We aim to foster a positive, inclusive, and safe environment by developing and using the tools and resources of our platform to connect our community members and help them make their experiences positive and inclusive, including when we think they might need help. We also have teams and systems that work to combat abuse and violations of our Terms and Conditions, as well as harmful and deceptive behavior. We develop technologies that help us consistently serve our growing community. Organizing and analyzing information for our growing community is also central to our services. Technologies like artificial intelligence aiding our transcript auto generation give us the power to apply complex processes to improve our services. Automated technologies also help us ensure the functionality, accessibility and integrity of our services.
<br/><br/>
2. <u>Our Privacy Policy</u><br/>
Our services require collecting and using your account information, podcasts, and podcasts you listen to in order to improve the listening experience of our users. RGBStudios do not possess the right to give, misuse, sell or take advantage of the data you give us at our Platform..
<br/><br/>
3. <u>Your Commitments for the WAVY platform</u><br/>
In return for our commitment, we require you to ensure us of the your commitments for our platform.
You must be at least 13 years old or the minimum legal age in your country to use Wavy. Any inappropriate content can be reported but we are not accountable for the display of these content
We must not have previously disabled your account for violation of law or any of our terms.
You must NOT be rude.
You don't have to reveal private information through your podcasts or account details
You must NOT impersonate anyone
You can't do anything unlawful, misleading, or fraudulent or for an illegal or unauthorized purpose.
You have to be responsible of copyright and using non-original content. 
Learn how to report conduct or content.
You can't do anything to interfere with our services or stop our services.
You can't create accounts through unauthorized and automated ways
You can’t sell podcasts and your Wavy account or details
You can't reupload someone else’s podcast
You can’t modify, translate, or reverse engineer our platform.
You can't change your name with unlawful and inappropriate words or phrases.
<br/><br/>
4. <u>Content Removal and Disabling or Terminating Your Account</u><br/>
We can remove any content you share on the platform if we believe that it violates these Terms and Conditions, and this include accounts that promote these violations and continue to do it. if you repeatedly infringe other people's intellectual property rights, we may also terminate your account. We can also terminate the platform as a whole, remove or block content or information shared on our platform, or stop providing all of our services if we determine that doing so is reasonably necessary to avoid further legal impact on RGBStudios. If you believe your account has been terminated in error, or you want to disable or permanently delete your account, contact our email on our contact us page. When you request to delete content or your account, the deletion process is instant and irreversible as well as the deletion process for any podcast. If you delete or we disable your account, and you stop accessing Wavy, or if this contract is otherwise terminated, then these Terms shall terminate as an agreement between you and RGBStudios.
<br/><br/>
5. <u>Who Has Rights Under These Terms</u><br/>
These terms and conditions does not give rights to any third parties.
You cannot transfer your rights or obligations under this agreement without our consent.
<br/><br/>
6. <u>Who Is Responsible</u><br/>
Our platform is provided "as is," and we can't guarantee it will be safe and secure or if it will even work perfectly all the time. 
We also don’t control what people and others do or say, and we aren’t responsible for their (or your) actions or online and offline conduct or content. You agree that we won't be responsible for any lost data, or any damages arising out of or related to these Terms, even if we know they are possible. This includes when we delete your content, or account.
<br/><br/>
7. <u>Updating These Terms & Conditions</u><br/>
We may change our Terms and conditions in the far future if we continue holding this platform, and we may need to make changes to these Terms by the time that our platform becomes large or if it is required by law. We always appreciate feedback or other suggestions, but may use them without any restrictions or obligation to compensate you for them, and are under no obligation to keep them confidential.
                </div>
                </div>
            </template>
        </UModal>
    </main>
</template>

<style>
    body {
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    h3, .error {
        font-family: 'Arial Narrow', sans-serif;
        font-weight: 500;
    } .error { color: red; }
</style>