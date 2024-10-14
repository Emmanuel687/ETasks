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
const statuses = ['open', 'submitted-for-approval', 'closed'];
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
    <div v-for="status in statuses" :key="status"
      class="bg-gray-100 py-3 rounded-lg flex-shrink-0 w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-[calc(100vh-250px)] sm:h-full flex flex-col">
      <h2 class="text-lg font-semibold mb-4 px-3">{{ formatStatus(status) }}</h2>
      <client-only>
        <draggable :list="getTasksByStatus(status)" :group="{ name: 'tasks', pull: true, put: true }" item-key="_id"
          class="overflow-y-auto flex-1 space-y-4 px-4" @change="(event) => onDragChange(event, status)">
          <template #item="{ element }">
            <div
              class="bg-white p-3 rounded-lg cursor-move transition transform hover:scale-105 hover:bg-blue-50 hover:shadow"
              @click="handleShowModal(element)">
              <h3 class="font-semibold">{{ element.taskName }}</h3>
              <p v-html="element.description" class="text-sm text-gray-600 truncate" />
              <div class="flex flex-wrap justify-between items-center mt-2">
                <div class="text-xs font-medium flex items-center space-x-2 mb-1 sm:mb-0" :class="{
                  'text-red-500': element.priority === 'High',
                  'text-yellow-500': element.priority === 'Medium',
                  'text-green-500': element.priority === 'Low'
                }">
                  <span>
                    <img src="../../../public/assets/svgs/Icons/flag.svg" class="w-5 h-5" alt="Priority flag">
                  </span>
                  <span>{{ element.priority }}</span>
                </div>
                <span class="text-xs text-gray-500">
                  Due: {{ new Date(element.deadline).toLocaleDateString() }}
                </span>
              </div>
              <div class="mt-2 text-xs text-gray-500">
                Assigned to: {{ formatedAssignedToName(element.assignedTo) }}
              </div>
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