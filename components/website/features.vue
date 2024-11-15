<script setup>
// Imports Start
import ChartSVG from "/public/assets/svgs/Icons/chart.svg"
import CalendarSVG from "/public/assets/svgs/Icons/calendar.svg"
import SettingsSVG from "/public/assets/svgs/Icons/settings.svg"
import TaskSVG from "/public/assets/svgs/Icons/task.svg"
// Imports End

// Reactive Variables Start
const featuresList = ref([
  {
    img: TaskSVG,
    title: "Create  and manage tasks",
    description: "Effortlessly create and manage tasks with our intuitive system. Quickly capture and prioritize to-dos, from simple reminders to complex projects. Our smart interface adapts to your unique workflow.",
  },
  {
    img: ChartSVG,
    title: "Analyze your tasks",
    description: "Turn data into action with our powerful analytics. Uncover productivity trends, optimize your workflow, and make informed decisions that boost your efficiency.",
  },
  {
    img: CalendarSVG,
    title: "View your Tasks Deadline",
    description: "Visualize your schedule like never before. Our dynamic calendar puts you in control, making rescheduling as simple as drag and drop. Time management, simplified.",
  },
  {
    img: SettingsSVG,
    title: "Customize Your Task Experience",
    description: "Make this task manager truly yours. With our built-in configurator, personalize every aspect of your experience, from notifications to integrations. Your workflow, your way.",
  }
])
// Reactive Variables End
</script>

<template>
  <!-- Features Section Start -->
  <div class="mx-auto max-w-[80%] text-left mt-24 flex flex-col  space-y-8">
    <!-- Features Text Start -->
    <h1 class="text-[30px]">Streamline Your Workflow, Your Productivity

    </h1>
    <p class="!text-[16px] text-[#595759]">
      We consider all the drivers of change gives you the blocks & components <br /> you need to change to create a
      truly
      professional website.
    </p>
    <!-- Features End  -->

    <!-- Features List Start -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="(feature, index) in featuresList" :key="index"
          class="flex flex-col text-left p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">

          <!-- SVG Section Start -->
          <div class="flex justify-center items-center h-24 mb-4">
            <img :src="feature.img" :alt="`${feature.title} illustration`" class="w-16 h-16 object-contain">
          </div>
          <!-- SVG Section End -->

          <!-- Feature Title Start -->
          <h2 class="text-xl font-bold mb-2 text-gray-800 leading-tight tracking-tight">{{ feature.title }}</h2>
          <!-- Feature Title End -->

          <!-- Feature Description Start -->
          <p class="text-base text-gray-600 leading-relaxed">{{ feature.description }}</p>
          <!-- Feature Description End -->

        </div>
      </div>
    </div>

    <!-- Features List End -->

  </div>
  <!--  Features Section End -->
</template>


<style>
.hero-img {
  height: 440px;
  width: 1140px;
}
</style>