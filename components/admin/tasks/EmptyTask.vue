<template>
  <!-- No Task Card Start -->
  <div class="flex flex-col items-center justify-center h-[760px]  rounded-lg shadow-inner">
    <!-- Task SVG Start -->
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checklist" width="88" height="88"
      viewBox="0 0 24 24" stroke-width="1.5" stroke="#183fe2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
      <path d="M14 19l2 2l4 -4" />
      <path d="M9 8h4" />
      <path d="M9 12h2" />
    </svg>
    <!-- Task SVG End -->
    <p v-if="props.selectedTaskStatus === 'open'" className="text-xl font-semibold text-gray-600">No Open Tasks</p>
    <p v-if="props.selectedTaskStatus === 'submitted-for-approval'" className="text-xl font-semibold text-gray-600">No
      Tasks Submitted for Approval</p>
    <p v-if="props.selectedTaskStatus === 'closed'" className="text-xl font-semibold text-gray-600"> No Closed Tasks</p>

    <p v-else className="text-gray-500 mt-2"> Task Not Found</p>
  </div>
  <!-- No Task Card Start -->
</template>

<script setup>
// Receive Props Start
const props = defineProps({
  selectedTaskStatus: {
    type: String,
  }
})
// Receive Props End

</script>