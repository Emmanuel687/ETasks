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
        <div class="p-3 bg-white rounded-lg">
          <!-- Close Task BTN Start -->
          <div class="flex justify-between">
            <p class="text-[#1a40e2]">Edit task</p>
            <button @click="closeDialog">
              <i class="pi pi-times" />
            </button>
          </div>
          <!-- Close Task BTN End -->

          <!-- Task Title Start -->
          <div class="flex justify-between item-center mt-[10px]">
            <!-- Tasks Title -->
            <div class="flex space-x-[10px] items-center">

              <!-- Text Input Start -->
              <div v-if="showEdit">
                <InputText type="text" v-model="task.taskName" />
              </div>
              <!-- Text Input End -->


              <!-- Title Text Start -->
              <div v-else class="flex space-x-2 items-center" style="width: 20px; height: 20px;">
                <img src="../../../public/assets/svgs/Icons/tick.svg">
                <div class="flex items-center space-x-2 !p-[2px]">
                  <span class="font-semibold !text-[17px] text-nowrap">{{ task.taskId }} -</span>
                  <span class="text-lg first-letter:uppercase text-nowrap ">{{ task.taskName }}</span>
                </div>
              </div>
              <!-- Title Text End -->
            </div>
            <!-- Task Title-->

            <!-- Save && Close BTN Start -->
            <div class="flex space-x-2" v-if="showEdit">
              <button class="btn-primary !pt-[1px] !pb-[1px]" @click="handleEditTask">Save </button>
              <button class="btn-primary outlined" @click="handleShowEdit()">Close </button>
            </div>
            <!-- Save && Close BTN End -->

            <!-- Edit Start -->
            <div class="flex space-x-2" v-else>
              <button class="btn-primary !pt-[1px] !pb-[1px]" @click="handleShowEdit()">Edit </button>
            </div>
            <!-- Edit End -->
          </div>
          <!-- Task Title End -->

          <!-- Task Description Start -->
          <div class="mt-[30px]">
            <p class="text-base font-semibold underline"> Description</p>
            <Editor v-if="showEdit" v-model="task.description" editorStyle="height: 120px" />
            <p v-else v-html="task?.description" class="!text-[10px] my-2 text-wrap h-[250px] overflow-y-scroll" />

          </div>
          <!-- Task Description End -->

          <!-- Priority Start -->
          <div class="mt-[30px]">
            <p class="text-base font-semibold underline"> Priority</p>
            <Dropdown v-if="showEdit" v-model="task.priority" :options="appStore.priority" optionLabel="name"
              option-value="name" placeholder="Select Priority" class="w-full md:w-14rem" />
            <p v-else>{{ task.priority }}</p>
          </div>
          <!-- Priority End -->

          <!-- Deadline Date -->
          <div class="mt-[30px]">
            <p class="text-base font-semibold underline"> Deadline</p>
            <Calendar v-if="showEdit" v-model="task.deadline" dateFormat="dd/mm/yy" />
            <p v-else>{{ task.deadline }}</p>
          </div>
          <!-- Deadline Date -->
        </div>
      </template>
    </Dialog>
  </section>
  <!-- Edit Task End -->
</template>