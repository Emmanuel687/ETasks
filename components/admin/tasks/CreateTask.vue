<script setup>
// Imports Start
import Editor from 'primevue/editor';
import { useUserStore } from "@/stores/user"
import { useCustomToast } from '~/composables/useToast'
// Imports End

// Receive Props Start
const props = defineProps({
  openCreateTaskDialog: {
    type: Boolean,
  }
})
// Receive Props End

// Variables Start
const appStore = useUserStore()
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const toast = useCustomToast()
// Variables Start


// Reactive Variable Start
const isSubmitting = ref(false);
const selectedAssignee = ref([]);
const task_name = ref('')
const task_description = ref('')
const selectedPriority = ref([])
const task_end_date = ref()
// Reactive Variable End



// Emits Start
const emits = defineEmits(['close', 'fetchTasks'])
// Emits End

// Close  Dialog Start
const closeDialog = () => {
  emits('close')
}
// Close Dialog End


// HandleCreateTask Start
const handleCreateTask = async () => {
  const isSubmitting = ref(false)
  isSubmitting.value = true

  const formattedDeadline = task_end_date.value ? new Date(task_end_date.value).toISOString() : null;
  // const assignedTo = typeof selectedAssignee.value === 'string'
  //   ? JSON.parse(selectedAssignee.value)
  //   : selectedAssignee.value;

  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        taskName: task_name.value,
        description: task_description.value,
        deadline: formattedDeadline,
        // assignedTo: assignedTo,
        priority: selectedPriority.value,
        status: 'open',
        user_id: user.id
      })
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    toast.success("Form submitted successfully!")

    task_name.value = '';
    task_description.value = '';
    task_end_date.value = '';
    // selectedAssignee.value = '';
    selectedPriority.value = '';

    emits('fetchTasks')
    closeDialog()

  } catch (error) {
    console.error('Error creating task:', error);
  } finally {
    isSubmitting.value = false;
  }
};
// HandleCreateTask End
</script>
<template>
  <Toast />

  <Dialog modal v-model:visible="props.openCreateTaskDialog" :style="{ width: '45rem' }">
    <template #container>
      <div class="p-6 bg-white rounded-lg shadow-md">
        <!-- Header Start -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-[20px] font-semibold text-[#1a40e2]">Create Task</h2>
          <button @click="closeDialog" class="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <!-- Header End -->

        <!-- Create Task Form Start -->
        <Form @submit.prevent="handleCreateTask" class="space-y-6">
          <!-- Assignee Start -->
          <!-- <CustomInputContainer label="Assignee" class="w-full">
            <Dropdown v-model="selectedAssignee" :options="appStore.assignees" optionLabel="first_name"
              placeholder="Select Assignee"
              class="w-full md:w-14rem border-gray-300 focus:border-indigo-600 focus:ring-indigo-500" />
          </CustomInputContainer> -->
          <!-- Assignee End -->

          <!-- Task Name Start -->
          <CustomInputContainer required label="Title">
            <InputText v-model="task_name" class="w-full border-gray-300 focus:border-indigo-600 focus:ring-blue-500" />
          </CustomInputContainer>
          <!-- Task Name End -->

          <!-- Task Description Start -->
          <CustomInputContainer label="Description" class="w-full">
            <Editor v-model="task_description" editorStyle="height: 150px"
              class="border-gray-300 focus:border-indigo-600 focus:ring-blue-500" />
          </CustomInputContainer>
          <!--Task Description End -->

          <!-- Priority Start -->
          <CustomInputContainer label="Priority" class="w-full">
            <Dropdown v-model="selectedPriority" :options="appStore.priority" optionLabel="name" optionValue="name"
              placeholder="Select Priority"
              class="w-full md:w-14rem border-gray-300 focus:border-indigo-600 focus:ring-blue-500" />
          </CustomInputContainer>
          <!-- Priority End -->

          <!-- Deadline Start -->
          <CustomInputContainer label="Deadline" class="w-full">
            <Calendar v-model="task_end_date"
              class="w-full border-gray-300 focus:border-indigo-600 focus:ring-blue-500" />
          </CustomInputContainer>
          <!-- Deadline End -->

          <!-- Action Buttons Start -->
          <div class="flex justify-end space-x-4">
            <button @click="closeDialog" type="button"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </button>
            <button type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-700 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :disabled="isSubmitting">
              <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              <span>Create</span>
            </button>
          </div>
          <!-- Action Buttons End -->
        </Form>
        <!-- Create Task Form End -->
      </div>
    </template>
  </Dialog>
</template>