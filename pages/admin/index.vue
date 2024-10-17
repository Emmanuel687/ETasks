<script setup>
definePageMeta({
  layout: 'admin'
})

// Reactive Variables Start
const taskItems = ref([
  {
    taskStatus: "All Tasks",
    taskNumber: 3,
    img: '/assets/svgs/completedtasks.svg',
  },
  {
    taskStatus: "Completed Tasks",
    taskNumber: 3,
    img: '/assets/svgs/completedtasks.svg',
  },
  {
    taskStatus: "Pending Tasks",
    taskNumber: 3,
    img: '/assets/svgs/completedtasks.svg',
  }
])
const statuses = ref({
  allTasks: "All Tasks",
  completedTasks: "Completed Tasks",
  pendingTasks: "Pending Tasks"
})
const status = ref()
// Reactive Variables End

// HandleShowTask Start
const handleShowTask = (taskStatus) => {
  status.value = taskStatus
}
// HandleShowTask End

// OnMounted Start

onMounted(() => {
  status.value = statuses.value.allTasks
})
// OnMounted Start
</script>

<template>
  <section class="dashboard rounded-md py-3 p-2 bg-white border ">

    <section class="grid grid-cols-2  sm:grid-cols-12 md:grid-cols-12  lg:grid-cols-12 gap-3">
      <!-- Task Components Start -->
      <section class="grid col-span-8">
        <div>
          <!-- All Task Table Start -->
          <AdminDashboardAllTasks v-if="status === statuses.allTasks" />
          <!-- All Task Table End -->

          <!-- Pending Task Table Start -->
          <AdminDashboardPendingTasks v-if="status === statuses.pendingTasks" />
          <!-- Pending Task Table End -->

          <!-- Completed Tasks Table Start -->
          <AdminDashboardCompletedTasks v-if="status === statuses.completedTasks" />
          <!-- Completed Tasks Table End -->
        </div>
      </section>
      <!-- Task Components End -->

      <!-- Task Category Card Start -->
      <section class="grid col-span-4 border rounded-md p-3 h-[400px]">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
          <div v-for="(task, index) in taskItems" :key="index">
            <Card class="w-full h-[135px] overflow-hidden" @click="handleShowTask(task.taskStatus)">
              <template #title>
                <div class="flex flex-col items-center justify-center h-full mt-[15px]">
                  <!-- Task Title Start -->
                  <h1 class="text-center text-[12px]">{{ task.taskStatus }}</h1>
                  <!-- Task Title End -->

                  <div class="flex items-center justify-center space-x-5">
                    <!-- Task Status Start Icon Start -->
                    <img :src="task.img" class="text-center" alt="Task status icon" />
                    <!-- Task Status Start Icon End -->

                    <!-- Task Number Start -->
                    <p class="!text-[24px] text-indigo-700">{{ task.taskNumber }}</p>
                    <!-- Task Number End -->
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </section>
      <!-- Task Category Card End -->
    </section>

    <!-- Chart Section  Start -->
    <section class="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 !mt-5">
      <!-- <AdminDashboardChartsAnalytics />
      <AdminDashboardChartsGauge /> -->
    </section>
    <!-- Charts Section End -->

  </section>
</template>