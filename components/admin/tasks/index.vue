<script setup>
// Imports Start
import draggable from 'vuedraggable';
import { formatedAssignedToName } from '../../../utils/formatNamed'
// Imports End

// Receive Props Start
const props = defineProps({
  tasks: {
    type: Array,
    required: true
  }
});
// Receive Props End

// Reactive Variable Start
const showEditModal = ref(false);
const task = ref('')
// Reactive Variable End

// Variables Start
const statuses = ['open', 'In Progress', 'closed'];
// Variables End

// Emits Start
const emit = defineEmits(['update-task']);
// Emits End

// OnDragChange Method Start
const onDragChange = (event, newStatus) => {
  if (event.added) {
    const task = event.added.element;
    const updatedTask = { ...task, status: newStatus };
    emit('update-task', updatedTask);
  };
}
// OnDragChange Method End

// Format Status Start
const formatStatus = (status) => {
  return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
// Format Status End

// Get TasksByStatus Start
const getTasksByStatus = (status) => {
  return props.tasks.filter(task => task.status === status);
};
// Get TasksByStatus End

// Get Assigned To Name Start

// ShowModal Start
const handleShowModal = (item) => {
  showEditModal.value = true;
  task.value = item
};
// ShowModal End

</script> 


<template>
  <!-- Task List && KanBanBoard Start -->
  <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 p-3 overflow-x-auto"
    style="height: calc(100vh - 210px);">

    <div v-for="status in statuses" :key="status" v-if="props.tasks.length"
      class="bg-gray-100 py-4 px-3 rounded-lg shadow-md flex-shrink-0 w-full sm:w-[300px] md:w-[350px] lg:w-[470px] h-[calc(100vh-250px)] sm:h-full flex flex-col">

      <!-- Column Header Start -->
      <h2 class="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">{{ formatStatus(status) }}</h2>
      <!-- Column Header End -->

      <!-- Draggable Task List -->
      <client-only>
        <draggable :list="getTasksByStatus(status)" :group="{ name: 'tasks', pull: true, put: true }" item-key="_id"
          class="overflow-y-auto flex-1 space-y-4 px-2 sm:px-3 transition-all ease-in-out duration-200"
          @change="(event) => onDragChange(event, status)">

          <!-- Task Card -->
          <template #item="{ element }">
            <div
              class="bg-white p-4 rounded-lg cursor-move shadow hover:shadow-lg hover:bg-blue-50 hover:scale-105 transition transform duration-200 ease-in-out"
              @click="handleShowModal(element)">
              <!-- Task Title Start -->
              <h3 class="font-semibold text-gray-800 truncate">{{ element.taskName }}</h3>
              <!-- Task Title End -->

              <!-- Task Description Start -->
              <p v-html="element.description" class="text-sm text-gray-600 truncate"></p>
              <!-- Task Description End -->

              <!-- Task Metadata -->
              <div class="flex flex-wrap justify-between items-center mt-3">
                <!-- Priority Start -->
                <div class="text-xs font-medium flex items-center space-x-2" :class="{
                  'text-red-500': element.priority === 'High',
                  'text-yellow-500': element.priority === 'Medium',
                  'text-green-500': element.priority === 'Low'
                }">
                  <img src="../../../public/assets/svgs/Icons/flag.svg" class="w-4 h-4" alt="Priority flag">
                  <span>{{ element.priority }}</span>
                </div>

                <!-- Priority End -->


                <!-- Due Date Start -->
                <span class="text-xs text-gray-500">
                  Due: {{ new Date(element.deadline).toLocaleDateString() }}
                </span>
                <!-- Due Date End -->

              </div>

              <!-- Assigned To Start -->
              <div class="mt-2 text-xs text-gray-500">
                Assigned to: {{ formatedAssignedToName(element.assignedTo) }}
              </div>
              <!-- Assigned To End -->

            </div>
          </template>
        </draggable>
      </client-only>
    </div>


  </div>
  <!-- Task List &&  KanBanBoard End -->



  <!-- Edit Task Dialog Start -->
  <section>
    <AdminTasksEditTask :showEditModal="showEditModal" @close="showEditModal = false" :task="task" :tasks="props.tasks" />
  </section>
  <!-- Edit Task Dialog End -->
</template>