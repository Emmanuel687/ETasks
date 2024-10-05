<script setup>
definePageMeta({
  layout: 'admin'
})

// Imports Start
// Imports End

// Reactive Variables Start
const openCreateTaskDialog = ref(false)
// Reactive Variables End

// Dummy Data Start
const tasksDummy = ref([
  {
    "_id": "66f66a345dfcb004ce9dd513",
    "assignedTo": [
      {
        "email": "maganga4422@nathandigital.com",
        "first_name": "Maganga",
        "last_name": "Mwambonu",
        "middle_name": "",
        "id": "6686b0dfe560adfa6ddad6d7"
      }
    ],
    "createdBy": {
      "email": "emmanuel@nathandigital.com",
      "first_name": "Emmanuel",
      "last_name": "Mukhebi",
      "middle_name": "Babu",
      "id": "665720c80b127442d8887a77"
    },
    "taskName": "Test 4",
    "description": "<p>Test 5</p>",
    "deadline": "2024-09-29T21:00:00.000Z",
    "isComplete": false,
    "isOverdue": false,
    "priority": "High",
    "isDeleted": false,
    "status": "submitted-for-approval",
    "assignedDate": "2024-09-27T08:17:56.950Z",
    "createdAt": "2024-09-27T08:17:56.951Z",
    "updatedAt": "2024-10-02T17:43:30.418Z",
    "taskId": "TSK-09/24/0019",
    "__v": 0
  },
  {
    "_id": "66f669dd5dfcb004ce9dd47b",
    "assignedTo": [
      {
        "email": "basil@nathandigital.com",
        "first_name": "Basil ",
        "last_name": "Faheem ",
        "middle_name": "Faheem ",
        "id": "665720c20b127442d8887a73"
      }
    ],
    "createdBy": {
      "email": "emmanuel@nathandigital.com",
      "first_name": "Emmanuel",
      "last_name": "Mukhebi",
      "middle_name": "Babu",
      "id": "665720c80b127442d8887a77"
    },
    "taskName": "Test",
    "description": "<p>Test2  <span style=\"color: rgb(73, 80, 87);\">Test3. Test4</span></p>",
    "deadline": "2024-09-29T21:00:00.000Z",
    "isComplete": false,
    "isOverdue": false,
    "priority": "High",
    "isDeleted": false,
    "status": "closed",
    "assignedDate": "2024-09-27T08:16:29.609Z",
    "createdAt": "2024-09-27T08:16:29.610Z",
    "updatedAt": "2024-10-02T08:36:30.090Z",
    "taskId": "TSK-09/24/0018",
    "__v": 0
  },
  {
    "_id": "66f6690c5dfcb004ce9dd46c",
    "assignedTo": [
      {
        "email": "emmanuel@nathandigital.com",
        "first_name": "Emmanuel",
        "last_name": "Mukhebi",
        "middle_name": "Babu",
        "id": "665720c80b127442d8887a77"
      }
    ],
    "createdBy": {
      "email": "emmanuel@nathandigital.com",
      "first_name": "Emmanuel",
      "last_name": "Mukhebi",
      "middle_name": "Babu",
      "id": "665720c80b127442d8887a77"
    },
    "taskName": "Test",
    "description": "<p>Test xcgvhbjnkml,</p>",
    "deadline": "2024-09-07T21:00:00.000Z",
    "isComplete": false,
    "isOverdue": false,
    "priority": "Medium",
    "isDeleted": false,
    "status": "open",
    "assignedDate": "2024-09-27T08:13:00.762Z",
    "createdAt": "2024-09-27T08:13:00.763Z",
    "updatedAt": "2024-09-27T08:51:35.732Z",
    "taskId": "TSK-09/24/0017",
    "__v": 0
  },])
// Dummy Data End


</script>

<template>
  <section class="dashboard rounded-md py-3 bg-white">
    <!-- My Tasks Header Start -->
    <section class="flex justify-between items-end border-b-2 pb-1 px-3 mb-3">
      <h1 class="text-lg text-[#3494ff] font-semibold">
        My Tasks
      </h1>

      <button class="btn-primary" @click="openCreateTaskDialog = true">
        <i class="pi pi-plus"></i>
        New Task
      </button>
    </section>
    <!-- My Tasks Header End -->

    <!-- Create Tasks Dialog Start -->
    <section>
      <AdminTasksCreateTask :openCreateTaskDialog="openCreateTaskDialog" @close="() => openCreateTaskDialog = false" />
    </section>
    <!-- Create Tasks Dialog End -->

    <!-- Task List Start -->
    <section>
      <AdminTasks :tasks="tasksDummy" />
    </section>
    <!-- Task List End -->



  </section>
</template>

