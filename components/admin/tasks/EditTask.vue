<script setup>
// Imports Start
import Editor from 'primevue/editor';
import { useUserStore } from "@/stores/user"
// Imports End

// Receive Props Start
const props = defineProps({
  showEditModal: {
    type: Boolean,
  },
  task: {
    type: Object,
  },
  tasks: {
    type: Array,
  }
})
// Receive Props End

// Variables Start
const appStore = useUserStore()
const supabase = useSupabaseClient()
// Variables Start


// Reactive Variable Start
const showEdit = ref(false);
const isLoading = ref(false)

// Reactive Variable End

// Emits Start
const emits = defineEmits(["close"])
// Emit End


// Close Dialog Start
const closeDialog = () => {
  emits("close")
}
// Close Dialog End



// HandleEditTask Start
const handleEditTask = async () => {

  try {
    isLoading.value = true

    const { data, error } = await supabase
      .from('tasks')
      .update({
        taskName: props.task.taskName,
        description: props.task.description,
        priority: props.task.priority,
        deadline: props.task.deadline,
      })
      .eq('id', props.task.id)  // Assuming the task ID field is named 'id'
      .select()

    if (error) throw error

    if (data) {
      // Update the local state if needed
      const index = props.tasks.findIndex(t => t.id === props.task.id)
      if (index !== -1) {
        props.tasks[index] = { ...props.tasks[index], ...data[0] }
      }

      // toast.add({
      //   severity: 'success',
      //   summary: 'Success',
      //   detail: 'Task updated successfully',
      //   life: 3000,
      // })

      showEdit.value = false
    }

  } catch (error) {
    console.error('Error updating task:', error)
    // toast.add({
    //   severity: 'error',
    //   summary: 'Error',
    //   detail: error.message || 'Failed to update task',
    //   life: 3000,
    // })
  } finally {
    isLoading.value = false
    closeDialog()
  }
}
// HandleEditTask End



// HandleShowEdit Start
const handleShowEdit = () => {
  showEdit.value = !showEdit.value;
};
// HandleShowEdit End


</script>


<template>
  <!-- Edit Task Start -->
  <section>
    <Dialog modal v-model:visible="props.showEditModal" :style="{ width: '45rem' }">
      <template #container>
        <div class="p-6 bg-white rounded-lg shadow-md">
          <!-- Header Start -->
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-[20px] font-semibold text-indigo-600">Edit Task</h2>
            <button @click="closeDialog" class="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <Divider />
          <!-- Header End -->

          <!-- Task Title Start -->
          <div class="flex justify-between items-center mt-6">
            <div class="flex items-center space-x-2">
              <div v-if="showEdit" class="w-full">
                <InputText type="text" v-model="task.taskName"
                  class="w-full border-gray-300 focus:border-blue-500 focus:ring-indigo-600" />
              </div>
              <div v-else class="flex items-center space-x-2">
                <img src="../../../public/assets/svgs/Icons/tick.svg" alt="Tick Icon" class="w-8 h-8">
                <div class="flex items-center space-x-2">
                  <span class="text-lg font-semibold">{{ task.taskId }} -</span>
                  <span class="text-xl capitalize">{{ task.taskName }}</span>
                </div>
              </div>
            </div>
            <div class="flex space-x-2">
              <button v-if="showEdit"
                class="px-4 py-2 text-sm font-medium text-white bg-indigo-700 rounded-md shadow-sm hover:bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                @click="handleEditTask">Save</button>
              <button v-if="showEdit"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                @click="handleShowEdit()">Close</button>
              <button v-else
                class="px-4 py-2 text-sm font-medium text-white bg-indigo-700 rounded-md shadow-sm hover:bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                @click="handleShowEdit()">Edit</button>
            </div>
          </div>
          <!-- Task Title End -->

          <!-- Task Description Start -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold mb-2">Description</h3>
            <Editor v-if="showEdit" v-model="task.description" editorStyle="height: 150px"
              class="border-gray-300 focus:border-blue-500 focus:ring-indigo-600" />
            <div v-else class="prose prose-sm max-w-none" v-html="task?.description"></div>
          </div>
          <!-- Task Description End -->

          <!-- Priority Start -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold mb-2">Priority</h3>
            <Dropdown v-if="showEdit" v-model="task.priority" :options="appStore.priority" optionLabel="name"
              option-value="name" placeholder="Select Priority"
              class="w-full md:w-64 border-gray-300 focus:border-blue-500 focus:ring-indigo-600" />
            <p v-else class="text-gray-900">{{ task.priority }}</p>
          </div>
          <!-- Priority End -->

          <!-- Deadline Date Start -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold mb-2">Deadline</h3>
            <Calendar v-if="showEdit" v-model="task.deadline" dateFormat="dd/mm/yy"
              class="w-full md:w-64 border-gray-300 focus:border-blue-500 focus:ring-indigo-600" />
            <p v-else class="text-gray-900">{{ task.deadline }}</p>
          </div>
          <!-- Deadline Date End -->
        </div>
      </template>
    </Dialog>
  </section>
  <!-- Edit Task End -->
</template>