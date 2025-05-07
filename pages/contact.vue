<template>
    <div class="bg-neutral-200 dark:bg-neutral-800 min-h-dvh h-screen overflow-y-auto overflow-x-hidden max-h-400 p-5 w-screen no-scrollbar">
        <UTooltip :content="{align:'start'}" text="Contact Us">
        <h1 class="text-4xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-5 text-center rounded-xl font-bold tracking-widest">CONTACT US</h1>
        </UTooltip>

        <h3 class="text-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-5 py-2 text-justify rounded-xl mt-5 w-fit tracking-widest">
            Have any inquiries? Contact Us!
        </h3>

        <UForm :validate="validate" :state="state" class="mt-3" id="form" @submit.prevent="submit">
            <UFormField label="Email" name="email" required>
                <UTooltip :content="{align:'start'}" text="Input your email">
                <UInput 
                    v-model="state.email"
                    placeholder="Enter your email"
                    class="px-2 py-1 w-full4lg:w-100"
                />
                </UTooltip>
            </UFormField>
            <UTooltip :content="{align:'start'}" text="Select the category of your message">
            <USelectMenu 
                v-model="state.issue"
                placeholder="Select a category"
                :items="query_list"
                :content="{align:'start', side:'bottom', sideOffset:8}"
                class="m-2 text-gray-400 w-full lg:w-96"
            />
            </UTooltip>
            <UTooltip :content="{align:'start'}" text="Input your message">
            <UFormField label="Description of the Query" name="desc" class="mt-2">
                <UTextarea
                    v-model="state.desc"
                    placeholder="Enter a message here..."
                    :rows="10"
                    class=" px-2 py-1 w-full" 
                    />
            </UFormField>
            </UTooltip>
            <UTooltip :content="{align:'start'}" text="Submit message via email">
            <UButton type="reset" @click="submit" class="border-purple-800 rounded-xl mt-2 px-2 py-1 border-3 bg-purple-800 w-fit text-center tracking-widest">
                Submit
            </UButton>
            </UTooltip>

            <p class="mt-5 text-lg text-neutral-900 dark:text-neutral-100">
                Or visit our socials:
            </p>
            <div class="flex flex-row mt-3">
                <UTooltip :content="{align:'start'}" text="Facebook">
                <NuxtLink class="mr-1" to="https://web.facebook.com/profile.php?id=61576064998968">
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><path fill="BlueViolet" d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z"/></svg>
                </NuxtLink>
                </UTooltip>
                <UTooltip :content="{align:'start'}" text="X (Twitter)">
                <NuxtLink class="mr-1" to="https://x.com/WAVYRGBStudios">
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><path fill="BlueViolet" d="m17.687 3.063l-4.996 5.711l-4.32-5.711H2.112l7.477 9.776l-7.086 8.099h3.034l5.469-6.25l4.78 6.25h6.102l-7.794-10.304l6.625-7.571zm-1.064 16.06L5.654 4.782h1.803l10.846 14.34z"/></svg>
                </NuxtLink>
                </UTooltip>
                <UTooltip :content="{align:'start'}" text="Instagram">
                <NuxtLink class="mr-1" to="https://www.instagram.com/wavy.rgbstudios">
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><path fill="BlueViolet" d="M12.001 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6m0-2a5 5 0 1 1 0 10a5 5 0 0 1 0-10m6.5-.25a1.25 1.25 0 0 1-2.5 0a1.25 1.25 0 0 1 2.5 0M12.001 4c-2.474 0-2.878.007-4.029.058c-.784.037-1.31.142-1.798.332a2.9 2.9 0 0 0-1.08.703a2.9 2.9 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.007 9.075 4 9.461 4 12c0 2.475.007 2.878.058 4.029c.037.783.142 1.31.331 1.797c.17.435.37.748.702 1.08c.337.336.65.537 1.08.703c.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.475 0 2.878-.007 4.029-.058c.782-.037 1.308-.142 1.797-.331a2.9 2.9 0 0 0 1.08-.703c.337-.336.538-.649.704-1.08c.19-.492.296-1.018.332-1.8c.052-1.103.058-1.49.058-4.028c0-2.474-.007-2.878-.058-4.029c-.037-.782-.143-1.31-.332-1.798a2.9 2.9 0 0 0-.703-1.08a2.9 2.9 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.926 4.006 14.54 4 12 4m0-2c2.717 0 3.056.01 4.123.06c1.064.05 1.79.217 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.047 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122s-.218 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465c-1.067.047-1.406.06-4.123.06s-3.056-.01-4.123-.06c-1.064-.05-1.789-.218-2.427-.465a4.9 4.9 0 0 1-1.772-1.153a4.9 4.9 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.012 15.056 2 14.717 2 12s.01-3.056.06-4.122s.217-1.79.465-2.428a4.9 4.9 0 0 1 1.153-1.772A4.9 4.9 0 0 1 5.45 2.525c.637-.248 1.362-.415 2.427-.465C8.945 2.013 9.284 2 12.001 2"/></svg>
                </NuxtLink>
                </UTooltip>
                <UTooltip :content="{align:'start'}" text="Reddit">
                <NuxtLink class="mr-1" to="https://www.reddit.com/user/RGBStudios-WAVY/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><path fill="BlueViolet" d="m11.053 7.815l.751-3.536a2 2 0 0 1 2.372-1.54l3.196.68a2 2 0 1 1-.415 1.956l-3.197-.68l-.666 3.135c1.785.137 3.558.73 5.164 1.7A3.192 3.192 0 0 1 23 12.203v.021a3.2 3.2 0 0 1-1.207 2.55l-.008.123c0 3.998-4.45 7.03-9.799 7.03c-5.333 0-9.708-3.024-9.705-6.953l-.01-.181a3.193 3.193 0 0 1 3.454-5.35a11.45 11.45 0 0 1 5.329-1.628m9.285 5.526a1.19 1.19 0 0 0 .662-1.075a1.192 1.192 0 0 0-2.016-.806l-.585.56l-.67-.455c-1.615-1.098-3.452-1.725-5.23-1.764h-1.006c-1.875.028-3.652.6-5.237 1.675l-.664.45l-.583-.55a1.192 1.192 0 1 0-1.315 1.952l.633.29l-.053.695a4 4 0 0 0 .003.584c0 2.71 3.356 5.03 7.708 5.03c4.371 0 7.799-2.336 7.802-5.107a3 3 0 0 0 0-.507l-.052-.672zM6.951 13.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0m7 0a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0m-1.985 5.103c-1.397 0-2.766-.37-3.881-1.21a.424.424 0 0 1 .597-.597c.945.693 2.123.99 3.269.99s2.33-.275 3.284-.959a.44.44 0 0 1 .732.206a.47.47 0 0 1-.12.423c-.683.797-2.483 1.147-3.88 1.147"/></svg>
                </NuxtLink>
                </UTooltip>
            </div>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import type { FormError, FormErrorEvent, FormSubmitEvent} from '@nuxt/ui'
const email = ref('')
const desc = ref('')

useHead({title: 'Contact Us | WAVY'})

const query_list = ref(['About My Profile', 'About Another Profile', 'About Wavy Guidelines', 'About Content Creation', 'Errors/Bugs', 'Report', 'Others'])
const state = reactive({
    email: undefined,
    issue: undefined,
    desc: undefined
})

const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.email) errors.push({name: 'email', message: 'Required', color: 'crimson'})
    if (!state.issue) errors.push({name: 'password', message: 'Required', color: 'crimson'})
    return errors
}

const submit = () => {
    const form = document.getElementById('form')
    const input_category = state.issue
    const input_desc = state.desc
    window.open('mailto:wavy.rgbstudios@gmail.com?subject=' + input_category + '&body=' + input_desc);
    (form as HTMLFormElement)?.clear()
}
</script>

<style>
.text-xl {
  font-family: Arial;
  font-size: 18px
}

.text-2xl {
  margin-bottom: 10px;
}
</style>
