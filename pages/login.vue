<template>
  <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" v-model="email" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" v-model="password" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div class="flex items-center justify-between">
        <button type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
        <NuxtLink to="/forgot-password" class="text-sm text-blue-500 hover:text-blue-700">
          Forgot Password?
        </NuxtLink>
      </div>
    </form>
    <p v-if="error" class="text-red-500 mt-4 text-sm">{{ error }}</p>
    <p class="mt-4 text-sm text-gray-600 text-center">
      Don't have an account?
      <NuxtLink to="/signup" class="font-medium text-blue-600 hover:text-blue-500">
        Sign up
      </NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import { useUserStore } from '~/stores/user'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const supabase = useSupabaseClient()
const userStore = useUserStore()
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (loginError) throw loginError

    if (data.user) {
      // Set user in store
      userStore.setUser(data.user)

      // Check for admin status in user metadata
      const isAdmin = data.user.user_metadata?.is_admin === true
      userStore.setIsAdmin(isAdmin)

      // Redirect based on admin status
      if (isAdmin) {
        router.push('/admin')
      } else {
        router.push('/')
      }
    }
  } catch (e) {
    error.value = e.message || 'An error occurred during login'
  } finally {
    loading.value = false
  }
}
</script>