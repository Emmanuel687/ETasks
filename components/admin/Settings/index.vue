<template>
  <section class="dashboard rounded-md py-3 p-2 h-full bg-white border overflow-x-auto">
    <!-- Account Information Section -->
    <section class="account-info bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-gray-800 border-b pb-3">Account Information</h2>
      <div class="mt-6 space-y-4">
        <form @submit.prevent="updateProfile" class="space-y-6">
          <div class="flex flex-col">
            <label for="firstName" class="text-sm font-medium text-gray-700">First Name</label>
            <input v-model="firstName" id="firstName" class="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your first name" />
          </div>
          <div class="flex flex-col">
            <label for="lastName" class="text-sm font-medium text-gray-700">Last Name</label>
            <input v-model="lastName" id="lastName" class="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your last name" />
          </div>
          <div class="flex flex-col">
            <label for="email" class="text-sm font-medium text-gray-700">Email</label>
            <input v-model="email" id="email" type="email" class="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 cursor-not-allowed" disabled />
          </div>
          <button type="submit" class="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">Save Changes</button>
        </form>
      </div>
    </section>

    <!-- Change Password Section -->
    <section class="change-password mt-12 bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-gray-800 border-b pb-3">Change Password</h2>
      <div class="mt-6 space-y-4">
        <form @submit.prevent="updatePassword" class="space-y-6">
          <div class="flex flex-col">
            <label for="currentPassword" class="text-sm font-medium text-gray-700">Current Password</label>
            <input v-model="currentPassword" id="currentPassword" type="password" class="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter current password" />
          </div>
          <div class="flex flex-col">
            <label for="newPassword" class="text-sm font-medium text-gray-700">New Password</label>
            <input v-model="newPassword" id="newPassword" type="password" class="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter new password" />
          </div>
          <div class="flex flex-col">
            <label for="confirmPassword" class="text-sm font-medium text-gray-700">Confirm New Password</label>
            <input v-model="confirmPassword" id="confirmPassword" type="password" class="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Confirm new password" />
          </div>
          <button type="submit" class="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">Update Password</button>
        </form>
      </div>
    </section>

    <!-- Delete Account Section -->
    <section class="delete-account mt-12 bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-red-600 border-b pb-3">Delete Account</h2>
      <p class="mt-4 text-gray-700">Once you delete your account, there is no going back. Please be certain.</p>
      <button @click="deleteAccount" class="w-full py-3 mt-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">Delete Account</button>
    </section>
  </section>
</template>

<script setup>
// Imports
import { ref } from 'vue'
// import { useSupabaseClient } from '@supabase/supabase-js'

// Supabase Client
const supabase = useSupabaseClient()

// Sample data (replace with fetched user data)
const firstName = ref('John')
const lastName = ref('Doe')
const email = ref('johndoe@example.com')
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// Fetch user profile on mount (replace 'John' and 'Doe' with actual fetched data)
onMounted(async () => {
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Error fetching user data:', error)
    return
  }

  // Set user info based on fetched data
  firstName.value = user?.user_metadata?.firstName || ''
  lastName.value = user?.user_metadata?.lastName || ''
  email.value = user?.email || ''
})

// Update profile information
const updateProfile = async () => {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      firstName: firstName.value,
      lastName: lastName.value,
    }
  })

  if (error) {
    console.error('Error updating profile:', error)
  } else {
    console.log('Profile updated successfully!')
  }
}

// Update password
const updatePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert('New password and confirmation password do not match.')
    return
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword.value
  })

  if (error) {
    console.error('Error updating password:', error)
  } else {
    console.log('Password updated successfully!')
  }
}

// Delete account
const deleteAccount = async () => {
  const { error } = await supabase.auth.deleteUser()

  if (error) {
    console.error('Error deleting account:', error)
  } else {
    console.log('Account deleted successfully!')
    // Optionally, redirect to homepage or login page after deletion
  }
}
</script>
