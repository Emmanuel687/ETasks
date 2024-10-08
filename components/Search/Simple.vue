<template>
  <div class="bg-white border border-[#CED6E3] rounded-lg flex items-center gap-x-1" :class="`w-[${props.width}]`">
    <i class="pi pi-search text-[#8D98A9] text-base ml-3"></i>
    <input class="bg-transparent w-full outline-none text-sm p-2 text-[#333333]" v-model="value"
      :placeholder="placeholder" />
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: {
    default: "Search",
    type: String,
  },
  width: {
    default: "300px",
    type: String,
  },
});

const value = defineModel();
</script>
