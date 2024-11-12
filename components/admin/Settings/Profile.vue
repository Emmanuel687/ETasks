<script setup>
// Imports Start
import {useUserStore} from "@/stores/user"
// Imports End

// Store Start
const store = useUserStore();
// Store End

const getInitials = (firstName, lastName) => {
  const firstInitial = firstName?.charAt(0) || ''
  const lastInitial = lastName?.charAt(0) || ''
  return `${firstInitial}${lastInitial}`.toUpperCase()
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <section class="h-full bg-gray-50 rounded-lg shadow-lg p-6">
    <!-- Profile Section -->
    <section class="flex flex-col items-center text-center py-6 space-y-6">
      <!-- Profile Initial Icon -->
      <div class="relative">
        <div class="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
          <span class="text-white font-semibold text-3xl">
            {{ getInitials(store.userProfile.user_metadata.firstName, store.userProfile.user_metadata.lastName) }}
          </span>
        </div>

        <!-- Verified Badge -->
        <div v-if="store.userProfile.user_metadata.email_verified" 
             class="absolute -right-2 -bottom-2 bg-green-500 rounded-full p-1 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <!-- User Info -->
      <div class="space-y-3">
        <!-- Name -->
        <div>
          <h2 class="text-2xl font-bold text-gray-900">
            {{ store.userProfile.user_metadata.firstName }} {{ store.userProfile.user_metadata.lastName }}
          </h2>
          <p class="text-sm text-gray-500">@{{ store.userProfile.user_metadata.userName }}</p>
        </div>

        <!-- Email -->
        <p class="text-sm text-gray-600 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          {{ store.userProfile.email }}
        </p>

        <!-- Account Info -->
        <div class="text-sm text-gray-600">
          <p>Member since: <span class="font-medium">{{ formatDate(store.userProfile.created_at) }}</span></p>
          <p>Last login: <span class="font-medium">{{ formatDate(store.userProfile.last_sign_in_at) }}</span></p>
        </div>

        <!-- Verification Status -->
        <div class="flex items-center justify-center gap-4 text-sm mt-4">
          <!-- Email Verification Status -->
          <span :class="store.userProfile.user_metadata.email_verified ? 'text-green-600 font-medium' : 'text-yellow-600'">
            {{ store.userProfile.user_metadata.email_verified ? 'Email Verified' : 'Email Unverified' }}
          </span>

          <!-- Dividers -->
          <span class="text-gray-300">|</span>

          <!-- Phone Verification Status -->
          <span :class="store.userProfile.user_metadata.phone_verified ? 'text-green-600 font-medium' : 'text-yellow-600'">
            {{ store.userProfile.user_metadata.phone_verified ? 'Phone Verified' : 'Phone Unverified' }}
          </span>
        </div>
      </div>
    </section>

  
  </section>
</template>

<style scoped>
/* Add any custom styles if necessary */
</style>
