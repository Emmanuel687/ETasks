<template>
  <div v-if="user">
    <AdminSidebar />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useSupabaseUser, useRouter } from '#imports'

const user = useSupabaseUser()
const router = useRouter()

// Redirect to login if not authenticated
if (!user.value) {
  router.push('/login')
}
</script>