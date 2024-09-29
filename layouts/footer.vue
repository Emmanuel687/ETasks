<script setup>
import Twitter from "public/assets/svgs/Icons/twitter.svg";
import Facebook from "public/assets/svgs/Icons/facebook.svg";
import Instagram from "public/assets/svgs/Icons/instagram.svg";
import LinkedIn from "public/assets/svgs/Icons/linkedin.svg";

const date = new Date();
const year = date.getFullYear();
const services = [
  { serviceName: "Assestments", route: "/services/assestment" },
  { serviceName: "Planning", route: "/services/planning" },
  { serviceName: "Design", route: "/services/design" },
  { serviceName: "Support", route: "/services/support" },
  { serviceName: "Training", route: "/services/training" },
];

const industries = [
  {
    industryName: "Education Industrys",
    route: "/consultingbyindustry/educationindustry",
  },
  {
    industryName: "Health Care",
    route: "/consultingbyindustry/healthcare",
  },
  {
    industryName: "Corporate",
    route: "/consultingbyindustry/corporate",
  },
  {
    industryName: "Banking Industry",
    route: "/consultingbyindustry/bankingindustry",
  },
  {
    industryName: "Retail Industry",
    route: "/consultingbyindustry/retail",
  },
  {
    industryName: "Cyber Security & ForensicsInvestigations",
    route: "/consultingbyindustry/cybersecurityForensicsInvestigation",
  },
  {
    industryName: "Media Safety & Protection",
    route: "/consultingbyindustry/mediasafetyProtection",
  },
  {
    industryName: "MSMEs Security Consulting",
    route: "/consultingbyindustry/msmesSecurityConsulting",
  },
  {
    industryName: "NGO & Humanitarian",
    route: "/consultingbyindustry/ngoHumanitarian",
  },
];

const contactDetails = [
  "Phone Number",
  "+254797849494",
  "Email Address",
  "info@webriskconsultants.co.ke",
  "Location",
  "Industrial Area Road, Thika",
];
</script>

<template>
  <!-- Footer Section Start -->
  <div class="background-primary pt-[60px] lg:pt-[90px] pl-[20px] pr-[20px] pb-[30px]">
    <div class="max-w-[90%] md:max-w-[90%] mx-auto">
      <div class="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <!-- Talk to Us Start -->
        <div class="text-center  md:text-start lg:text-start">
          <button class="bg-[#131313] pl-8 pr-8 pt-2 pb-2 text-[#ffff] text-[16px] leading-[19.4px]">
            <a href="https://wa.me/+254790064309" target="_blank">
              Talk to Us
            </a>
          </button>
        </div>
        <!-- Talk to Us End -->

        <!-- Our Services Start -->
        <div class="text-left sm:text-start  md:text-start lg:text-start lg:mt-0 md:mt-0 sm:mt-0 mt-[40px]">
          <h1 class="font-[700] text-[16px] leading-[19.49px]">Our Services</h1>
          <div class="mt-[15px] sm:mt-0 lg:mt-0 xl:mt-0 md:mt-0">
            <div v-for="(service, index) in services" :key="index" class="mt-2">
              <NuxtLink :to="service.route" class="text-[15px] text-[#131313 font-[400] leading-[20.83px] mt-3">
                {{ service.serviceName }}
              </NuxtLink>
            </div>
          </div>

        </div>
        <!-- Our Services Start -->

        <!-- Consulting By Industry Start -->
        <div class="text-left sm:text-start  md:text-start lg:text-start lg:mt-0 md:mt-0 sm:mt-0 mt-[40px]">
          <h1 class="font-[700] text-[16px] leading-[19.49px]">
            Consulting By Industry
          </h1>
          <div class="mt-[15px] sm:mt-0 lg:mt-0 xl:mt-0 md:mt-0">
            <div v-for="(industry, index) in industries" :key="index" class="mt-2">
              <NuxtLink :to="industry.route" class="text-[15px] text-[#131313] font-[400] leading-[20.83px]">
                {{ industry.industryName }}
              </NuxtLink>
            </div>
          </div>

        </div>
        <!-- Consulting By Industry End -->

        <!-- Contact  Start -->
        <div class="text-left sm:text-start  md:text-start lg:text-start lg:mt-0 md:mt-0 sm:mt-0 mt-[40px]">
          <h1 class="font-[700] text-[16px] leading-[19.49px]">Contact</h1>
          <div class="mt-[15px] sm:mt-0 lg:mt-0 xl:mt-0 md:mt-0">
            <div v-for="(contactDetail, index) in contactDetails" :key="index" class="mt-2">
              <p class="text-[15px] text-[#131313] font-[400] leading-[20.83px]">
                {{ contactDetail }}
              </p>
            </div>
          </div>
        </div>
        <!-- Contact End -->
      </div>

      <div class="mt-[80px]">
        <!-- Social Media Logos Start -->
        <div class="flex justify-center mt-3">
          <div class="flex space-x-10">
            <div>
              <a href="">
                <img :src="Twitter" alt="Twitter Logo" />
              </a>
            </div>
            <div>
              <a href="">
                <img :src="Facebook" alt="Facebook Logo" />
              </a>
            </div>
            <div>
              <a href="">
                <img :src="Instagram" alt="Instagram Logo" />
              </a>
            </div>
            <div>
              <a href="">
                <img :src="LinkedIn" alt="LinkedIn Logo" />
              </a>
            </div>
          </div>
        </div>
        <!-- Social Media Logos End -->

        <!-- Terms & Conditions Start-->
        <div class="text-center text-[14px] font-[400] leading-[18.23px] mt-[14px]">
          <p>©  Web Risk Consultants. All rights reserved {{ year }}.</p>
        </div>
        <!-- Terms & Conditions End -->
      </div>
    </div>
  </div>
  <slot />
  <!-- Footer Section End -->
</template>

<style scoped></style>