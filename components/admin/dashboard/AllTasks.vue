<script setup>
// Imports Start
import { useTaskStore } from "../../../stores/tasks.js"  // Updated import
import { formatedAssignedToName } from '../../../utils/formatNamed'
// Imports End

// Reactive Variables Start
const openCreateTaskDialog = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
// Reactive Variables End

// Store initialization
const taskStore = useTaskStore()  // Updated store name

// Computed properties
const tasks = computed(() => taskStore.tasks)
const loading = computed(() => taskStore.loading)

// Methods
const handleCreateTask = async () => {
  openCreateTaskDialog.value = false
  await taskStore.fetchTasks(searchQuery.value, statusFilter.value)
}

// Lifecycle hooks
onMounted(async () => {
  await taskStore.fetchTasks(searchQuery.value, statusFilter.value)
})
</script>

<template>
  <section class="border rounded-md p-3 h-[450px] all-tasks">
    <!-- Task Hero Start -->
    <div class="d-card-header">
      <h1 class="d-card-title !text-indigo-700">
        All Tasks
        ({{ tasks.length }})
      </h1>

      <button 
        class="btn-primary !bg-indigo-700 border-indigo-700 hover:bg-indigo-600"
        @click="openCreateTaskDialog = true"
      >
        <i class="pi pi-plus"></i>
       Create Task
      </button>
    </div>
    <!-- Task Hero End -->

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <span class="loading">Loading tasks...</span>
    </div>

    <!-- All Task Table Start -->
    <DataTable
      v-else
      :value="tasks"
      paginator
      :rows="4"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 20rem"
      scrollable
      scrollHeight="310px"
    >
      <!-- Empty DataTable Start -->
      <template #empty>
        <div>
          <DatatableEmptyDatatable :taskStatus="'Created'" />
        </div>
      </template>
      <!-- Empty DataTable End -->

      <!-- TaskName Start -->
      <Column field="taskName" header="Task Name"></Column>
      <!-- TaskName End -->

      <!-- Task Description Start -->
      <Column field="description" header="Task Description">
        <template #body="slotProps">
          <span v-html="slotProps.data.description" />
        </template>
      </Column>
      <!-- Task Description End -->

      <!-- Deadline Start -->
      <Column field="deadline" header="Deadline"></Column>
      <!-- Deadline End -->

      <!--Task Priority Start -->
      <Column field="priority" header="Priority"></Column>
      <!--Task Priority End -->
    </DataTable>
    <!-- All Task Table End -->

    <!-- Create Tasks Dialog Start -->
    <section>
      <AdminTasksCreateTask
        :openCreateTaskDialog="openCreateTaskDialog"
        @close="openCreateTaskDialog = false"
        @fetchTasks="handleCreateTask"
      />
    </section>
    <!-- Create Tasks Dialog End -->
  </section>
</template>

<style scoped>
.loading {
  @apply text-gray-600 text-lg;
}
</style>