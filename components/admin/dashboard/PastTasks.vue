
<script setup>
// Imports Start
import { useUserStore } from "../../../stores/user.js"
import { formatedAssignedToName } from '../../../utils/formatNamed'
// Imports End

// Variables Start
const appStore = useUserStore()
// Variables End




</script>

<template>
  <section class="border rounded-md p-3 h-[450px]">
    <!-- Task Hero Start -->
    <div class="d-card-header mb-4 bottom-1 border-b border-gray-200">
      <h1 class="d-card-title !text-indigo-700">
        Past Tasks
        ({{ appStore.pastTasks.length }})
      </h1>
    </div>
    <!-- Task Hero End -->
    <!-- All Task Table Start -->
    <DataTable :value="appStore.pastTasks" paginator :rows="4" :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 20rem" scrollable scrollHeight="310px">
      <!-- Empty DataTable Start -->
      <template #empty>
        <div>
          <DatatableEmptyDatatable />
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