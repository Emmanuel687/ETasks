<template>
  <section class="border rounded-md p-4 h-[450px] flex flex-col">
    <div class="flex justify-between items-center mb-4 bottom-1 border-b border-gray-200">
      <h1 class="font-semibold text-lg text-indigo-700">
        {{ totalTasks }} Tasks
      </h1>

    </div>

    <!-- Gauge Start -->
    <section class="flex justify-center items-center mt-4 w-full h-[290px]">
      <div class="relative w-full h-full">
        <svg class="w-full h-full" viewBox="0 0 200 100">
          <!-- Background arc -->
          <path d="M20 90 A 80 80 0 0 1 180 90" fill="none" stroke="#e5e7eb" stroke-width="10" />

          <!-- Colored sections (progress arcs) -->
          <path :d="getArcPath(-90, ((completedPercentage / 100) * 180) - 90)" fill="none"
            stroke="url(#blueGradient)" stroke-width="10" />

          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#60A5FA" /> <!-- blue-400 -->
              <stop offset="100%" style="stop-color:#6366F1" /> <!-- indigo-500 -->
            </linearGradient>
          </defs>

          <path :d="getArcPath(((completedPercentage / 100) * 180) - 90, ((completedPercentage + inProgressPercentage) / 100) * 180 - 90)" fill="none" stroke="url(#orangeGradient)"
            stroke-width="10" />

          <defs>
            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#FBBF24" /> <!-- yellow-400 -->
              <stop offset="100%" style="stop-color:#F59E0B" /> <!-- orange-500 -->
            </linearGradient>
          </defs>

          <!-- Percentage text -->
          <text x="100" y="85" text-anchor="middle" class="text-[20px] font-bold">
            {{ totalPercentage }}%
          </text>
        </svg>
      </div>
    </section>
    <!-- Gauge End -->

    <div class="flex justify-around mt-[-20px]">
      <div class="text-center">
        <p class="font-medium text-sm text-[#8D98A9]">Total Tasks</p>
        <p class="font-bold">{{ totalPercentage }}%</p>
      </div>

      <div class="text-center">
        <p class="font-medium text-sm text-[#8D98A9]">In-Progress Tasks</p>
        <p class="font-bold">{{ inProgressPercentage.toFixed(2) }}%</p>
      </div>

      <div class="text-center">
        <p class="font-medium text-sm text-[#8D98A9]">Completed Tasks</p>
        <p class="font-bold">{{ completedPercentage.toFixed(2) }}%</p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Imports Start
import { useUserStore } from '@/stores/user'
// Imports End

// Store Start
const appStore = useUserStore()
// Store End

// Computed Properties
const totalTasks = computed(() => appStore.tasks.length)

const completedPercentage = computed(() => {
  return totalTasks.value > 0
    ? (appStore.completedTasks.length / totalTasks.value) * 100
    : 0
})

const inProgressPercentage = computed(() => {
  return totalTasks.value > 0
    ? (appStore.inProgressTasks.length / totalTasks.value) * 100
    : 0
})

const pendingPercentage = computed(() => {
  return totalTasks.value > 0
    ? (appStore.pendingTasks.length / totalTasks.value) * 100
    : 0
})

const totalPercentage = computed(() => completedPercentage.value.toFixed(2))

// Arc Path Functions
function getArcPath(startAngle, endAngle) {
  const start = polarToCartesian(100, 90, 80, -startAngle)
  const end = polarToCartesian(100, 90, 80, -endAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
  return [
    "M", start.x, start.y,
    "A", 80, 80, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ")
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  }
}
</script>
