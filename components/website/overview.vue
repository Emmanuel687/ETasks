
<script setup>
</script>

<template>
  <!-- Hero Section Start -->
  <div class="mx-auto max-w-[80%] text-center mt-24 flex flex-col items-center space-y-8">

    <!-- Hero Text Start -->
    <h1 class="text-[48px]">Task Management Made Easy
    </h1>
    <p class="!text-[20px] text-[#595759]">
      We consider all the drivers of change gives you the blocks & components <br /> you need to change to create a truly
      professional website.
    </p>
    <!-- Hero End End -->

    <div class="card">
      <DataTable :value="products" tableStyle="min-width: 50rem">
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
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
  <!-- Hero Section End -->
</template>


<style>
.hero-img {
  height: 440px;
  width: 1140px;
}
</style>