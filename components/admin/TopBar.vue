<script setup>
// Imports Start
import { useUserStore } from "@/stores/user"
import { useUserProfile } from "@/composables/useUserProfile"
// Imports End

// Variables Start
const user = useSupabaseUser()
const userProfile = useUserProfile()
// Variables End

// Store Start
const store = useUserStore();
// Store End

// Utility function to get initials
const getInitials = (email) => {
  if (!email) return ''
  return email.charAt(0).toUpperCase()
}
</script>


<template>
  <!-- Topbar -->
  <header class="bg-white  shadow-sm flex items-center justify-between px-4 h-[55px]">
    <div>
      <p v-if="user" class="text-sm font-medium text-gray-700">
        Welcome back,
        <span class="text-indigo-600 font-bold"> {{ store.userProfile.user_metadata.firstName }} {{
          store.userProfile.user_metadata.lastName }}
        </span>!
      </p>
      <p v-else class="text-sm font-medium text-gray-500 italic">
        No user logged in.
      </p>

    </div>



    <!-- User avatar with initials -->
    <div v-if="user" class="flex justify-end">
      <div class="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
        <span class="text-white font-medium">
          {{ getInitials(user.email) }}



        </span>
      </div>
    </div>
  </header>
</template>
