<template>
  <div v-if="user" class="flex h-screen bg-gray-100">
    <AdminSidebar class="flex-shrink-0" />
    <main class="flex-grow p-6 overflow-auto">
      <slot />
    </main>
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