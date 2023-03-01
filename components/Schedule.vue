<script setup lang="ts">
import { Ref } from 'vue';

const menu = ref(null) as unknown as Ref<HTMLElement>;
const closeMenuIcon = ref(null) as unknown as Ref<HTMLElement>;

const openMenuClasses = [
    "opacity-100",
    "scale-100",
];
const closedMenuClasses = [
    "opacity-0",
    "scale-0",
];

function openMenu() {
    const classes = new Set(menu.value.className.split(" "));
    const iconClasses = new Set(closeMenuIcon.value.className.split(" "));

    openMenuClasses.forEach(c => { classes.add(c); iconClasses.add(c) });
    closedMenuClasses.forEach(c => { classes.delete(c); iconClasses.delete(c) });

    menu.value.className = [...classes].join(' ');
    closeMenuIcon.value.className = [...iconClasses].join(' ');
}

function closeMenu() {
    const classes = new Set(menu.value.className.split(" "));
    const iconClasses = new Set(closeMenuIcon.value.className.split(" "));

    openMenuClasses.forEach(c => { classes.delete(c); iconClasses.delete(c) });
    closedMenuClasses.forEach(c => { classes.add(c); iconClasses.add(c) });
    
    menu.value.className = [...classes].join(' ');
    closeMenuIcon.value.className = [...iconClasses].join(' ');
}

</script>

<template>
    <div class="my-12">
        <h2 id="schedule" class="font-serif font-medium text-5xl text-center leading-loose mb-8 scroll-mt-18">Schedule
        </h2>

        <div class="grid grid-cols-2 gap-x-8 gap-y-12 mx-4 lg:mx-40">
            <div class="col-span-2 text-center">
                <span class="text-slate-400 text-3xl">September 3, 2023</span>
            </div>
            <div class="text-right">
                <span>Ceremony</span>
            </div>
            <div class="text-left">
                <span class="font-bold text-slate-400">5:00 pm</span>
            </div>
            <div class="text-right">
                <span>Cocktail Hour</span>
            </div>
            <div class="text-left">
                <span class="font-bold text-slate-400">6:00 pm</span>
            </div>
            <div class="text-right">
                <span>Reception</span>
            </div>
            <div class="text-left">
                <span class="font-bold text-slate-400">7:00 pm</span>
            </div>
            <div class="text-center col-span-2 relative -top-8">
                <span class="cursor-pointer underline" @click="openMenu">Click here to see the dinner menu!</span>
            </div>
        </div>
    </div>

    <div ref="menu"
         class="fixed top-20 left-4 right-4 bottom-4 bg-white z-50 p-4 shadow-lg shadow-gray-500 overflow-y-scroll transition-all duration-500 opacity-0 scale-0 border-t border-gray-300 rounded-sm">
        <Menu />
    </div>
    <div ref="closeMenuIcon"
         class="fixed top-20 left-4 m-1 w-12 h-12 bg-white float-left cursor-pointer transition-all duration-500 opacity-0 scale-0 z-50 origin-[200%_200%]"
         @click="closeMenu">
        <div class="w-8 h-1 bg-black absolute top-1/2 left-1/2 -translate-x-1/2 rotate-45"></div>
        <div class="w-8 h-1 bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -rotate-45"></div>
    </div>
</template>