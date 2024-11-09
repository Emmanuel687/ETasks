

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
    // Check if task has multiple priorities
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

  // Customize event rendering
  eventContent: (arg) => {
    const priority = arg.event.extendedProps.priority
    const status = arg.event.extendedProps.status

    return {
      html: `
        <div class="task-event ${priority.toLowerCase()}-priority ${status.toLowerCase()}-status">
          <div class="task-title">
            ${arg.event.title}
            ${priority === 'High' ? '⚡' : ''}
          </div>
          <div class="task-info">
            <span class="task-priority">${priority}</span>
          </div>
          <div class="task-status">${status}</div>
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
    'Low': '#66bb6a'
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
  <div class="calendar-wrapper ">
    <AdminCalendarDialogsTaskListDetails :calendarTasksList="calendarTasksList" :showTaskListDialog="showTaskListDialog"
      @close="showTaskListDialog = false" />
    <FullCalendar :options="calendarOptions" class="calendar" ref="calendarRef" />
  </div>
</template>

<style scoped>
.calendar-wrapper {
 
  background: white;
  border-radius: 12px; /* Smoother border radius */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Softer shadow for depth */
}

.calendar {
  height: 800px;
  width: 100%;
}

/* Calendar customization */
:deep(.fc) {
  --fc-border-color: #d1d5db; /* Neutral border color */
  --fc-button-bg-color: #6366F1; /* Indigo-600 */
  --fc-button-border-color: #6366F1;
  --fc-button-hover-bg-color: #4338CA; /* Indigo-700 */
  --fc-button-hover-border-color: #4338CA;
  --fc-button-active-bg-color: #4338CA;
  --fc-button-active-border-color: #4338CA;
  --fc-today-bg-color: rgba(99, 102, 241, 0.1); /* Subtle highlight for today's date */
}

/* Task event styles */
:deep(.task-event) {
  padding: 6px;
  border-radius: 8px;
  margin: 2px 0;
  background: #f3f4f6; /* Light gray background for contrast */
  transition: background-color 0.2s, transform 0.1s ease;
}

:deep(.task-event:hover) {
  background-color: #e0e7ff; /* Hover effect to highlight task */
  transform: scale(1.03); /* Slight pop on hover */
}

:deep(.task-title) {
  font-weight: 600;
  font-size: 0.95em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.task-info) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85em;
  margin-top: 4px;
}

/* Priority labels */
:deep(.task-priority) {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8em;
  background-color: rgba(255, 255, 255, 0.3);
}

:deep(.task-status) {
  font-size: 0.75em;
  margin-top: 3px;
  opacity: 0.8;
}

:deep(.task-assignee) {
  font-size: 0.85em;
}

/* Priority-based styling */
:deep(.high-priority) {
  border-left: 4px solid #ef4444; /* Brighter red for high priority */
}

:deep(.medium-priority) {
  border-left: 4px solid #fb923c; /* Bright orange for medium priority */
}

:deep(.low-priority) {
  border-left: 4px solid #34d399; /* Fresh green for low priority */
}

/* Status-based styling */
:deep(.closed-status) {
  opacity: 0.6;
  text-decoration: line-through;
}

:deep(.in-progress-status) {
  border-style: dashed !important;
}

/* Calendar responsiveness */
@media (max-width: 768px) {
  .calendar-wrapper {
    margin: 10px;
    padding: 12px;
  }

  .calendar {
    height: 600px;
  }

  :deep(.fc-toolbar) {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
