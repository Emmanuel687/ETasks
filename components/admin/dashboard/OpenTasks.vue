
<script setup>
// Imports Start
import { useUserStore } from "../../../stores/user.js"
import { formatedAssignedToName } from '../../../utils/formatNamed'
// Imports End

// Variables Start
const appStore = useUserStore()
const tasks = computed(() => appStore.tasks)
// Variables End


// Pending Tasks
const pendingTasks = computed(() => tasks.value.filter(task => task.status === 'open'))
// Pending Tasks

// OnMounted Start
onMounted(() => {
  appStore.fetchTasks()
})
// OnMounted End



</script>

<template>
  <section class="border rounded-md p-3 h-[450px] open-tasks">
    <!-- Task Hero Start -->
    <div class="d-card-header">
      <h1 class="d-card-title !text-indigo-700">
        Open Tasks
        ({{ pendingTasks.length }})
      </h1>
    </div>
    <!-- Task Hero End -->
    <!-- All Task Table Start -->
    <DataTable :value="pendingTasks" paginator :rows="4" :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 20rem" scrollable scrollHeight="310px">
      <!-- Empty DataTable Start -->
      <template #empty>
        <div>
          <DatatableEmptyDatatable :taskStatus="'Open'" />
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

  </section>
</template>

<style></style>