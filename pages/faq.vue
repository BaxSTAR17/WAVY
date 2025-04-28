<template >
       <div class="bg-neutral-300 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 min-h-dvh h-screen overflow-scroll overflow-x-hidden max-h-400 p-5 w-full no-scrollbar">
           <h1 class="text-4xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-5 text-center rounded-xl font-bold">FREQUENTLY ASKED QUESTIONS</h1>

           <br />
           <h2 class="p-5 text-2xl border border-blue-500 rounded-xl font-bold">GENERAL QUESTIONS</h2>
           <UAccordion type="multiple" :items="general_questions">
              <template #default="{item,open}">
                 <div class="px-2 py-5 m-1 w-250 text-left text-xl border-t-1 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-700 transition-all ease">
                    {{ item.label }}
                 </div>
              </template>

              <template #content="{ item }">
                 <div class="px-3 pb-5 text-xl text-neutral-400">
                    {{item.content}}
                 </div>
              </template>
           </UAccordion>  

           <br /><br />
           <h2 class="p-5 text-2xl border border-indigo-600 rounded-xl font-bold">GETTING STARTED</h2>
           <UAccordion type="multiple" :items="getting_started">
              <template #default="{item,open}">
                 <div class="px-2 py-5 m-1 w-250 text-left text-xl border-t-1 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-700 transition-all ease">
                    {{ item.label }}
                 </div>
              </template>

              <template #content="{ item }">
                 <div class="px-3 pb-5 text-xl text-neutral-400">
                    {{item.content}}
                 </div>
              </template>
           </UAccordion>

           <br /><br />
           <h2 class="p-5 text-2xl border border-purple-700 rounded-xl font-bold">HOSTING AND DISTRIBUTION</h2>
           <UAccordion type="multiple" :items="hosting">
              <template #default="{item,open}">
                 <div class="px-2 py-5 m-1 w-250 text-left text-xl border-t-1 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-700 transition-all ease">
                    {{ item.label }}
                 </div>
              </template>

              <template #content="{ item }">
                 <div class="px-3 pb-5 text-xl text-neutral-400">
                    {{item.content}}
                 </div>
              </template>
           </UAccordion>
           
           <br /><br />
           <h2 class="p-5 text-2xl border border-blue-500 rounded-xl font-bold">MONETIZATION AND GROWTH</h2>
           <UAccordion type="multiple" :items="monetization">
              <template #default="{item,open}">
                 <div class="px-2 py-5 m-1 w-250 text-left text-xl border-t-1 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-700 transition-all ease">
                    {{ item.label }}
                 </div>
              </template>

              <template #content="{ item }">
                 <div class="px-3 pb-5 text-xl text-neutral-400">
                    {{item.content}}
                 </div>
              </template>
           </UAccordion>  

           <br /><br />
           <h2 class="p-5 text-2xl border border-indigo-600 rounded-xl font-bold">ANALYTICS AND PERFORMANCE</h2>
           <UAccordion type="multiple" :items="analytics">
              <template #default="{item,open}">
                 <div class="px-2 py-5 m-1 w-250 text-left text-xl border-t-1 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-700 transition-all ease">
                    {{ item.label }}
                 </div>
              </template>

              <template #content="{ item }">
                 <div class="px-3 pb-5 text-xl text-neutral-400">
                    {{item.content}}
                 </div> hover:bg-neutral-400 dark:hover:bg-neutral-700
              </template>
           </UAccordion>

           <br /><br />
           <h2 class="p-5 text-2xl border border-purple-700 rounded-xl font-bold">TECHNICAL SUPPORT</h2>
           <UAccordion type="multiple" :items="tech_support">
              <template #default="{item,open}">
                 <div class="px-2 py-5 m-1 w-250 text-left text-xl border-t-1 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-700 transition-all ease">
                    {{ item.label }}
                 </div>
              </template>

              <template #content="{ item }">
                 <div class="px-3 pb-5 text-xl text-neutral-400">
                    {{item.content}}
                 </div>
              </template>
           </UAccordion>

           <br /><br />
           <h2 class="p-5 text-2xl border border-blue-500 rounded-xl font-bold">LEGAL AND COPYRIGHT</h2>
           <UAccordion type="multiple" :items="copyright">
              <template #default="{item,open}">
                 <div class="px-2 py-5 m-1 w-250 text-left text-xl border-t-1 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-700 transition-all ease">
                    {{ item.label }}
                 </div>
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
     {label: 'What is WAVY about?', content:'imong mama WAVY!'},
     {label: 'Do I need any technical skills to start a podcast?', content:'No! The only things you need are a mic, the Internet, and a drive for making content.'},
     {label: 'Is there a mobile app?', content:'Yes! WAVY comes with its very own mobile app for Android only (fuck u Apple users kys).'}
  ])

  const getting_started = ref<AccordionItem[]> ([
     {label: 'How do I create a podcast on WAVY?', content:'Click on upload video. Upload video. Wait for video to upload.'},
     {label: 'What audio formats does WAVY support for uploads?', content:'.mp3, .wav, .mp4, .ogg'},
     {label: 'Can I import my existing podcast from another site?', content:'Yes, but make sure its actually your content.'}
  ])

  const hosting = ref<AccordionItem[]> ([
     {label: 'Where will my podcast be distributed?', content:'Here only, although it can be shared through social media via link.'},
     {label: 'How much does podcast hosting cost?', content:'Completely FREE! Unless you use Apple (fuck u Apple users kys).'},
     {label: 'Is there a limit to how many episodes I can upload?', content:'The only limit is your dedication.'}
  ])

  const monetization = ref<AccordionItem[]> ([
     {label: 'How can I make money from my podcast?', content:'You don\'t.'},
     {label: 'Do you help connect podcasters with sponsors?', content:'As long as you\'re not an Apple user.'},
     {label: 'Can I sell merchandise or premium content?', content:'As long as its not an Apple product.'}
  ])

  const analytics = ref<AccordionItem[]> ([
     {label: 'What kind of analytics do you provide?', content:'Sub counts. Daily, monthly, & total views. Like ratio.'},
     {label: 'Can I see who my top listeners are?', content:'No that\'s kinda parasocial.'}
  ])

  const tech_support = ref<AccordionItem[]> ([
     {label: 'What if I have issues uploading an episode?', content:'Skill issue.'},
     {label: 'Can I schedule episodes in advance?', content:'Sure but make sure they\'re uploaded beforehand.'},
     {label: 'Do you offer transcription services?', content:'On the house unless you\'re an Apple user.'}
  ])

  const copyright = ref<AccordionItem[]> ([
     {label: 'Who owns the rights to my podcast content?', content:'You.'},
     {label: 'Can I use copyrighted music in my episodes?', content:'Hell no.'},
     {label: 'What happens if I violate content guidelines?', content:'Straight to jail. Do not pass go, do not collect $200.'}
  ])
</script>

<style>
   body {
       font-family: Arial;
   }
   .text-xl {
     font-family: Arial;
     font-size: 18px
   }

   .text-2xl {
     margin-bottom: 10px;
   }
</style>
