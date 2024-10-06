<script setup>
// Imports Start

import Editor from 'primevue/editor';

// Imports End

// Receive Props Start
const props = defineProps({
  showEditModal: {
    type: Boolean,
  }
})
// Receive Props End

// Variables Start
// Variables Start

// Emits Start
const emits = defineEmits(["close"])
// Emit End

// Reactive Variable Start
// Reactive Variable End

// Close Dialog Start
const closeDialog = () => {
  emits("close")
}
// Close Dialog End


</script>


<template>
  <!-- Edit Task Start -->
  <section>
    <Dialog modal v-model:visible="props.showEditModal" :style="{ width: '45rem' }">
      <template #container>
        <div class="p-3 bg-white rounded-lg">
          <!-- Close Task BTN Start -->
          <div class="flex justify-between">
            <p class="text-[#1a40e2]">Edit task</p>
            <button @click="closeDialog">
              <i class="pi pi-times" />
            </button>
          </div>
          <!-- Close Task BTN End -->




        </div>
      </template>
    </Dialog>
  </section>
  <!-- Edit Task End -->
</template>