<template>
  <div class="overflow-hidden">
    <h2 id="our_story" class="font-serif font-medium text-5xl text-center leading-loose scroll-mt-18">Our Story</h2>
    <div class="grid grid-cols-8 gap-2 mx-4 lg:mx-40">

    <div class="col-span-8 font-serif text-right font-bold text-8xl lg:text-[15rem] text-orange-50 z-0 h-12 lg:h-48 select-none">
      2017</div>

      <div class="lg:col-span-3 col-span-4
                  translate-y-1/2 -translate-x-1/2 opacity-0
                  transition-all duration-story" v-animate-onscroll="'transform-none show'">
        <img src="~/assets/images/story_1.png" />
      </div>
      <div class="lg:col-span-5 col-span-4
                  translate-y-1/2 translate-x-1/2 opacity-0
                  transition-all duration-story"
            v-animate-onscroll="'translate-y-8 lg:translate-y-1/3 translate-x-0 show'">
        <span class="block lg:mb-4 font-bold text-slate-300">Kimberly-Clark</span>
        <span>The story begins: two interns sitting back to back.</span>
      </div>

      <div class="col-start-3 lg:col-span-4 col-span-6 lg:col-start-3
                  translate-y-1/2 -translate-x-1/2 opacity-0
                  transition-all duration-story"
            v-animate-onscroll="'-translate-y-12 lg:-translate-y-36 translate-x-0 show'">
        <img src="~/assets/images/story_2.jpg" />
        <div class="lg:hidden">
          <span class="inline-block mr-4 lg:mr-16 font-bold text-slate-300">UW Madison</span> <span>A day trip with friends and food, complete with the big terrace chair!</span>
        </div>
      </div>
      <div class="col-span-2 hidden lg:block
                  translate-y-1/2 translate-x-1/2 opacity-0
                  transition-all duration-story" v-animate-onscroll="'transform-none show'">
        <span class="inline-block mr-16 font-bold text-slate-300">UW Madison</span>
        <br /><br />
        <span>A day trip with friends and food, complete with the big terrace chair!</span>
      </div>

      <div class="h-12 lg:h-24 col-span-8 font-serif text-left font-bold text-8xl lg:text-[15rem] text-orange-50 -translate-y-1/2 lg:-translate-y-3/4 z-0 select-none">
        2019
      </div>

      <div class="col-start-2 col-span-7 z-10 leading-normal lg:leading-loose
                  translate-y-1/2 translate-x-1/2 opacity-0
                  transition-all duration-story"
          v-animate-onscroll="'transform-none show'">
        <img src="~/assets/images/story_3.jpg" />
        <span class="inline-block mr-4 lg:mr-16 font-bold text-slate-300">Hawaii</span> <span>Soaking in the sun and waves.</span>
      </div>

      <div class="col-span-8 h-16 lg:h-48 font-serif text-right font-bold text-8xl lg:text-[15rem] text-orange-50 lg:-translate-y-1/4 z-0 select-none">
        2021
      </div>

      <div class="col-span-8 lg:col-span-7 z-10 leading-normal lg:leading-loose
                  translate-y-1/2 -translate-x-1/2 opacity-0
                  transition-all duration-story"
            v-animate-onscroll="'transform-none show'">
        <img src="~/assets/images/story_4.jpg" />
        <span class="inline-block mr-4 lg:mr-16 font-bold text-slate-300">Iceland</span> <span>A dramatic proposal in an epic landscape.</span>
      </div>

      <div class="lg:col-start-6 lg:col-span-3 col-span-4 col-start-4
                  z-20 leading-normal lg:leading-loose
                  translate-y-1/2 translate-x-1/2 opacity-0
                  transition-all duration-story"
            v-animate-onscroll="'translate-y-0 lg:-translate-y-1/4 translate-x-0 show'">
        <!-- v-animate-onscroll="'shift-up-1/4 show'"> -->
        <img src="~/assets/images/story_5.jpg" />
        <span class="inline-block mr-4 lg:mr-16 font-bold text-slate-300">October 25, 2021</span> <span>She said yes!</span>
      </div>

      <div class="col-span-8 h-16 lg:h-48 font-serif text-left font-bold text-8xl lg:text-[15rem] text-orange-50 lg:-translate-y-1/4 z-0 select-none">
        2022
      </div>

      <div class="lg:col-start-2 lg:col-span-4 z-10 col-span-6 col-start-3
                  translate-y-1/2 -translate-x-1/2 opacity-0
                  transition-all duration-story"
            v-animate-onscroll="'transform-none show'">
        <img class="w-full" src="~/assets/images/story_6.jpg" />
        <div class="lg:hidden">
          <span class="inline-block mr-4 lg:mr-16 font-bold text-slate-300">Long Island</span> <span>Introducing a new member to our family.</span>
        </div>
      </div>
      <div class="lg:col-span-3 hidden lg:block
                  translate-y-1/2 translate-x-1/2 opacity-0
                  transition-all duration-story"
            v-animate-onscroll="'transform-none show'">
        <span class="inline-block mr-16 font-bold text-slate-300">Long Island</span>
        <br /><br />
        <span>Introducing a new member to our family.</span>
      </div>

      <div class="col-span-7 h-16 lg:h-48 font-serif text-right font-bold text-8xl lg:text-[15rem] text-orange-50 lg:-translate-y-1/4 z-0 select-none">
        2023
      </div>

      <div class="col-span-8 z-10 leading-normal lg:leading-loose
                  translate-y-1/2 -translate-x-1/2 opacity-0
                  transition-all duration-story"
                   v-animate-onscroll="'transform-none show'">
        <img src="~/assets/images/story_7.jpg" />
        <span class="inline-block mr-4 lg:mr-16 font-bold text-slate-300">New York</span> <span>We're getting married!</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$distance: 50%;

.offset-down-right {
  transform: translate3d(-$distance, $distance, 0);
  opacity: 0;
}

.offset-down-left {
  transform: translate3d($distance, $distance, 0);
  opacity: 0;
}

.show {
  opacity: 1 !important;
}

.shift-none {
  transform: translate3d(0, 0, 0);
}

.shift-up-1\/4 {
  transform: translate3d(0, -25%, 0);
}

.duration-story {
  transition-duration: 1500ms;
}
</style>