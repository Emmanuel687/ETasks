<template>
  <div>
    <div>
      <h1 class="font-[600] text-[18px] text-[#161718]">
        {{ totalPayrolls }} Task
      </h1>
    </div>

    <!-- Gauge Start -->
    <div class="flex justify-center items-center mt-[20px] w-full h-full">
      <div class="relative h-[290px]">
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
    </div>
    <!-- Gauge End -->

    <div class="flex gap-8 px-8">
      <div>
        <p class="font-[500] text-[14px] text-[#8D98A9] font-500">Total</p>
        <p>100%</p>
      </div>

      <div>
        <p class="font-[500] text-[14px] text-[#8D98A9] font-500">Completed</p>
        <p>
          {{ ((closedPayrolls / totalPayrolls) * 100).toFixed(2) }}%
        </p>
      </div>

      <div>
        <p class="font-[500] text-[14px] text-[#8D98A9] font-500">Pending</p>
        <p>
          {{ ((pendingPayrolls / totalPayrolls) * 100).toFixed(2) }}%
        </p>
      </div>
    </div>
  </div>
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