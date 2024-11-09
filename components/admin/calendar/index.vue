

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
  <div class="calendar-wrapper">
    <AdminCalendarDialogsTaskListDetails :calendarTasksList="calendarTasksList" :showTaskListDialog="showTaskListDialog"
      @close="showTaskListDialog = false" />

              <!-- {{ appStore.userProfile }} -->

    <FullCalendar :options="calendarOptions" class="calendar" ref="calendarRef" />
  </div>
</template>




<style scoped>
.calendar-wrapper {
  margin: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.calendar {
  height: 800px;
  width: 100%;
}

:deep(.fc) {
  --fc-border-color: #e5e7eb;
  --fc-button-bg-color: #1976D2;
  --fc-button-border-color: #1976D2;
  --fc-button-hover-bg-color: #1565C0;
  --fc-button-hover-border-color: #1565C0;
  --fc-button-active-bg-color: #1565C0;
  --fc-button-active-border-color: #1565C0;
}

:deep(.task-event) {
  padding: 4px;
  border-radius: 4px;
  margin: 2px 0;
}

:deep(.task-title) {
  font-weight: 500;
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.task-info) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8em;
  margin-top: 2px;
}

:deep(.task-priority) {
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 0.8em;
  background: rgba(255, 255, 255, 0.2);
}

:deep(.task-status) {
  font-size: 0.7em;
  opacity: 0.8;
  margin-top: 2px;
}

:deep(.task-assignee) {
  font-size: 0.8em;
}

/* Priority-based styling */
:deep(.high-priority) {
  border-left: 3px solid #ef5350;
}

:deep(.medium-priority) {
  border-left: 3px solid #fb8c00;
}

:deep(.low-priority) {
  border-left: 3px solid #66bb6a;
}

/* Status-based styling */
:deep(.closed-status) {
  opacity: 0.7;
  text-decoration: line-through;
}

:deep(.in-progress-status) {
  border-style: dashed !important;
}

:deep(.fc-event) {
  cursor: pointer;
  transition: transform 0.1s ease;
}

:deep(.fc-event:hover) {
  transform: scale(1.02);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .calendar-wrapper {
    margin: 10px;
    padding: 10px;
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