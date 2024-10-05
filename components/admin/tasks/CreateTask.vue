<script setup>
// Imports Start
import Editor from 'primevue/editor';
import { useUserStore } from "@/stores/user"
// Imports End

// Receive Props Start
const props = defineProps({
  openCreateTaskDialog: {
    type: Boolean,
  }
})
// Receive Props End

// Reactive Variable Start
const isSubmitting = ref(false);
const selectedAssignee = ref([]);
const task_name = ref()
const task_description = ref()
const selectedPriority = ref()
const task_end_date = ref()
// Reactive Variable End

// Variables Start
const appStore = useUserStore()
// Variables Start

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

        <!-- Create Task Form Start -->
        <Form @submit="handleCreateTask">
          <!-- Assignee Start -->
          <CustomInputContainer label="Assignee" class="w-full mt-[10px]">
            <Dropdown v-model="selectedAssignee" :options="appStore.assignees" optionLabel="first_name" optionValue="id"
              placeholder="Select Assignee" class="w-full md:w-14rem" />
          </CustomInputContainer>
          <!-- Assignee End -->

          <!-- Task Name Start -->
          <CustomInputContainer required label="Title" class="mt-[10px]">
            <InputText v-model="task_name" class="border w-full" />
          </CustomInputContainer>
          <!-- Task Name End -->

          <!-- Task Description Start -->
          <CustomInputContainer label="Description" class="w-full mt-[10px]">
            <Editor v-model="task_description" editorStyle="height: 120px" />
          </CustomInputContainer>
          <!--Task Description End -->

          <!-- Priority Start -->
          <CustomInputContainer label="Priority" class="w-full mt-[10px]">
            <Dropdown v-model="selectedPriority" :options="appStore.priority" optionLabel="name"
              placeholder="Select Priority" class="w-full md:w-14rem" />
          </CustomInputContainer>
          <!-- Priority End -->

          <!-- Deadline Start -->
          <CustomInputContainer label="Deadline" class="w-full mt-[10px]">
            <Calendar v-model="task_end_date" />
          </CustomInputContainer>
          <!-- Deadline End -->



          <!-- Cancel & Save  BTN Start -->
          <div class="flex flex-row items-center justify-end space-x-4 ml-auto my-2.5 ">
            <!-- Cancel BTN Start -->
            <button @click="closeDialog" type="button"
              class="border border-gray-500 text-gray-500 rounded-md px-[10px] py-[4px] text-base">
              Cancel
            </button>
            <!-- Cancel BTN End -->

            <!-- Save BTN Start -->
            <button type="submit" class="btn-primary" :disabled="isSubmitting">
              <i v-if="isSubmitting" class="pi pi-spin pi-spinner" style="font-size: 0.8rem"></i>
              <span v-else class="text-base text-white">Create</span>
            </button>
            <!-- Save BTN End -->
          </div>
          <!-- Cancel & Save  BTN End -->
        </Form>
        <!-- Create Task Form End -->

      </div>



    </template>
  </Dialog>
</template>