<template>
  <div>
    <!-- Mobile menu button -->
    <div class="lg:hidden fixed top-0 left-0 m-4 z-20">
      <button @click="isOpen = !isOpen" class="text-white focus:outline-none">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Sidebar -->
    <div :class="[
      'bg-white text-black w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      'fixed lg:static z-10'
    ]">
      <div class="p-4">
        <NuxtLink to="/admin" class="flex items-center space-x-2">
          <div class="flex-shrink-0">
            <a href="/" class="flex items-center">
              <img alt="logo" src="/public/assets/svgs/Icons/BORCELLE STUDIO.png" class="w-[90px] h-auto" />
            </a>
          </div>

          <span class="text-2xl font-bold">Admin Panel</span>
        </NuxtLink>
      </div>
      <nav class="flex-1 px-2 py-4 space-y-2">
        <NuxtLink to="/admin"
          class="flex items-center space-x-2 px-4 py-3 rounded transition duration-200 hover:bg-gray-100 hover:text-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#4CAF50">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Dashboard</span>
        </NuxtLink>

        <NuxtLink to="/admin/tasks"
          class="flex items-center space-x-2 px-4 py-3 rounded transition duration-200 hover:bg-gray-100 hover:text-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FF5733">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>Tasks</span>
        </NuxtLink>

        <NuxtLink to="/admin/settings"
          class="flex items-center space-x-2 px-4 py-3 rounded transition duration-200 hover:bg-gray-100 hover:text-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFC300">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Settings</span>
        </NuxtLink>

      </nav>
      <div class="p-4">
        <button @click="handleLogout"
          class="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white text-indigo-600 rounded  transition duration-200 border-indigo-600 border">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>

    <!-- Overlay -->
    <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

const isOpen = ref(false)
const isAdminRoute = computed(() => route.path.startsWith('/admin'))

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error


    await router.push('/')

    // Optionally, show a success message
    // toast.success('Logged out successfully')
  } catch (error) {
    console.error('Error during logout:', error)
    // Show error to user
    // toast.error('Failed to log out. Please try again.')
  }
}

// Close sidebar when route changes (for mobile)
watch(() => route.path, () => {
  isOpen.value = false
})
</script>