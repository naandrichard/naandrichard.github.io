<script setup lang="ts">
import { Ref } from 'vue';
import IntersectionObserver from './IntersectionObserver.vue';

const hero = ref(null) as unknown as Ref<HTMLElement>;
const logotypeContainer = ref(null) as unknown as Ref<HTMLElement>;
const logotype = ref(null) as unknown as Ref<HTMLElement>;
const topNav = ref(null) as unknown as Ref<HTMLElement>;
const sideNav = ref(null) as unknown as Ref<HTMLElement>;

const menuIcon = ref(null) as unknown as Ref<HTMLElement>;
const menuLinks = ref(null) as unknown as Ref<HTMLElement>;

function toggleHeroFull(isFull: boolean) {
    if (hero == null) {
        return;
    }

    const toggleClasses = [
        "mx-4",
        "lg:mx-20",
        "mt-40",
    ];

    const classes = new Set(hero.value.className.split(' '));

    if (isFull) {
        toggleClasses.forEach(c => classes.delete(c));
    }
    else {
        toggleClasses.forEach(c => classes.add(c));
    }

    const newClasses = [...classes].join(' ');
    hero.value.className = newClasses;
}

function toggleLogotypeFull(isFull: boolean) {
    if (logotype == null || logotypeContainer == null) {
        return;
    }

    // classes to add when hero is full
    const fullLogotypeClasses = new Set([
        "text-white",
        "text-7xl",
        "lg:text-[10rem]",
        "leading-[.75]",
        "lg:leading-normal",
        "lg:-translate-x-1/2",
    ]);
    const fullLogotypeContainerClasses = new Set([
        "w-full",
        "my-40",
        "lg:translate-x-1/2",
        "pl-4",
        "lg:p-0",
    ]);

    // classes to add when hero is not full
    const normalLogotypeClasses = new Set([
        "text-black",
        "text-4xl",
        "lg:text-5xl",
        "leading-[4.5rem]",
    ])
    const normalLogotypeContainerClasses = new Set([
        "ml-4",
        "lg:ml-20",
        "w-auto",
        "lg:w-1/2",
    ])

    const logotypeClasses = new Set(logotype.value.className.split(' '));
    const logotypeContainerClasses = new Set(logotypeContainer.value.className.split(' '));

    if (isFull) {
        fullLogotypeClasses.forEach(c => logotypeClasses.add(c));
        fullLogotypeContainerClasses.forEach(c => logotypeContainerClasses.add(c));

        normalLogotypeClasses.forEach(c => logotypeClasses.delete(c));
        normalLogotypeContainerClasses.forEach(c => logotypeContainerClasses.delete(c));
    }
    else {
        fullLogotypeClasses.forEach(c => logotypeClasses.delete(c));
        fullLogotypeContainerClasses.forEach(c => logotypeContainerClasses.delete(c));

        normalLogotypeClasses.forEach(c => logotypeClasses.add(c));
        normalLogotypeContainerClasses.forEach(c => logotypeContainerClasses.add(c));
    }

    console.log(logotypeClasses)

    const newLogotypeClasses = [...logotypeClasses].join(' ');
    logotype.value.className = newLogotypeClasses;

    const newLogotypeContainerClasses = [...logotypeContainerClasses].join(' ');
    logotypeContainer.value.className = newLogotypeContainerClasses;
}

function toggleNavVisibility(isVisible: boolean) {
    if (topNav == null || sideNav == null) {
        return;
    }

    const topNavClasses = new Set(topNav.value.className.split(' '));
    const sideNavClasses = new Set(sideNav.value.className.split(' '));

    if (isVisible) {
        topNavClasses.delete('-translate-y-full');
        topNavClasses.add('show');
        sideNavClasses.delete('-translate-x-full');
        sideNavClasses.add('show');
    }
    else {
        topNavClasses.add('-translate-y-full');
        topNavClasses.delete('show');
        sideNavClasses.add('-translate-x-full');
        sideNavClasses.delete('show');
    }

    console.log(topNavClasses)

    const newTopNavClasses = [...topNavClasses].join(' ');
    topNav.value.className = newTopNavClasses;

    console.log(topNav.value.className);

    const newSideNavClasses = [...sideNavClasses].join(' ');
    sideNav.value.className = newSideNavClasses;

    console.log(sideNav.value.className);
}

function handleScrollEvent(intersectionState: any) {
    const hasScrolled = intersectionState.inViewport;
    const atTop = intersectionState.isBelow;
    console.log(`handleScrollEvent() called with inViewport: ${hasScrolled} and isBelow: ${atTop}`);

    if (hasScrolled) {
        toggleHeroFull(false);
        toggleLogotypeFull(false);
        toggleNavVisibility(true);
    } else if (atTop) {
        toggleHeroFull(true);
        toggleLogotypeFull(true);
        toggleNavVisibility(false);

        // closes the menu if open (mobile only)
        if ((new Set(menuIcon.value.className.split(" "))).has("open")) {
            toggleMenu(new MouseEvent(""));
        }
    }
}

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
</script>

<template>
    <div class="">
        <div ref="topNav"
            class="fixed top-0 left-0 h-18 w-full bg-white px-20 box-border text-right font-serif italic text-3xl z-40 leading-loose transition-all duration-1000 -translate-y-full opacity-0 select-none">
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
            class="fixed top-0 left-0 w-full h-full bg-white/[.95] lg:bg-transparent lg:hidden text-center grid grid-cols-1 content-center justify-items-center z-30 gap-4 font-serif italic text-5xl leading-loose select-none opacity-0 duration-500 transition-all -translate-y-full">
            <NuxtLink class="transition-all hover:text-orange-200 md:mx-16" to="/registry">registry</NuxtLink>
            <NuxtLink class="transition-all hover:text-orange-200" to="/rsvp">r.s.v.p.</NuxtLink>
            <div class="w-full px-32 font-sans text-xl text-slate-400">
                <hr class="w-full h-px mt-4 mb-4">
                on this page
            </div>
            <a href="#our_story" @click="toggleMenu"
                class="inline-block transition-color hover:text-orange-200 font-sans text-3xl not-italic">our
                story</a>
            <a href="#venue" @click="toggleMenu"
                class="inline-block transition-color hover:text-orange-200 font-sans text-3xl not-italic">venue</a>
            <a href="#schedule" @click="toggleMenu"
                class="inline-block transition-color hover:text-orange-200 font-sans text-3xl not-italic">schedule</a>
        </div>

        <div ref="sideNav"
            class="fixed top-0 left-0 h-screen w-20 text-center vertical-text select-none transition-all duration-1000 text-2xl leading-[5rem] -translate-x-full opacity-0 hidden lg:block">
            <a href="#our_story" class="inline-block rotate-180 my-5 transition-color hover:text-orange-200">our
                story</a>
            <a href="#venue" class="inline-block rotate-180 my-5 transition-color hover:text-orange-200">venue</a>
            <a href="#schedule" class="inline-block rotate-180 my-5 transition-color hover:text-orange-200">schedule</a>
        </div>
        <div ref="logotypeContainer"
            class="fixed top-0 left-0 lg:translate-x-1/2 my-40 w-full transition-all duration-500 ease-linear z-50 pl-4 lg:p-0">
            <span ref="logotype" id="logotype"
                class="font-serif leading-[.75] lg:leading-normal text-7xl lg:text-[10rem] text-white font-medium select-none inline-block lg:-translate-x-1/2 transition-all duration-500 ease-linear w-full lg:w-auto break-normal">
                Na & Richard
            </span>
        </div>
        <div ref="hero" class="h-screen m-0 transition-all duration-1000 hero-bg mb-20"></div>
    </div>
    <div class="mt-px absolute top-full left-1/2">
        <IntersectionObserver sentinel-name="foobar" @on-intersection="handleScrollEvent" />
    </div>
</template>

<style lang="scss" scoped>
.hero {

    &-bg {
        background: no-repeat center/cover url('~/assets/images/hero.jpg');
    }

    //   font-family: Literata, serif;
    font-weight: 500;
    font-size: 10rem;
    //   font-optical-sizing: 72px;
    color: white;
    text-align: center;
    padding: 10rem;
    background: no-repeat center/cover url('~/assets/images/hero.jpg');
    height: 100vh;
}

.show {
    opacity: 1 !important;
}

.vertical-text {
    writing-mode: vertical-lr;
    text-orientation: mixed;
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