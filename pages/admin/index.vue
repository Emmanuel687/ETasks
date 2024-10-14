<template>
  <section class="dashboard rounded-md py-3 bg-white">
    <div class="grid-cols-1 lg:grid-cols-2 gap-3" style="display: grid">
      <!-- All Task Table Start -->
      <AdminDashboardAllTasks />
      <!-- All Task Table End -->

      <!-- Pending Task Table Start -->
      <AdminDashboardPendingTasks />
      <!-- Pending Task Table End -->

      <!-- Completed Tasks Table Start -->
      <AdminDashboardCompletedTasks />
      <!-- Completed Tasks Table End -->

      <!-- Charts Start-->
      <AdminDashboardChartsAnalytics />
      <!-- Charts Start-->
    </div>







  </section>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})





</script>