<template >
        <div class="bg-neutral-300 dark:bg-neutral-800 h-full overflow-y-auto overflow-x-hidden p-5 w-full no-scrollbar">
            <h1 class="text-4xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-5 text-center rounded-xl font-bold">ABOUT US</h1>

            <h2 class="p-5 my-10 text-2xl border border-blue-500 rounded-xl font-bold text-neutral-900 dark:text-neutral-100">About WAVY</h2>
            <div class="flex flex-row flex-wrap lg:flex-nowrap justify-center m-10">
                <div class="mt-10">
                    <div class="wavy_mask w-100 h-100 bg-gradient-to-r from-blue-500 from-10% via-violet-600 via-50% to-purple-700 to-100%"></div>
                </div>
            
                <p class="ml-10 text-justify text-lg leading-12 flex flex-col w-auto text-neutral-900 dark:text-neutral-100">
                    WAVY is a dynamic podcast hosting and viewing platform designed to simplify the creation, distribution, and discovery of podcasts.
                    Whether you're a seasoned podcaster or just starting out, WAVY provides user-friendly tools to upload, manage, and share your episodes effortlessly.
                    <br />
                    <br />
                    The platform offers high-quality streaming, customizable podcast pages, and detailed analytics to help creators track their audience engagement.
                    For listeners, WAVY features an intuitive interface with curated recommendations, personalized playlists, and seamless playback across devices.
                    With a focus on accessibility and community, WAVY connects creators with their audiences while fostering a space for diverse voices and stories to thrive.
                    Whether you're looking to launch your own show or explore compelling content, WAVY is your go-to destination for all things podcasting.
                </p>
            </div>
            
            <h2 class="p-5 my-10 text-2xl border border-blue-500 rounded-xl font-bold text-neutral-900 dark:text-neutral-100">About RBGStudios</h2>
            <div class="flex flex-row flex-wrap lg:flex-nowrap justify-center content-center m-10 text-neutral-900 dark:text-neutral-100">
                <div class="mt-10">
                    <div class="wavy_mask w-100 h-100 bg-gradient-to-r from-blue-500 from-10% via-violet-600 via-50% to-purple-700 to-100%"></div>
                </div>
                
                <div class="flex flex-col ml-10">
                    <h1 class="text-justify text-lg leading-12 w-auto font-bold text-neutral-900 dark:text-neutral-100">
                        Welcome to RBGStudios — where creativity meets entertainment!
                    </h1>
                    <p class="text-justify text-lg leading-12 w-auto text-neutral-900 dark:text-neutral-100 ">
                        At RBGStudios, we're passionate about delivering engaging, high-quality content that captivates audiences across social media platforms.
                        Whether it's through viral videos, dynamic storytelling, or interactive experiences, our mission is to bring joy, laughter, and excitement to viewers worldwide.
                    </p>

                    <h1 class="text-justify text-lg leading-12 w-auto font-bold mt-10 text-neutral-900 dark:text-neutral-100 ">
                        Who We Are
                    </h1>
                    <p class="text-justify text-lg leading-12 w-auto text-neutral-900 dark:text-neutral-100 ">
                        Founded with a vision to redefine digital entertainment, RBGStudios is a team of creators, strategists, and storytellers dedicated to producing content that resonates with today's fast-paced, social-first generation.
                        We blend innovation with entertainment, ensuring every piece of content we create leaves a lasting impression.
                    </p>

                    <h1 class="text-justify text-lg leading-12 w-auto font-bold mt-10 text-neutral-900 dark:text-neutral-100 ">
                        Our Vision
                    </h1>
                    <p class="text-justify text-lg leading-12 w-auto text-neutral-900 dark:text-neutral-100 ">
                        To become a leading name in digital entertainment, fostering a community where creativity thrives and every viewer feels connected.
                        <br />
                        Join us on this exciting journey — follow RBGStudios on social media and be part of the fun!
                    </p>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
   
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

    .wavy_mask {
        -webkit-mask-image: url('../WAVY\ Secondary\ Logo\ \(Black\).svg');
        mask-image: url('../WAVY\ Secondary\ Logo\ \(Black\).svg');
        mask-repeat: no-repeat;
    }
</style>