<template>
  <div
    class="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
    <NuxtLink to="/admin" class="text-white flex items-center space-x-2 px-4">
      <span class="text-2xl font-extrabold">Admin Panel</span>
    </NuxtLink>
    <nav>
      <NuxtLink to="/admin" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
        Dashboard
      </NuxtLink>
      <NuxtLink to="/admin/users" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
        Users
      </NuxtLink>
      <NuxtLink to="/admin/settings" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
        Settings
      </NuxtLink>
      <button @click="handleLogout">Logout</button>

    </nav>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

const isAdminRoute = computed(() => route.path.startsWith('/admin'))

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    router.push('/')
  } else {
    console.error('Error during logout:', error)
  }
}
</script>