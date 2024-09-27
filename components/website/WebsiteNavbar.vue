<template>
  <nav class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="text-xl font-bold">My Website</NuxtLink>
      <div class="space-x-4">
        <NuxtLink to="/" class="hover:text-gray-300">Home</NuxtLink>
        <NuxtLink to="/about" class="hover:text-gray-300">About</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-gray-300">Contact</NuxtLink>
        <template v-if="user">
          <NuxtLink to="/profile" class="hover:text-gray-300">Profile</NuxtLink>
          <button @click="logout" class="hover:text-gray-300">Logout</button>
        </template>
        <NuxtLink v-else to="/login" class="hover:text-gray-300">Login</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

const user = useSupabaseUser()
const { logout } = useAuth()
</script>