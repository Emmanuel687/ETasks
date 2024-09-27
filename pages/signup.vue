<template>
  <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Sign Up</h1>
    <form @submit.prevent="handleSignup">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input id="email" v-model="email" type="email" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input id="password" v-model="password" type="password" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div class="mb-4">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input id="confirmPassword" v-model="confirmPassword" type="password" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div class="mt-6">
        <button type="submit"
          class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          :disabled="loading">
          {{ loading ? 'Signing up...' : 'Sign Up' }}
        </button>
      </div>
    </form>
    <p v-if="error" class="mt-4 text-red-600 text-sm">{{ error }}</p>
    <p class="mt-4 text-sm text-gray-600 text-center">
      Already have an account?
      <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
        Log in
      </NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'

const supabase = useSupabaseClient()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

const handleSignup = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords don't match"
    return
  }

  loading.value = true
  error.value = ''

  try {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })

    if (signUpError) throw signUpError

    if (data.user) {
      userStore.setUser(data.user)
      navigateTo('/') // or '/profile' if you have a profile page
    } else {
      error.value = "Signup successful. Please check your email to confirm your account."
    }
  } catch (e) {
    error.value = e.message || 'An error occurred during signup'
  } finally {
    loading.value = false
  }
}
</script>