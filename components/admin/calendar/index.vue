<template>
  <div class="calendar-wrapper">

    {{ appStore.tasks }}
    <FullCalendar :options="calendarOptions" class="calendar" />
  </div>
</template>

<script setup>

// Imports Start
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useUserStore } from "@/stores/user"
// Imports End


// Reactive Variables Start
const events = ref([
  {
    id: 1,
    title: 'Meeting',
    start: '2024-01-01T10:00:00',
    end: '2024-01-01T12:00:00'
  },
  {
    id: 2,
    title: 'Conference',
    start: '2024-01-15',
    end: '2024-01-17'
  }
])
// Reactive Variables End

// Variables  Start
const appStore = useUserStore()
const calendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  events: events.value,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  // Event handlers
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents,
  eventDrop: handleEventDrop,
  eventResize: handleEventResize
}

// Variables  Start


// Event handlers
function handleDateSelect(selectInfo) {
  const title = prompt('Please enter a title for the event:')
  if (title) {
    const newEvent = {
      id: Date.now(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    }
    events.value.push(newEvent)
  }
}

function handleEventClick(clickInfo) {
  if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
    clickInfo.event.remove()
    events.value = events.value.filter(event => event.id !== clickInfo.event.id)
  }
}

function handleEvents(events) {
  // Handle events update
  console.log('Events updated:', events)
}

function handleEventDrop(dropInfo) {
  // Handle event drag and drop
  const { event } = dropInfo
  const updatedEvent = events.value.find(e => e.id === parseInt(event.id))
  if (updatedEvent) {
    updatedEvent.start = event.startStr
    updatedEvent.end = event.endStr
  }
}

function handleEventResize(resizeInfo) {
  // Handle event resize
  const { event } = resizeInfo
  const updatedEvent = events.value.find(e => e.id === parseInt(event.id))
  if (updatedEvent) {
    updatedEvent.end = event.endStr
  }
}
</script>

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
  /* Full Calendar customization */
  --fc-border-color: #e5e7eb;
  --fc-button-bg-color: #1976D2;
  --fc-button-border-color: #1976D2;
  --fc-button-hover-bg-color: #1565C0;
  --fc-button-hover-border-color: #1565C0;
  --fc-button-active-bg-color: #1565C0;
  --fc-button-active-border-color: #1565C0;
}

:deep(.fc-button) {
  text-transform: capitalize !important;
}

:deep(.fc-event) {
  cursor: pointer;
  padding: 2px 4px;
}

:deep(.fc-event:hover) {
  opacity: 0.9;
}
</style>
