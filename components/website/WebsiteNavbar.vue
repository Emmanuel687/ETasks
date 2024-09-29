<script setup>
import { ref, computed } from 'vue'
import { useSupabaseUser, useSupabaseClient, useRouter } from '#imports'

const navLinks = ref([
  { name: 'Overview', path: '/' },
  { name: 'Features', path: '/features' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact Us', path: '/contact' },
]);

const user = useSupabaseUser()
const isLoggedIn = computed(() => !!user.value)
const supabase = useSupabaseClient()
const router = useRouter()
const isOpen = ref(false)

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    router.push('/')
    isOpen.value = false
  } else {
    console.error('Error during logout:', error)
  }
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <nav class="bg-white shadow-md fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-18">
        <!-- Logo Section -->
        <div class="flex-shrink-0">
          <a href="/" class="flex items-center">
            <img alt="logo" src="/public/assets/svgs/Icons/BORCELLE STUDIO.png" class="w-[90px] h-auto" />
          </a>
        </div>

        <!-- Centered Desktop Navigation Links -->
        <div class="hidden md:flex flex-1 justify-center">
          <div class="flex space-x-4">
            <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path"
              class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              {{ link.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- Desktop Auth Buttons -->
        <div class="hidden md:block">
          <div class="flex items-center space-x-4">
            <template v-if="!isLoggedIn">
              <NuxtLink to="/login"
                class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </NuxtLink>
              <NuxtLink to="/signup"
                class="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                Sign Up
              </NuxtLink>
            </template>
            <button v-else @click="handleLogout"
              class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Logout
            </button>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="toggleMenu" type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-controls="mobile-menu" :aria-expanded="isOpen">
            <span class="sr-only">Open main menu</span>
            <svg v-if="!isOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="isOpen" class="md:hidden fixed inset-0 z-50 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full"
      @click="toggleMenu">
      <!-- Mobile menu content -->
      <div class="bg-white w-full max-w-sm p-6 overflow-y-auto h-full transition-all duration-300 ease-in-out"
        :class="{ 'translate-x-0': isOpen, '-translate-x-full': !isOpen }" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Menu</h2>
          <button @click="toggleMenu" class="text-gray-600 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <nav class="mb-8">
          <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path" @click="toggleMenu"
            class="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out">
            {{ link.name }}
          </NuxtLink>
        </nav>

        <div class="border-t border-gray-200 pt-6">
          <template v-if="!isLoggedIn">
            <NuxtLink to="/login" @click="toggleMenu"
              class="block w-full text-center py-2 px-4 mb-3 text-gray-800 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out">
              Login
            </NuxtLink>
            <NuxtLink to="/signup" @click="toggleMenu"
              class="block w-full text-center py-2 px-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md transition duration-150 ease-in-out">
              Sign Up
            </NuxtLink>
          </template>
          <button v-else @click="handleLogout"
            class="block w-full text-center py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>