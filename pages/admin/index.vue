<script setup>
definePageMeta({
  layout: 'admin'
})
// Imports Start
import { useUserStore } from '@/stores/user'
// Imports End

// Store Start
const appStore = useUserStore()
// Store End

// Reactive Variables Start
const taskItems = ref([
  {
    taskStatus: "All Tasks",
    taskNumber: appStore.tasks.length,
    img: '/assets/svgs/completedtasks.svg',
  },
  {
    taskStatus: "Open Tasks",
    taskNumber: appStore.pendingTasks.length,
    img: '/assets/svgs/completedtasks.svg',
  },
  {
    taskStatus: "Completed Tasks",
    taskNumber: appStore.completedTasks.length,
    img: '/assets/svgs/completedtasks.svg',
  },
  {
    taskStatus: "Inprogress Tasks",
    taskNumber: appStore.inProgressTasks.length,
    img: '/assets/svgs/completedtasks.svg',
  },


])
const statuses = ref({
  allTasks: "All Tasks",
  openTasks: "Open Tasks",
  inProgressTasks: "Inprogress Tasks",
  completedTasks: "Completed Tasks"
})
const status = ref()
const value = ref(40);

// Reactive Variables End


// HandleShowTask Start
const handleShowTask = (taskStatus) => {
  status.value = taskStatus
}
// HandleShowTask End
// Get Task Styles Start
const getTaskStyles = (status) => {
  return {
    'bg-gradient-to-br from-amber-200 to-orange-150 border border-amber-250 uppercase':
      status === 'All Tasks',

    'bg-gradient-to-br from-emerald-200 to-teal-150 border border-emerald-100 uppercase':
      status === 'Completed Tasks',

    'bg-gradient-to-br from-blue-200 to-indigo-150 border border-blue-80 uppercase':
      status === 'Open Tasks',

    'bg-gradient-to-br from-purple-200 to-indigo-150 border border-purple-100 uppercase':
      status === 'Inprogress Tasks',
  }
}
// Get Task Styles End

// Get Task Title Text Styles Start
const getTitleStyles = (status) => {
  return {
    'text-amber-800': status === 'All Tasks',
    'text-emerald-800': status === 'Completed Tasks',
    'text-blue-800': status === 'Open Tasks',
    'text-purple-800': status === 'Inprogress Tasks',
  }
}
// Get Task Title Text Styles End

// Get Icon Background Styles Start
const getIconBgStyles = (status) => {
  return {
    'bg-amber-100': status === 'All Tasks',
    'bg-emerald-100': status === 'Completed Tasks',
    'bg-blue-100': status === 'Open Tasks',
    'bg-purple-100': status === 'Inprogress Tasks',
  }
}
// Get Icon Background Styles End

// Get Task Number Text Styles Start
const getNumberStyles = (status) => {
  return {
    'text-amber-700': status === 'All Tasks',
    'text-emerald-700': status === 'Completed Tasks',
    'text-blue-700': status === 'Open Tasks',
    'text-purple-700': status === 'Inprogress Tasks',
  }
}
// Get Task Number Text Styles End


// OnMounted Start
onMounted(() => {
  status.value = statuses.value.allTasks
})
// OnMounted Start
</script>

<template>
  <section class="dashboard rounded-md py-3 p-2 h-full bg-white border overflow-x-auto ">

    <!-- Task Category Card Desktop View Start -->
    <section class="hidden md:grid col-span-4">
      <div class="grid grid-cols-4 gap-6">
        <div v-for="(task, index) in taskItems" :key="index">
          <!-- Task Card Start -->
          <div
            class="w-full h-[135px] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg"
            :class="getTaskStyles(task.taskStatus)" @click="handleShowTask(task.taskStatus)">
            <div class="flex items-center justify-between h-full p-6 relative">
              <!-- Task Status Icon Start -->
              <div class="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                :class="getIconBgStyles(task.taskStatus)">
                <img :src="task.img" class="w-8 h-8" alt="Task status icon" />
              </div>
              <!-- Task Status Icon End -->

              <div class="flex flex-col items-end">
                <!-- Task Title Start -->
                <h1 class="text-[17px] font-medium mb-1" :class="getTitleStyles(task.taskStatus)">
                  {{ task.taskStatus }}
                </h1>
                <!-- Task Title End -->

                <!-- Task Number Start -->
                <p class="text-[16px] font-bold" :class="getNumberStyles(task.taskStatus)">
                  {{ task.taskNumber }}
                </p>
                <!-- Task Number Start -->



              </div>
            </div>
          </div>
          <!-- Task Card End -->
        </div>
      </div>
    </section>
    <!-- Task Category Card Desktop View End -->


    <!-- Task Category Card Mobile View Start  -->
    <section class="md:hidden">
      <div class="flex gap-5">
        <div v-for="(task, index) in taskItems" :key="index" @click="handleShowTask(task.taskStatus)" :class="{
          'bg-yellow-100 border-yellow-300 text-yellow-700': task.taskStatus === 'All Tasks',
          'bg-green-100 border-green-300 text-green-700': task.taskStatus === 'Completed Tasks',
          'bg-indigo-100 border-indigo-300 text-indigo-700': task.taskStatus === 'Open Tasks'
        }"
          class="group inline-flex items-center rounded-lg px-4 py-2 cursor-pointer border transition-all duration-200 w-full">
          <div class="flex space-x-3">
            <h1 class="text-xs">{{ task.taskStatus }}</h1>
            <p class="text-sm font-semibold">{{ task.taskNumber }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- Task Category Card Mobile View End  -->




    <section class="mt-[10px]">
      <!-- All Task Table Start -->
      <AdminDashboardAllTasks v-if="status === statuses.allTasks" />
      <!-- All Task Table End -->

      <!-- Open Task Table Start -->
      <AdminDashboardOpenTasks v-if="status === statuses.openTasks" />
      <!-- Open Task Table End -->

      <!-- Inprogress Tasks Table Start -->
      <AdminDashboardInProgressTasks v-if="status === statuses.inProgressTasks" />
      <!-- Inprogress Tasks Table End -->

      <!-- Completed Tasks Table Start -->
      <AdminDashboardCompletedTasks v-if="status === statuses.completedTasks" />
      <!-- Completed Tasks Table End -->
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-12 gap-2">





      <!-- Task Info Card  Start -->
      <section class="lg:col-span-8 mt-[10px]">
        <!-- Past Tasks Section  Start -->
        <section>
          <AdminDashboardPastTasks />
        </section>
        <!-- Past Tasks Section  End -->
      </section>
      <!-- Task Info Card End -->

      <!-- Chart Section  Start -->
      <section class="lg:col-span-4 mt-[10px]">
        <AdminDashboardChartsGauge />
      </section>
      <!-- Charts Section End -->
    </section>








  </section>
</template>