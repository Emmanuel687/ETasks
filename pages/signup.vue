<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSignup">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input id="email" name="email" type="email" autocomplete="email" required v-model="email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input id="password" name="password" type="password" autocomplete="new-password" required v-model="password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <button type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign up
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-3 gap-3">
            <!-- Add social signup buttons here if needed -->
          </div>
        </div>
      </div>
    </div>

    <p v-if="errorMessage" class="mt-2 text-center text-sm text-red-600">
      {{ errorMessage }}
    </p>

    <p v-if="successMessage" class="mt-2 text-center text-sm text-green-600">
      {{ successMessage }}
    </p>
  </div>
</template>

<script setup>
// Imports Start
import { useSupabaseClient, useRouter } from '#imports'
// Imports End

// Receive Props Start
// Receive Props End

// Variables Start
const supabase = useSupabaseClient()
const router = useRouter()
// Variables Start

// Reactive Variable Start

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
// Reactive Variable End


// Handle Sign Up Start
const handleSignup = async () => {
  try {
    errorMessage.value = '' // Clear any previous error messages
    successMessage.value = '' // Clear any previous success messages
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    // Handle successful signup
    successMessage.value = 'Sign up successful! Please check your email to verify your account.'
    // You might want to redirect after a short delay or let the user click a link to login
    // setTimeout(() => router.push('/login'), 5000)
  } catch (error) {
    // Handle error
    console.error('Error signing up:', error)
    errorMessage.value = error.message || 'An error occurred during sign up'
  }
}
// Handle Sign Up End

</script>