<template>
  <div>
    <h1>Admin Dashboard</h1>
    <p>Welcome, {{ user?.email }}</p>
    <!-- Add more dashboard content here -->
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const user = useSupabaseUser()

</script>