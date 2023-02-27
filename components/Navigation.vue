<script setup lang="ts">
import { Ref } from 'vue';

const menuIcon = ref(null) as unknown as Ref<HTMLElement>;
const menuLinks = ref(null) as unknown as Ref<HTMLElement>;

function toggleMenuIcon() {
    const openClassName = "open"
    const classes = new Set(menuIcon.value.className.split(" "));
    if (classes.has(openClassName)) {
        classes.delete(openClassName);
    }
    else {
        classes.add(openClassName);
    }

    menuIcon.value.className = [...classes].join(' ');
}

function toggleNavOverlay() {
    const showClassName = "show"
    const classes = new Set(menuLinks.value.className.split(" "));
    if (classes.has(showClassName)) {
        classes.delete(showClassName);
        classes.add("-translate-y-full");
    }
    else {
        classes.add(showClassName);
        classes.delete("-translate-y-full");
    }

    menuLinks.value.className = [...classes].join(' ');
}

function toggleMenu(event: MouseEvent) {
    toggleMenuIcon();
    toggleNavOverlay();
}

onMounted(() => {
    //
});

</script>

<template>
    <div>
        <div
            class="fixed top-0 left-0 h-18 w-full bg-white px-20 box-border text-right font-serif italic text-3xl z-nav leading-loose select-none">
            <NuxtLink
                class="font-serif leading-[4.5rem] text-4xl lg:text-5xl text-black font-medium select-none inline-block absolute left-0 ml-4 lg:ml-20 not-italic"
                to="/">
                Na & Richard</NuxtLink>
            <div class="hidden lg:block">
                <NuxtLink class="transition-all hover:text-orange-200 mx-16" to="/registry">registry</NuxtLink>
                <NuxtLink class="transition-all hover:text-orange-200" to="/rsvp">r.s.v.p.</NuxtLink>
            </div>
            <div ref="menuIcon" id="menu-icon" @click="toggleMenu"
                class="absolute top-1/2 right-4 -translate-y-1/2 lg:hidden">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div ref="menuLinks"
            class="fixed top-0 left-0 w-full h-full lg:h-18 bg-white/[.95] lg:bg-transparent lg:hidden text-center grid grid-cols-1 content-center justify-items-center z-nav-overlay gap-16 lg:text-right font-serif italic text-5xl lg:text-3xl leading-loose select-none opacity-0 lg:opacity-100 duration-500 transition-all -translate-y-full">
            <NuxtLink class="transition-all hover:text-orange-200 md:mx-16" to="/registry">registry</NuxtLink>
            <NuxtLink class="transition-all hover:text-orange-200" to="/rsvp">r.s.v.p.</NuxtLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.z-nav {
    z-index: 11111;

    &-overlay {
        z-index: 11110;
    }
}

.show {
    opacity: 1 !important;
}

#menu-icon {
    width: 48px;
    height: 28px;
    cursor: pointer;

    span {
        display: block;
        position: absolute;
        height: 4px;
        width: 100%;
        background: black;
        // border-radius: 4px;
        opacity: 1;
        left: 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;

        &:nth-child(1) {
            top: 0px;
        }

        &:nth-child(2),
        &:nth-child(3) {
            top: 12px;
        }

        &:nth-child(4) {
            top: 24px;
        }
    }


    &.open span:nth-child(1) {
        top: 12px;
        width: 0%;
        left: 50%;
    }

    &.open span:nth-child(2) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    &.open span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    &.open span:nth-child(4) {
        top: 12px;
        width: 0%;
        left: 50%;
    }
}
</style>