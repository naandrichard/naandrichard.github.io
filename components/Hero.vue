<script setup>
import IntersectionObserver from './IntersectionObserver.vue';

const hero = ref(null);
const logotypeContainer = ref(null);
const logotype = ref(null);
const topNav = ref(null);
const sideNav = ref(null);

function toggleHeroFull(isFull /* Boolean */) {
    if (hero == null) {
        return;
    }

    const classes = new Set(hero.value.className.split(' '));

    if (isFull) {
        classes.delete('mx-20');
        classes.delete('mt-40');
    }
    else {
        classes.add('mx-20');
        classes.add('mt-40');
    }

    const newClasses = [...classes].join(' ');
    hero.value.className = newClasses;
}

function toggleLogotypeFull(isFull /* Boolean */) {
    if (logotype == null || logotypeContainer == null) {
        return;
    }

    const logotypeClasses = new Set(logotype.value.className.split(' '));
    const logotypeContainerClasses = new Set(logotypeContainer.value.className.split(' '));

    if (isFull) {
        logotypeClasses.add('-translate-x-1/2');
        logotypeClasses.add('text-white');
        logotypeClasses.delete('text-black');
        logotypeClasses.delete('text-5xl');
        logotypeClasses.add('text-10rem');
        logotypeContainerClasses.add('translate-x-1/2');
        logotypeContainerClasses.add('my-40');
        logotypeContainerClasses.delete('px-20');
        logotypeContainerClasses.delete('w-1/2');
        logotypeContainerClasses.add('w-full');
    }
    else {
        logotypeClasses.delete('-translate-x-1/2');
        logotypeClasses.delete('text-white');
        logotypeClasses.add('text-black');
        logotypeClasses.add('text-5xl');
        logotypeClasses.delete('text-10rem');
        logotypeContainerClasses.delete('translate-x-1/2');
        logotypeContainerClasses.delete('my-40');
        logotypeContainerClasses.add('px-20');
        logotypeContainerClasses.add('w-1/2');
        logotypeContainerClasses.delete('w-full');
    }

    console.log(logotypeClasses)

    const newLogotypeClasses = [...logotypeClasses].join(' ');
    logotype.value.className = newLogotypeClasses;

    const newLogotypeContainerClasses = [...logotypeContainerClasses].join(' ');
    logotypeContainer.value.className = newLogotypeContainerClasses;
}

function toggleNavVisibility(isVisible /* Boolean */) {
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

function handleScrollEvent(intersectionState) {
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
    }

}
</script>

<template>
    <div class="">
        <div ref="topNav"
            class="fixed top-0 left-0 h-18 w-full bg-white px-20 box-border text-right font-serif italic text-3xl z-40 leading-loose transition-all duration-1000 -translate-y-full opacity-0 select-none">
            <a class="transition-all hover:text-orange-200 mx-16" href="#">registry</a>
            <a class="transition-all hover:text-orange-200" href="#">r.s.v.p.</a>
        </div>
        <div ref="sideNav" class="fixed top-0 left-0 h-screen w-20 text-center vertical-text select-none transition-all duration-1000
            text-2xl leading-[5rem] -translate-x-full opacity-0">
            <a href="#our_story" class="inline-block rotate-180 my-5">our story</a>
            <a href="#venue" class="inline-block rotate-180 my-5">venue</a>
            <a href="#schedule" class="inline-block rotate-180 my-5">schedule</a>
        </div>
        <div ref="logotypeContainer"
            class="fixed top-0 left-0 translate-x-1/2 my-40 w-full transition-all duration-500 ease-linear z-50">
            <span ref="logotype"
                class="font-serif leading-normal text-10rem text-white font-medium select-none inline-block -translate-x-1/2 transition-all duration-500 ease-linear">
                Na & Richard
            </span>
        </div>
        <div ref="hero" class="h-screen m-0 transition-all duration-1000 hero-bg mb-20">
            <!-- <div ref="hero_text"
                class="font-serif text-10rem text-center text-white font-medium py-40 transition-opacity">
                Na & Richard
            </div> -->
            <!-- <img class="h-full" src="~/assets/images/hero.jpg" /> -->
        </div>
    </div>
    <div class="mt-px absolute top-full">
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
</style>