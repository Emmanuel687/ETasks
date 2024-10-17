<template>
  <section class="border rounded-md p-4 h-[400px] flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <h1 class="font-semibold text-lg text-[#161718]">
        {{ totalPayrolls }} Task
      </h1>
    </div>

    <!-- Gauge Start -->
    <section class="flex justify-center items-center mt-4 w-full h-[290px]">
      <div class="relative w-full h-full">
        <svg class="w-full h-full" viewBox="0 0 200 100">
          <!-- Background arc -->
          <path d="M20 90 A 80 80 0 0 1 180 90" fill="none" stroke="#e5e7eb" stroke-width="10" />
          <!-- Colored sections -->
          <path :d="getArcPath(-90, ((closedPayrolls / totalPayrolls) * 180) - 90)" fill="none" stroke="#3494ff"
            stroke-width="10" />
          <path :d="getArcPath(((closedPayrolls / totalPayrolls) * 180) - 90, 90)" fill="none" stroke="#e5e7eb"
            stroke-width="10" />

          <!-- Percentage text -->
          <text x="100" y="85" text-anchor="middle" class="text-[20px] font-bold">
            {{ ((closedPayrolls / totalPayrolls) * 100).toFixed(2) }}%
          </text>
        </svg>
      </div>
    </section>
    <!-- Gauge End -->

    <div class="flex justify-around mt-[-20px]">
      <div class="text-center">
        <p class="font-medium text-sm text-[#8D98A9]">Total</p>
        <p class="font-bold">{{ ((closedPayrolls / totalPayrolls) * 100).toFixed(2) }}%</p>
      </div>

      <div class="text-center">
        <p class="font-medium text-sm text-[#8D98A9]">Closed Task</p>
        <p class="font-bold">{{ ((closedPayrolls / totalPayrolls) * 100).toFixed(2) }}%</p>
      </div>

      <div class="text-center">
        <p class="font-medium text-sm text-[#8D98A9]">Open Tasks</p>
        <p class="font-bold">{{ ((pendingPayrolls / totalPayrolls) * 100).toFixed(2) }}%</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Dummy data
const closedPayrolls = ref(75)
const pendingPayrolls = ref(25)

const totalPayrolls = computed(() => closedPayrolls.value + pendingPayrolls.value)

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