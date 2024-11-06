<template>
  <!-- Topbar -->
  <header class="bg-white  shadow-sm flex items-center justify-between px-4 h-[55px]">
    <!-- Display user email if logged in -->
    <div>
      <p v-if="user">{{ userProfile?.email || user.email }}</p>
      <p v-else>No user logged in</p>
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

<script setup>
// In Nuxt 3, we use the built-in composables
const user = useSupabaseUser()
const supabase = useSupabaseClient()


// Utility function to get initials
const getInitials = (email) => {
  if (!email) return ''
  return email.charAt(0).toUpperCase()
}
</script>