<script setup>
</script>

<template>
  <!-- Hero Section Start -->
  <div class="mx-auto max-w-[80%] text-center mt-24 flex flex-col items-center space-y-8">

    <!-- Hero Text Start -->
    <h1 class="text-[48px]">Task Management Made Easy
    </h1>
    <p class="!text-[20px] text-[#595759]">
  Streamline your productivity and conquer your task to-do list with our intuitive task
  <br /> manager, designed to help you work smarter, not harder.
</p>

    <!-- Hero End End -->

    <!-- Get STarted BTN Start -->
    <div class="flex justify-center items-center">
      <NuxtLink to="/login"
        class="bg-[#000000] !text-[16px] p-[16px] text-[#ffff] rounded-[8px] flex items-center font-[500]">
        <span> Get Started Now
        </span>
        <img src="/assets/svgs/Icons/arrowup.svg" />
      </NuxtLink>
    </div>
    <!-- Get STarted BTN End -->

    <div class="hero-container">
      <img src="/assets/HeroImg.png" alt="Hero Image" class="hero-img" />
    </div>

  </div>


  <WebsiteFeatures />
  <!-- Hero Section End -->
</template>


<style lang="scss">
.hero-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .hero-img {
    object-fit: contain;
    width: 100%;
    max-width: 1000px;
    max-height: 400px;
    height: auto;
    display: block;
    margin: 0 auto;

    @media (max-width: 768px) {
      max-width: 100%;
      max-height: 300px;
    }
  }
}

</style>