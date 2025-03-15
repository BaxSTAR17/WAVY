<template>
    <div class="relative">
        <!--header class="bg-neutral-950 pt-5 px-5 pb-2 text-white border-double">
            <nav>
            </nav>
        </header-->

        <div class="h-screen flex absolute">
            <DesktopSidebar />
        </div>

        <div>
            <slot />
        </div>
    </div>
</template>

<script setup>

</script>