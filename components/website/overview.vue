
<script setup>
</script>

<template>
  <!-- Hero Section Start -->
  <div class="mx-auto max-w-[80%] text-center mt-24 flex flex-col items-center space-y-8">

    <!-- Hero Text Start -->
    <h1 class="text-[48px]">Task Management Made Easy
    </h1>
    <p class="!text-[20px] text-[#595759]">
      Streamline your productivity and conquer your to-do list with our intuitive task <br /> manager designed to help you work smarter, not harder.
    </p>
    <!-- Hero End End -->

    <!-- Get STarted BTN Start -->
    <div class="flex justify-center items-center">
      <button class="bg-[#000000] !text-[16px] p-[16px] text-[#ffff] rounded-[8px] flex items-center font-[500]">
        <span> Get Started Now
        </span>
        <img src="/assets/svgs/Icons/arrowup.svg" />
      </button>
    </div>
    <!-- Get STarted BTN End -->

    <div>
      <img src="/assets/heroImg.jpg" class="hero-img" />
    </div>
  </div>


  <WebsiteFeatures />
  <!-- Hero Section End -->
</template>


<style>
.hero-img {
  height: 440px;
  width: 1140px;
}
</style>