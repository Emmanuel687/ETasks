<script setup>
// Imports Start
import draggable from 'vuedraggable';
// Imports End


// Receive Props Start
const props = defineProps({
  tasks: {
    type: Object,
    required: true
  }
});
// Receive Props End

// Variables Start
const statuses = ['open', 'submitted-for-approval', 'closed'];
// Variables End


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

</script> 


<template>
  <!-- Task List && KanBanBoard Start -->
  <div class="flex-1 flex space-x-4 p-3 overflow-x-auto overflow-y-hidden"
    style="max-width: 100%; height: calc(100vh - 210px);">
    <div v-for="status in statuses" :key="status"
      class="bg-gray-100 py-3 rounded-lg flex-shrink-0 h-full flex flex-col w-[450px]">

      <h2 class="text-lg font-semibold mb-4 px-3">{{ formatStatus(status) }}</h2>

      <!-- NB:- Client-only to avoid SSR issues with draggable -->
      <client-only>
        <!-- Draggable Task List -->
        <draggable :list="getTasksByStatus(status)" :group="{ name: 'tasks', pull: true, put: true }" item-key="_id"
          class="overflow-y-auto flex-1 space-y-4 px-4" @change="(event) => onDragChange(event, status)">
          <!-- Task Template Start -->
          <template #item="{ element }">
            <div
              class="bg-white p-3 rounded-lg cursor-move transition transform hover:scale-105 hover:bg-blue-50 hover:shadow"
              @click="handleShowModal(element)">
              <!-- Task name Start -->
              <h3 class="font-semibold">{{ element.taskName }}</h3>
              <!-- Task name End -->

              <!-- Task description Start-->
              <p v-html="element.description" class="text-sm text-gray-600 truncate" />
              <!-- Task description End-->

              <!-- Task (Priority & Due Date) Start -->
              <div class="flex justify-between items-center mt-2">
                <div class="text-xs font-medium flex items-center space-x-2" :class="{
                  'text-red-500': element.priority === 'High',
                  'text-yellow-500': element.priority === 'Medium',
                  'text-green-500': element.priority === 'Low'
                }">
                  <span>
                    <img src="../../../public/assets/svgs/Icons/flag.svg" style="width: 20px; height: 20px;">
                  </span>
                  <span>
                    {{ element.priority }}
                  </span>
                </div>
                <span class="text-xs text-gray-500">
                  Due: {{ new Date(element.deadline).toLocaleDateString() }}
                </span>
              </div>
              <!-- Task (Priority & Due Date) End -->

              <!-- Assigned to Start -->
              <div class="mt-2 text-xs text-gray-500">
                Assigned to: {{ element.assignedTo[0].first_name }} {{ element.assignedTo[0].last_name }}
              </div>
              <!-- Assigned to End -->

            </div>
          </template>
          <!-- Task Template End -->


        </draggable>
      </client-only>
    </div>
  </div>
  <!-- Task List &&  KanBanBoard End -->
</template>