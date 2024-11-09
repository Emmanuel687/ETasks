<script setup>

const props = defineProps({
  taskStatus:{
    type:String,
  }
})

</script>

<template>
  <div>
    <p class=" flex items-center gap-3 justify-center text-black my-6">
      <span class="pi pi-info-circle text-xl text-[#0A94FF]"></span> No {{ props.taskStatus }} Tasks found
    </p>

  </div>
</template>