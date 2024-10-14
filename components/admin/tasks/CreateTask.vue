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

// Variables Start
const appStore = useUserStore()
const user = useSupabaseUser()
const supabase = useSupabaseClient()
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
  const assignedTo = typeof selectedAssignee.value === 'string'
    ? JSON.parse(selectedAssignee.value)
    : selectedAssignee.value;

  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        taskName: task_name.value,
        description: task_description.value,
        deadline: formattedDeadline,
        assignedTo: assignedTo,
        priority: selectedPriority.value,
        status: 'open',
        user_id: user.id
      })
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }


    task_name.value = '';
    task_description.value = '';
    task_end_date.value = '';
    selectedAssignee.value = '';
    selectedPriority.value = '';

    emits('fetchTasks')

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
        <Form @submit.prevent="handleCreateTask">
          <!-- Assignee Start -->
          <CustomInputContainer label="Assignee" class="w-full mt-[10px]">
            <Dropdown v-model="selectedAssignee" :options="appStore.assignees" optionLabel="first_name"
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
            <Editor v-model="task_description" editorStyle="height: 200px" />
          </CustomInputContainer>
          <!--Task Description End -->

          <!-- Priority Start -->
          <CustomInputContainer label="Priority" class="w-full mt-[10px]">
            <Dropdown v-model="selectedPriority" :options="appStore.priority" optionLabel="name" optionValue="name"
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