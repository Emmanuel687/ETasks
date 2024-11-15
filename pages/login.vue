<script setup>
// Imports Start
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCustomToast } from '~/composables/useToast'
// Imports End

// Variables Start
const supabase = useSupabaseClient()
const router = useRouter()
const route = useRoute()
const toast = useCustomToast()
// Variables End

// Reactive Variables Start
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
// Reactive Variables End

// AutoLogin From Signup Start
onMounted(() => {
  if (route.query.autoLogin === 'true') {
    const credentials = sessionStorage.getItem('tempLoginCredentials')
    if (credentials) {
      const { email: storedEmail, password: storedPassword } = JSON.parse(credentials)
      email.value = storedEmail
      password.value = storedPassword
      sessionStorage.removeItem('tempLoginCredentials')
      setTimeout(() => {
        handleLogin()
      }, 1000)
    }
    router.replace({ path: route.path })
  }
})
// AutoLogin From Signup End


// Handle Login Start
const handleLogin = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) {
      handleLoginError(error)
      return
    }

    toast.success('Login Successful')
    router.push('/admin')
  } catch (error) {
    console.error('Unexpected Error during login:', error)
    errorMessage.value = 'An unexpected error occurred.'
    toast.error(errorMessage.value)
  } finally {
    isLoading.value = false
  }
}
// Handle Login End

// Handle Login Error Start
const handleLoginError = (error) => {
  if (error.message.includes('Invalid login credentials')) {
    errorMessage.value = 'Incorrect email or password. Please try again.'
  } else if (error.message.includes('Email not confirmed')) {
    errorMessage.value = 'Please verify your email before logging in.'
  } else if (error.message === 'Email not found') {
    errorMessage.value = 'No account found with this email. Please sign up first.'
  } else if (error.message.includes('Too many requests')) {
    errorMessage.value = 'Too many login attempts. Please try again later.'
  } else {
    errorMessage.value = 'An error occurred during login.'
  }

  toast.error(errorMessage.value)
}
// Handle Login Error End

</script>
<template>
  <section class="min-h-screen bg-white flex justify-center items-center py-12 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-7xl">
      <!-- Sign Up Image Section Start -->
      <section class="hidden lg:flex justify-center items-center">
        <div class="hero-container">
          <img src="/assets/LoginBG.png" alt="Hero Image" class="hero-img" />
        </div>
      </section>
      <!-- Sign Up Image Section End -->



      <!--  Login Form Start -->
      <section class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-10 px-6 shadow-lg rounded-lg sm:px-10">
          <!-- Login Header Start -->
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-4xl font-extrabold text-gray-900">
              Welcome Back
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              Please log in to your account
            </p>
          </div>
          <!-- Login Header End -->

          <!-- Error Message Start -->
          <div v-if="errorMessage" class="mt-4 rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800">{{ errorMessage }}</p>
              </div>
            </div>
          </div>
          <!-- Error Message End -->

          <!-- Login Form Start -->
          <form class="space-y-6 mt-10" @submit.prevent="handleLogin">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div class="mt-1">
                <input id="email" name="email" type="email" autocomplete="email" required v-model="email"
                  class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out" />
              </div>
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="mt-1 relative">
                <input id="password" name="password" :type="showPassword ? 'text' : 'password'" required
                  v-model="password"
                  class="block w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out" />
                <button type="button" @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none">
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2">
                    <path
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span class="sr-only">
                    {{ showPassword ? 'Hide password' : 'Show password' }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" :disabled="isLoading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50">
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              {{ isLoading ? 'Logging in...' : 'Log in' }}
            </button>
          </form>
          <!-- Login Form End -->

          <!-- Sign Up Link Start -->
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <NuxtLink to="/signup" class="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </NuxtLink>
            </p>
          </div>
          <!-- Sign Up Link End -->
        </div>
      </section>
      <!--  Login Form End -->

    </div>
  </section>
</template>
