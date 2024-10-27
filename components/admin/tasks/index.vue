<template>
  <div v-if="props.tasks.length"
    class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 p-4 overflow-x-auto h-[calc(100vh-210px)]">
    <!-- Status Column -->
    <div v-for="status in statuses" :key="status"
      class="flex-shrink-0 w-full sm:w-[300px] md:w-[350px] lg:w-[470px] h-[calc(100vh-250px)] sm:h-full">
      <!-- Column Header -->
      <div class="bg-white rounded-t-xl p-4 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full" :class="{
              'bg-green-400': status === 'closed',
              'bg-yellow-400': status === 'in-progress',
              'bg-blue-400': status === 'open'
            }"></div>
            <h2 class="text-lg font-semibold text-gray-700">{{ formatStatus(status) }}</h2>
          </div>
          <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{{ getTasksByStatus(status).length
          }}</span>
        </div>
      </div>

      <!-- Tasks Container -->
      <div class="bg-gray-50 p-4 rounded-b-xl h-full">
        <client-only>
          <draggable :list="getTasksByStatus(status)" :group="{ name: 'tasks', pull: true, put: true }" item-key="_id"
            class="space-y-4 h-full overflow-y-auto custom-scrollbar" @change="(event) => onDragChange(event, status)">
            <!-- Task Card -->
            <template #item="{ element }">
              <div
                class="bg-white p-5 rounded-xl cursor-move border border-gray-100 hover:shadow-lg hover:border-blue-200 transform transition-all duration-300 ease-out relative group"
                @click="handleShowModal(element)">
                <!-- Priority Badge -->
                <div
                  class="absolute -top-[-14px] -right-[-10px] px-2.5 py-1 rounded-full text-xs font-medium shadow-sm transform transition-transform group-hover:scale-110"
                  :class="{
                    'bg-red-100 text-red-600': element.priority === 'High',
                    'bg-yellow-100 text-yellow-600': element.priority === 'Medium',
                    'bg-green-100 text-green-600': element.priority === 'Low'
                  }">{{ element.priority }}</div>

                <!-- Title -->
                <h3 class="font-semibold text-gray-800 text-base mb-2 pr-16">{{ element.taskName }}</h3>

                <!-- Description -->
                <div class="bg-gray-50 rounded-lg p-3 mb-3 group-hover:bg-blue-50/50 transition-colors">
                  <p v-html="element.description" class="text-sm text-gray-600" :class="{ 'line-clamp-2': !isExpanded }">
                  </p>
                  <button @click="toggleExpand" class="expand-btn">{{ isExpanded ? 'Show Less' : 'Show More'
                  }}</button>
                </div>

                <!-- Footer -->
                <div class="flex items-center justify-between mt-3">
                  <!-- Due Date -->
                  <div class="flex items-center space-x-2 text-sm text-gray-600">
                    <i class="pi pi-calendar text-blue-500"></i>
                    <span>{{ formatDate(element.deadline) }}</span>
                  </div>

                  <!-- Drag Handle Indicator -->
                  <div class="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="pi pi-grip-vertical"></i>
                  </div>
                </div>
              </div>
            </template>
          </draggable>
        </client-only>
      </div>
    </div>
  </div>

  <AdminTasksEmptyTask :selectedTaskStatus="selectedTaskStatus" v-else />

  <!-- Edit Task Dialog Start -->
  <section>
    <AdminTasksEditTask :showEditModal="showEditModal" @close="showEditModal = false" :task="task" :tasks="props.tasks" />
  </section>
  <!-- Edit Task Dialog End -->
</template>

<script setup>
// Imports Start
import draggable from 'vuedraggable';
import { ref, defineProps, defineEmits } from 'vue';
// Imports End

// Receive Props Start
const props = defineProps({
  tasks: {
    type: Array,
    required: true
  }
});
// Receive Props End

// Reactive Variables Start
const showEditModal = ref(false);
const task = ref('');
const isExpanded = ref(false);
const statuses = ['open', 'In Progress', 'closed'];

// Emits Start
const emit = defineEmits(['update-task']);
// Emits End

// OnDragChange Method Start
const onDragChange = (event, newStatus) => {
  if (event.added) {
    const task = event.added.element;
    const updatedTask = { ...task, status: newStatus };
    emit('update-task', updatedTask);
  }
};
// OnDragChange Method End

// Format Status Start
const formatStatus = (status) => {
  return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
// Format Status End

// Format Date Start
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}
// Format Date End

// Get Tasks By Status Start
const getTasksByStatus = (status) => {
  return props.tasks.filter(task => task.status === status);
};
// Get Tasks By Status End

// Show Modal Start
const handleShowModal = (item) => {
  showEditModal.value = true;
  task.value = item;
};
// Show Modal End

// Toggle Expand Start
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
// Toggle Expand End
</script>

<style scoped>
/* Button for expanding/collapsing */
.expand-btn {
  display: inline-flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #2563EB;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #1D4ED8;
    text-decoration: underline;
  }
}

/* Line clamp for collapsed state */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
