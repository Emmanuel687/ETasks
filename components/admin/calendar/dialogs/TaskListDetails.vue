<script setup>
// Imports Start
// Imports End

// Reactive Variables Start
// Reactive Variables End


// Emits Start
const emit = defineEmits(['close'])
// Emits End

// Props Start
const props = defineProps({
  calendarTasksList: {
    type: Object,
  },
  showTaskListDialog: {
    type: Boolean
  }
})
// Props End


// Utility Functions
const getPriorityColor = (priority) => {
  const colors = {
    'High': 'bg-red-500',
    'Medium': 'bg-orange-500',
    'Low': 'bg-green-500'
  }
  return colors[priority] || 'bg-gray-500'
}

const getStatusColor = (status) => {
  const colors = {
    'open': 'bg-blue-500',
    'in-progress': 'bg-yellow-500',
    'closed': 'bg-gray-500'
  }
  return colors[status.toLowerCase()] || 'bg-gray-500'
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

function formatTime(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date)
}

function getInitials(assignedTo) {
  return `${assignedTo.first_name[0]}${assignedTo.second_name[0]}`
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Close Dialog Start
const closeDialog = () => {
  emit("close")
}
// Close Dialog End


</script>

<template>
  <Dialog modal v-model:visible="props.showTaskListDialog" :style="{ width: '25rem' }">
    <template #container>
      <div class="bg-white rounded-lg shadow-lg p-6">
        <!-- Header with Close Button -->
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center space-x-2">
            <h2 class="text-xl font-semibold text-[#1a40e2]">{{ calendarTasksList.title }}</h2>
          </div>
          <button @click="closeDialog" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <i class="pi pi-times text-gray-600" />
          </button>
        </div>

        <!-- Status and Priority Badges -->
        <div class="flex gap-3 mb-6">
          <div class="px-3 py-1.5 rounded-full text-white text-sm font-medium"
            :class="getPriorityColor(calendarTasksList.priority)">
            <i class="pi pi-flag mr-1"></i>
            {{ calendarTasksList.priority }}
          </div>
          <div class="px-3 py-1.5 rounded-full text-white text-sm font-medium"
            :class="getStatusColor(calendarTasksList.status)">
            <i class="pi pi-clock mr-1"></i>
            {{ capitalizeFirst(calendarTasksList.status) }}
          </div>
        </div>

        <!-- Date and Time -->
        <div class="flex items-center space-x-3 mb-6 text-gray-700">
          <div class="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
            <i class="pi pi-calendar text-blue-600 mr-2"></i>
            <div>
              <div class="text-sm font-medium">
                {{ formatDate(calendarTasksList.deadline) }}
              </div>
              <div class="text-xs text-gray-500">
                {{ formatTime(calendarTasksList.deadline) }}
              </div>
            </div>
          </div>
        </div>

        <div class="divider my-4 border-t border-gray-200"></div>



        <!-- Description -->
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center space-x-2 mb-2">
            <i class="pi pi-file-edit text-gray-600"></i>
            <h3 class="font-medium text-gray-700">Description</h3>
          </div>
          <div class="prose prose-sm max-w-none text-gray-600" v-html="calendarTasksList.description"></div>
        </div>
      </div>

    </template>
  </Dialog>
</template>