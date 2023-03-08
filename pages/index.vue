<script setup lang="ts">
onMounted(() => {
    // Typeform sets `overflow: hidden` on `body` when a form is mounted, and that style is retained when moving to another page.
    // This fixes that problem by removing the style.
    const body = document.querySelector("body");
    if (body) {
        body.style.cssText = "";
    }
});
</script>

<template>
    <div>
        <Hero />
        <OurStory />
        <Venue />
        <Schedule />
        <RSVPCallToAction />
        <Footer />
    </div>
</template>