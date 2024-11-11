
<script setup>
definePageMeta({
  layout: 'admin'
})
</script>


<template>
<section class="grid grid-cols-12 gap-[35px]">
  <!-- Profile Section (No Scroll) -->
  <div class="col-span-4">
    <AdminSettingsProfile />
  </div>

  <!-- Admin Settings Section (Scrollable) -->
  <div class="col-span-8  overflow-y-auto">
    <AdminSettings />
  </div>
</section>

</template>


