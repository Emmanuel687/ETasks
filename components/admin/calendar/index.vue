<script setup>
// Imports Start
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useUserStore } from "@/stores/user"
// Imports End

// Store Start
const appStore = useUserStore()
// Store End

// Reactive Variables Start
const calendarRef = ref(null)
const showTaskListDialog = ref(false)
const calendarTasksList = reactive({
  id: "",
  title: "",
  description: "",
  priority: "",
  status: "",
  deadline: ""
})
// Reactive Variables End

// Tasks Start
const tasks = computed(() => appStore.tasks)
// Tasks End

// Format Tasks For Calendar Start
const formatTasksForCalendar = computed(() => {
  if (!tasks.value?.length) return []

  return tasks?.value.map(task => {
    const priorities = Array.isArray(task.priority) ? task.priority : [task.priority]

    return {
      id: task.id,
      title: task.taskName,
      start: new Date(task.deadline).toISOString(),
      allDay: true,
      description: task.description,
      extendedProps: {
        priority: task.priority,
        status: task.status,
        description: task.description
      },
      backgroundColor: getPriorityColor(priorities),
      borderColor: getPriorityColor(priorities),
      classNames: [
        `priority-${task.priority.toString().toLowerCase()}`,
        `status-${task.status.toLowerCase().replace(' ', '-')}`
      ],
    }
  })
})
// Format Tasks For Calendar End

// Calendar options Start
const calendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  events: formatTasksForCalendar.value,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  height: 'auto',
  eventDisplay: 'block',

  // Customize event rendering
  eventContent: (arg) => {
    const priority = arg.event.extendedProps.priority
    const status = arg.event.extendedProps.status

    return {
      html: `
        <div class="task-event ${priority.toLowerCase()}-priority ${status.toLowerCase()}-status">
          <div class="task-title">
            ${arg.event.title}
            ${priority === 'High' ? '<span class="priority-icon">⚡</span>' : ''}
          </div>
          <div class="task-info">
            <span class="task-priority">${priority}</span>
            <span class="task-status">${status}</span>
          </div>
        </div>
      `
    }
  },

  // Event handlers
  eventClick: (info) => {
    calendarTasksList.id = info.event.id
    calendarTasksList.title = info.event.title
    calendarTasksList.description = info.event.extendedProps.description
    calendarTasksList.priority = info.event.extendedProps.priority
    calendarTasksList.status = info.event.extendedProps.status
    calendarTasksList.deadline = info.event.start

    showTaskListDialog.value = true
  }
}
// Calendar options End

// Priority Color Start
function getPriorityColor(priorities) {
  if (priorities.length > 1) {
    return '#9C27B0' // Purple color for tasks with multiple priorities
  }

  const priority = priorities[0]
  const colors = {
    'High': '#ef5350',
    'Medium': '#fb8c00',
    'ow': '#66bb6a'
  }
  return colors[priority] || '#9e9e9e'
}
// Priority Color End

// Watchers Start
watch(formatTasksForCalendar, () => {
  if (calendarRef.value) {
    calendarRef.value.getApi().refetchEvents()
  }
})
// Watchers End

// OnMounted Start
onMounted(() => {
  appStore.fetchTasks()
})
// OnMounted End
</script>

<template>
  <div class="calendar-wrapper">
      <div class="calendar-header">
        <h2 class="text-2xl font-bold text-gray-800">Task Calendar</h2>
        <div class="priority-legend">
          <div class="legend-item">
            <span class="legend-dot high"></span>
            <span>High Priority</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot medium"></span>
            <span>Medium Priority</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot low"></span>
            <span>Low Priority</span>
          </div>
        </div>
      </div>
      
      <AdminCalendarDialogsTaskListDetails
        :calendarTasksList="calendarTasksList"
        :showTaskListDialog="showTaskListDialog"
        @close="showTaskListDialog = false"
      />
      
      <FullCalendar 
        :options="calendarOptions" 
        ref="calendarRef" 
        class="task-calendar"
      />
  </div>
</template>

<style scoped>
.calendar-wrapper {
  @apply p-6 bg-gray-50 min-h-screen;
}

.calendar-container {
  @apply bg-white rounded-xl shadow-lg p-6 max-w-7xl mx-auto;
}

.calendar-header {
  @apply mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4;
}

.priority-legend {
  @apply flex flex-wrap gap-4;
}

.legend-item {
  @apply flex items-center gap-2 text-sm text-gray-600;
}

.legend-dot {
  @apply w-3 h-3 rounded-full;
}

.legend-dot.high {
  background-color: #ef5350;
}

.legend-dot.medium {
  background-color: #fb8c00;
}

.legend-dot.low {
  background-color: #66bb6a !important;
}

/* Calendar Styles */
:deep(.task-calendar) {
  @apply font-sans;
}

:deep(.fc) {
  @apply max-w-full outline-none;
}

:deep(.fc-toolbar-title) {
  @apply text-xl sm:text-2xl font-bold text-gray-800;
}

:deep(.fc-button) {
  @apply px-3 py-2 rounded-lg text-sm font-medium transition-colors outline-none !important;
  @apply bg-indigo-600 text-white hover:bg-indigo-700 !important;
}

:deep(.fc-button-primary) {
  @apply bg-indigo-700 hover:bg-indigo-800 text-white !important;
}

:deep(.fc-button-secondary) {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 !important;
}

:deep(.fc-today-button) {
  @apply bg-indigo-600 text-white hover:bg-indigo-700 !important;
}

:deep(.fc-button-active) {
  @apply bg-indigo-700 text-white !important;
}

:deep(.fc-button-disabled) {
  @apply bg-gray-300 text-gray-500 cursor-not-allowed !important;
}

:deep(.fc *) {
  @apply outline-none focus:outline-none !important;
}

/* Task Event Styles */
:deep(.task-event) {
  @apply p-2 rounded-lg shadow-sm;
}

:deep(.task-title) {
  @apply font-medium text-white mb-1 flex items-center gap-1;
}

:deep(.priority-icon) {
  @apply text-yellow-300;
}

:deep(.task-info) {
  @apply flex justify-between text-xs text-white/90;
}

:deep(.task-priority), :deep(.task-status) {
  @apply px-1.5 py-0.5 rounded-full bg-white/20 text-white;
}

/* Priority-specific styles */
:deep(.high-priority) {
  @apply bg-red-500;
}

:deep(.medium-priority) {
  @apply bg-orange-500;
}

:deep(.low-priority) {
  @apply bg-green-500;
}

/* Status-specific styles */
:deep(.todo-status) {
  @apply border-l-4 border-gray-400;
}

:deep(.in-progress-status) {
  @apply border-l-4 border-blue-400;
}

:deep(.completed-status) {
  @apply border-l-4 border-green-400;
}

/* Additional Calendar Customizations */
:deep(.fc-day-today) {
  @apply bg-blue-50 !important;
}

:deep(.fc-day-other) {
  @apply bg-gray-50/50 !important;
}

:deep(.fc-scrollgrid) {
  @apply border-gray-200 !important;
}

:deep(.fc-col-header-cell) {
  @apply bg-gray-50 py-3 !important;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  :deep(.fc-toolbar) {
    @apply flex-col gap-4;
  }
  
  :deep(.fc-toolbar-title) {
    @apply text-center;
  }
  
  :deep(.fc-button) {
    @apply text-xs;
  }
}
</style>

