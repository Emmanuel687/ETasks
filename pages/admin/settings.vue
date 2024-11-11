
<script setup>
definePageMeta({
  layout: 'admin'
})
</script>


<template>
<section class="grid lg:grid-cols-12  gap-[10px] lg:gap-[35px]">
  <!-- Profile Section (No Scroll) -->
  <div class="lg:col-span-4">
    <AdminSettingsProfile />
  </div>

  <!-- Admin Settings Section (Scrollable) -->
  <div class="lg:col-span-8  overflow-y-auto">
    <AdminSettings />
  </div>
</section>

</template>


