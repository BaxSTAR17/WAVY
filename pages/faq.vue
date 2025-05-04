<template >
       <div class="bg-neutral-300 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 min-h-dvh h-screen overflow-scroll text-wrap max-h-400 p-5 w-screen no-scrollbar">
           <UTooltip :content="{align:'start'}" text="Frequently Asked Questions">
           <h1 class="text-4xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-5 text-center rounded-xl font-bold">FREQUENTLY ASKED QUESTIONS</h1>
           </UTooltip>
           <br />
           <UTooltip :content="{align:'start'}" text="General">
           <h2 class="p-5 text-2xl border border-blue-500 rounded-xl font-bold">GENERAL QUESTIONS</h2>
           </UTooltip>
           <UAccordion type="multiple" :items="general_questions">
              <template #default="{item,open}">
               <UTooltip :content="{align:'start'}" :text="`${item.label}`">
                 <div class="px-2 py-5 m-1 w-full text-left text-xl border-t-1 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-700 transition-all ease">
                    {{ item.label }}
                 </div>
               </UTooltip>
              </template>

              <template #content="{ item }">
                 <div class="px-3 pb-5 text-xl text-neutral-400">
                    {{item.content}}
                 </div>
              </template>
           </UAccordion>  

           <br /><br />
           <UTooltip :content="{align:'start'}" text="Getting Started">
           <h2 class="p-5 text-2xl border border-indigo-600 rounded-xl font-bold">GETTING STARTED</h2>
           </UTooltip>
           <UAccordion type="multiple" :items="getting_started">
              <template #default="{item,open}">
               <UTooltip :content="{align:'start'}" :text="`${item.label}`">
                 <div class="px-2 py-5 m-1 w-full text-left text-xl border-t-1 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-700 transition-all ease">
                    {{ item.label }}
                 </div>
               </UTooltip>
              </template>

              <template #content="{ item }">
                 <div class="px-3 pb-5 text-xl text-neutral-400">
                    {{item.content}}
                 </div>
              </template>
           </UAccordion>

           <br /><br />
           <UTooltip :content="{align:'start'}" text="Hosting">
           <h2 class="p-5 text-2xl border border-purple-700 rounded-xl font-bold">HOSTING AND DISTRIBUTION</h2>
           </UTooltip>
           <UAccordion type="multiple" :items="hosting">
              <template #default="{item,open}">
               <UTooltip :content="{align:'start'}" :text="`${item.label}`">
                 <div class="px-2 py-5 m-1 w-full text-left text-xl border-t-1 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-700 transition-all ease">
                    {{ item.label }}
                 </div>
               </UTooltip>
              </template>

              <template #content="{ item }">
                 <div class="px-3 pb-5 text-xl text-neutral-400">
                    {{item.content}}
                 </div>
              </template>
           </UAccordion>
           
           <br /><br />
           <UTooltip :content="{align:'start'}" text="Monetization">
           <h2 class="p-5 text-2xl border border-blue-500 rounded-xl font-bold">MONETIZATION AND GROWTH</h2>
           </UTooltip>
           <UAccordion type="multiple" :items="monetization">
              <template #default="{item,open}">
               <UTooltip :content="{align:'start'}" :text="`${item.label}`">
                 <div class="px-2 py-5 m-1 w-full text-left text-xl border-t-1 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-700 transition-all ease">
                    {{ item.label }}
                 </div>
               </UTooltip>
              </template>

              <template #content="{ item }">
                 <div class="px-3 pb-5 text-xl text-neutral-400">
                    {{item.content}}
                 </div>
              </template>
           </UAccordion>  

           <br /><br />
           <UTooltip :content="{align:'start'}" text="Analytics">
           <h2 class="p-5 text-2xl border border-indigo-600 rounded-xl font-bold">ANALYTICS AND PERFORMANCE</h2>
           </UTooltip>
           <UAccordion type="multiple" :items="analytics">
              <template #default="{item,open}">
               <UTooltip :content="{align:'start'}" :text="`${item.label}`">
                 <div class="px-2 py-5 m-1 w-full text-left text-xl border-t-1 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-700 transition-all ease">
                    {{ item.label }}
                 </div>
               </UTooltip>
              </template>

              <template #content="{ item }">
                 <div class="px-3 pb-5 text-xl text-neutral-400">
                    {{item.content}}
                 </div>
              </template>
           </UAccordion>

           <br /><br />
           <UTooltip :content="{align:'start'}" text="Technical Support">
           <h2 class="p-5 text-2xl border border-purple-700 rounded-xl font-bold">TECHNICAL SUPPORT</h2>
           </UTooltip>
           <UAccordion type="multiple" :items="tech_support">
              <template #default="{item,open}">
               <UTooltip :content="{align:'start'}" :text="`${item.label}`">
                 <div class="px-2 py-5 m-1 w-full text-left text-xl border-t-1 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-700 transition-all ease">
                    {{ item.label }}
                 </div>
               </UTooltip>
              </template>

              <template #content="{ item }">
                 <div class="px-3 pb-5 text-xl text-neutral-400">
                    {{item.content}}
                 </div>
              </template>
           </UAccordion>

           <br /><br />
           <UTooltip :content="{align:'start'}" text="Legal and Copyright">
           <h2 class="p-5 text-2xl border border-blue-500 rounded-xl font-bold">LEGAL AND COPYRIGHT</h2>
           </UTooltip>
           <UAccordion type="multiple" :items="copyright">
              <template #default="{item,open}">
               <UTooltip :content="{align:'start'}" :text="`${item.label}`">
                 <div class="px-2 py-5 m-1 w-full text-left text-xl border-t-1 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-700 transition-all ease">
                    {{ item.label }}
                 </div>
               </UTooltip>
              </template>

              <template #content="{ item }">
                 <div class="px-3 pb-5 text-xl text-neutral-400">
                    {{item.content}}
                 </div>
              </template>
           </UAccordion>
       </div>
</template>

<script setup lang="ts">
  import type { AccordionItem } from '@nuxt/ui';

  const general_questions = ref<AccordionItem[]> ([
     {label: 'What is WAVY about?', content:'WAVY is a dynamic podcast hosting and listening platform designed to simplify the creation, distribution, and discovery of podcasts. To learn more, visit our About Us Page!'},
     {label: 'Do I need any technical skills to start a podcast?', content:'Nope! The only things you need are a microphone, a device, the Internet, and a drive for making content.'},
     {label: 'Is there a mobile app?', content:'Yes! WAVY comes with its very own mobile app for Android devices.'}
  ])

  const getting_started = ref<AccordionItem[]> ([
     {label: 'How do I create a podcast on WAVY?', content:'Make an account and Click on the upload audio'},
     {label: 'What audio formats does WAVY support for uploads?', content:'.mp3, .wav, .mp4, .ogg'},
     {label: 'Can I import my existing podcast from another site?', content:'Yes, but make sure that the content is yours.'}
  ])

  const hosting = ref<AccordionItem[]> ([
     {label: 'Where will my podcast be distributed?', content:'Here only, although it can be shared through social media via link.'},
     {label: 'How much does podcast hosting cost?', content:'Completely FREE!'},
     {label: 'Is there a limit to how many podcasts I can upload?', content:'The only limit is your dedication.'}
  ])

  const monetization = ref<AccordionItem[]> ([
     {label: 'How can I make money from my podcast?', content:'We do not currently support monetization but it can be implemented in the future hopefully'},
     {label: 'Do you help connect podcasters with sponsors?', content:'Sponsorship CAN be possible once monetization is supported'},
     {label: 'Can I sell merchandise or premium content?', content:'Every content you upload to WAVY is free for everyone on default, so premium content is still a feature yet to be added.'}
  ])

  const analytics = ref<AccordionItem[]> ([
     {label: 'What kind of analytics do you provide?', content:'Sub counts, Listens, and even Like ratio!'},
     {label: 'Can I see who my top listeners are?', content:'We do not currently support the ability to view listeners, likers, or even subscribers but just know that people appreciate your work!'}
  ])

  const tech_support = ref<AccordionItem[]> ([
     {label: 'What if I have issues uploading a podcast?', content:'Feel free to contact our technical support team through our contact us page for issues!.'},
     {label: 'Can I schedule podcasts in advance?', content:'We do not currently support the ability to schedule podcasts'},
     {label: 'Do you offer transcription services?', content:'Only through uploading!, you have the ability to have the website auto-generate a transcript for your audio!'}
  ])

  const copyright = ref<AccordionItem[]> ([
     {label: 'Who owns the rights to my podcast content?', content:'You!'},
     {label: 'Can I use copyrighted music in my episodes?', content:'Nope.'},
     {label: 'What happens if I violate content guidelines?', content:'Deletion of reported content or termination of your account.'}
  ])

  useHead({title: 'Frequently Asked Questions | WAVY'})
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
