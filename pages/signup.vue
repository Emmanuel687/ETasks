<script setup>
// Imports Start
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCustomToast } from '~/composables/useToast'
// Imports End

// Reactive Variables Start
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const agreeToTerms = ref(false)
// Reactive Variables End

// Variables Start
const supabase = useSupabaseClient()
const router = useRouter()
const toast = useCustomToast()
// Variables End

// Validation Functions Start
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePassword = (password) => {
  return password.length >= 6
}



const validateForm = () => {


  if (!firstName.value || !lastName.value) {
    errorMessage.value = 'Please enter your full name.'
    return false
  }

  if (!email.value || !validateEmail(email.value)) {
    errorMessage.value = 'Please enter a valid email address.'
    return false
  }

  if (!validatePassword(password.value)) {
    errorMessage.value = 'Password must be at least 6 characters long.'
    return false
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return false
  }

  if (!agreeToTerms.value) {
    errorMessage.value = 'Please agree to the Terms and Conditions.'
    return false
  }

  return true
}
// Validation Functions End

// Handle Signup Start
const handleSignup = async () => {
  if (!validateForm()) {
    toast.error(errorMessage.value)
    return
  }

  try {
    isLoading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          firstName: firstName.value,
          lastName: lastName.value,
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    })

    if (error) throw error

    // Store credentials temporarily
    sessionStorage.setItem('tempLoginCredentials', JSON.stringify({
      email: email.value,
      password: password.value
    }))

    // Success message
    successMessage.value = `
    User Created successfully
    `
    toast.success('User Created Successfully')

    // Clear form
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    agreeToTerms.value = false

    // Redirect after delay
    setTimeout(() => {
      router.push('/login?autoLogin=true')
    }, 5000)

  } catch (error) {
    console.error('Signup error:', error)
    if (error.message.includes('unique constraint') || error.message.includes('already registered')) {
      errorMessage.value = 'This email is already registered. Please login instead.'
    } else {
      errorMessage.value = error.message || 'An error occurred during sign up'
    }
    toast.error(errorMessage.value)
  } finally {
    isLoading.value = false
  }
}
// Handle Signup End
</script>


<template>
  <section class="min-h-screen bg-white flex justify-center items-center py-12 sm:px-6 lg:px-8">
    <section class="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-7xl">
      <!-- Sign Up Image Section Start -->
      <section class="hidden lg:flex justify-center items-center">
        <div class="hero-container">
          <img src="/assets/SignUpBG.png" alt="Hero Image" class="hero-img" />
        </div>
      </section>
      <!-- Sign Up Image Section End -->


      <!-- Sign Up Form Section Start -->
      <section class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

          <!-- Hero Section Start -->
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              Already have an account?
              <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Login</NuxtLink>
            </p>
          </div>
          <!-- Hero Section End -->


          <form class="space-y-6 mt-8" @submit.prevent="handleSignup">

            <!-- First Name Start Field -->
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
              <div class="mt-1">
                <input id="firstName" name="firstName" type="text" required v-model="firstName"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
            <!-- First Name End Field -->


            <!-- Last Name Start Field -->
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
              <div class="mt-1">
                <input id="lastName" name="lastName" type="text" required v-model="lastName"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
            <!-- Last Name End Field -->


            <!-- Email Start Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
              <div class="mt-1">
                <input id="email" name="email" type="email" autocomplete="email" required v-model="email"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
            <!-- Email End Field -->


            <!-- Password Start Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="mt-1 relative">
                <input id="password" name="password" :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password" required v-model="password"
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
            <!-- Password End Field -->


            <!-- Confirm Password Start Field -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div class="mt-1 relative">
                <input id="confirmPassword" name="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                  required v-model="confirmPassword"
                  class="block w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out" />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none">
                  <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"
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
                    {{ showConfirmPassword ? 'Hide password' : 'Show password' }}
                  </span>
                </button>
              </div>
            </div>
            <!-- Confirm Password End Field -->


            <!-- Terms & Conditions Checkbox Start -->
            <div class="flex items-center">
              <input id="agreeToTerms" name="agreeToTerms" type="checkbox" v-model="agreeToTerms"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label for="agreeToTerms" class="ml-2 block text-sm text-gray-900">
                I agree to the <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Terms and
                  Conditions</a>
              </label>
            </div>
            <!-- Terms & Conditions Checkbox End -->


            <!-- Error Message Start -->
            <div v-if="errorMessage" class="text-sm text-red-600 mt-2">
              <p>{{ errorMessage }}</p>
            </div>
            <!-- Error Message End -->


            <!-- Success Message Start -->
            <div v-if="successMessage" class="text-sm text-green-600 mt-2">
              <p>{{ successMessage }}</p>
            </div>
            <!-- Success Message End -->

            <!-- Submit Button Start -->
            <div>
              <button type="submit" :disabled="isLoading"
                class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
                <span v-if="isLoading">Processing</span>
                <span v-else>Sign Up</span>
              </button>
            </div>
            <!-- Submit Button End -->
          </form>
        </div>
      </section>
      <!-- Sign Up Form Section End -->
    </section>

  </section>
</template>
