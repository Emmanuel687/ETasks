<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Already have an account?
            <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
              Login
            </NuxtLink>
          </p>
        </div>

        <form class="space-y-6 mt-10" @submit.prevent="handleSignup">
          <!-- First Name Field -->
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <div class="mt-1">
              <input id="firstName" name="firstName" type="text" required v-model="firstName"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <!-- Last Name Field -->
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <div class="mt-1">
              <input id="lastName" name="lastName" type="text" required v-model="lastName"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input id="email" name="email" type="email" required v-model="email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input id="password" name="password" type="password" required v-model="password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <button type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :disabled="isLoading">
            {{ isLoading ? 'Signing up...' : 'Sign up' }}
          </button>
        </form>


        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or continue with</span>
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
import { useRouter } from 'vue-router'
// Imports End

// Reactive Variables Start
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
// Reactive Variables End

// Variables Start
const supabase = useSupabaseClient()
const router = useRouter()
// Variables End

// Handle Signup Start
const handleSignup = async () => {
  if (!firstName.value || !lastName.value || !email.value || password.value.length < 6) {
    errorMessage.value = 'Please provide valid details.'
    return
  }

  try {
    isLoading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    const username = `${firstName.value} ${lastName.value}`

    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          username: username, 
          firstName: firstName.value,
          lastName: lastName.value,
        },
      },
    })

    if (error) throw error

    successMessage.value = 'Sign up successful!'
    setTimeout(() => router.push('/login'), 5000)

    firstName.value = ''
    lastName.value = ''
    email.value = ''
    password.value = ''

  } catch (error) {
    errorMessage.value = error.message || 'An error occurred during sign up'
  } finally {
    isLoading.value = false
  }
}
// Handle Signup End

</script>

<style scoped></style>
