<script setup>
// Imports Start
// Imports 

// Receive Props Start
const props = defineProps({
  openCreateTaskDialog: {
    type: Boolean,
  }
})
// Receive Props End

// Variables Start
// Variables Start

// Reactive Variable Start
// Reactive Variable End

// Emits Start
const emits = defineEmits(['close'])
// Emits End

// Close  Dialog Start
const closeDialog = () => {
  emits('close')
}
// Close Dialog End




</script>
<template>
  <Dialog modal v-model:visible="props.openCreateTaskDialog" :style="{ width: '45rem' }">
    <template #container>
      <div class="p-3 bg-white rounded-lg">
        <!-- Close Task BTN Start -->
        <div class="flex justify-between">
          <p class="text-[#1a40e2]">Create task</p>
          <button @click="closeDialog">
            <i class="pi pi-times" />
          </button>
        </div>
        <!-- Close Task BTN End -->

      </div>



    </template>
  </Dialog>
</template>