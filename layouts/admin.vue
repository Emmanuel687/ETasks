<template>
  <div v-if="user" class="flex h-screen !w-full bg-gray-100">
    <!-- Sidebar -->
    <AdminSidebar class="flex-shrink-0" />

    <!-- Main content area with topbar -->
    <div class="flex-grow flex flex-col">
      <AdminTopBar />
      <!-- Main content -->
      <main class="flex-grow p-6 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>


<script setup>
import { useSupabaseUser, useRouter } from '#imports'
import AdminSidebar from '~/components/admin/AdminSidebar.vue'

const user = useSupabaseUser()
const router = useRouter()

// Redirect to login if not authenticated
if (!user.value) {
  router.push('/login')
}
</script>