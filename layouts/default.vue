<template>
  <div>
    <WebsiteNavbar />

    <div class="flex">
      <!-- Admin Sidebar (only shown on admin routes for authenticated users) -->
      <AdminSidebar v-if="isAdminRoute && user" />

      <!-- Main content area -->
      <main class="flex-1">
        <div v-if="isAdminRoute && user" class="bg-gray-100 p-4">
          <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
        </div>

        <div class="container mx-auto px-4 py-8">
          <NuxtPage />
        </div>
      </main>
    </div>

    <WebsiteFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'

const route = useRoute()
const userStore = useUserStore()

const user = computed(() => userStore.user)
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>