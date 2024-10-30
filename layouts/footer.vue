<script setup>
// Imports Start
import Twitter from "public/assets/svgs/Icons/twitter.svg";
import Facebook from "public/assets/svgs/Icons/facebook.svg";
import Instagram from "public/assets/svgs/Icons/instagram.svg";
import LinkedIn from "public/assets/svgs/Icons/linkedin.svg";
// Imports End

// Reactive Variables Start
const pages = ref([
  { pageName: "Overview", route: "/" },
  { pageName: "Features", route: "/features" },
  { pageName: "Faq", route: "/faq" },
  { pageName: "Contact Us", route: "/contact" },
])
const contactDetails = ref([
  "Phone Number",
  "+254797849494",
  "Email Address",
  "info@etasks.co.ke",
])
const socials = ref([Twitter, Facebook, Instagram, LinkedIn]);
// Reactive Variables Start

// Normal Variables Start
const date = new Date();
const year = date.getFullYear();
// Normal Variables Start
</script>

<template>
  <!-- Footer Section Start -->
  <section class="bg-[#f9f9fa] py-12 lg:py-16">
    <div class="mx-auto w-[90%] mr-[12px]">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Brand Section -->
        <div class="flex flex-col space-y-4">
          <div class="flex items-center space-x-3">
            <img src="/public/assets/svgs/Icons/footer.png" alt="logo" class="w-[60px] h-auto" />
            <span class="text-lg font-semibold">ETasks Manager</span>
          </div>
          <p class="text-sm font-medium max-w-[280px]">
            Join millions of people who organize work and life with Etasks.
          </p>
        </div>

        <!-- Pages Section -->
        <div class="flex flex-col space-y-4  lg:ml-[25px] xl:ml-[25px]">
          <h2 class="text-base font-bold ">Pages</h2>
          <div class="flex flex-col space-y-2">
            <NuxtLink v-for="(page, index) in pages" :key="index" :to="page.route"
              class="text-sm text-gray-800 hover:text-indigo-600 transition-colors">
              {{ page.pageName }}
            </NuxtLink>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="flex flex-col space-y-4">
          <h2 class="text-base font-bold">Contact</h2>
          <div class="flex flex-col space-y-2">
            <p v-for="(contact, index) in contactDetails" :key="index" class="text-sm text-gray-800">
              {{ contact }}
            </p>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="flex justify-start mt-4">
          <NuxtLink to="/signup"
            class="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-indigo-600 border border-transparent transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:bg-indigo-800 h-[50px]">
            Start For Free
            <!-- Optional: Add icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </NuxtLink>
        </div>
      </div>


    </div>
    <!-- Footer Bottom -->
    <div class="mt-16 pt-8 border-t border-gray-200">
      <!-- Social Links -->
      <div class="flex justify-center space-x-8">
        <img v-for="(social) in socials" :key="name" :src="social" class="hover:opacity-80 transition-opacity">

      </div>

      <!-- Copyright -->
      <p class="text-center text-sm text-gray-600 mt-6">
        © ETasks. All rights reserved {{ year }}.
      </p>
    </div>
  </section>
  <slot />
  <!-- Footer Section End -->
</template>

<style scoped></style>