<template>
  <!-- TODO: make design responsive; currently styles are fixed -->
  <Hero />
  <OurStory />
  <Venue />
  <Schedule />
  <slot />
  <RSVP />
  <Footer />
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>