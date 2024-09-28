<template>
  <nav>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/about">About</NuxtLink>
    <NuxtLink to="/contact">Contact</NuxtLink>
    <NuxtLink v-if="!userState" to="/login">Login</NuxtLink>
    <NuxtLink v-if="!userState" to="/signup">Sign Up</NuxtLink>
    <a v-if="userState" @click="handleLogout">Logout</a>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useSupabaseUser, useSupabaseClient, useRouter } from '#imports'

const user = useSupabaseUser()
const userState = computed(() => user.value)
const supabase = useSupabaseClient()
const router = useRouter()

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    router.push('/')
  } else {
    console.error('Error during logout:', error)
  }
}

console.log('WebsiteNavbar component loaded')
</script>