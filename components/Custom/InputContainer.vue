<template>
  <div class="cic__input_wrap">
    <p v-if="label.length && required">{{ label }} <span class="text-red-500">*</span> </p>
    <p v-else-if="label.length && showRequiredAsterik">{{ label }} <span class="text-red-500">*</span> </p>
    <p v-if="label.length && !required && !showRequiredAsterik">{{ label }} </p>
    <slot style="width:60%">
    </slot>
  </div>
</template>
<script setup>

const props = defineProps({
  label: {
    type: String,
    default: 'This is label'
  },
  required: {
    default: false,
    type: Boolean

  },
  showRequiredAsterik: {
    type: Boolean
  }
});
</script>
<style scoped>
.cic__input_wrap p {
  font-size: 0.85rem;
  font-weight: 400;
  padding-bottom: 0.4rem;
  @apply text-[#181B20];
}
</style>
