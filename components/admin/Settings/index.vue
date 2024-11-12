<script setup>
// Imports start
import { useUserProfile } from "@/composables/useUserProfile"  
// Import End

// Composables Start
const profile = useUserProfile();  
// Composables End

// Password Form State
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isEditing = ref(false)



const handleEdit = () => {
  isEditing.value = true
}


const handleSubmit = async () => {
  const result = await profile.updateProfile()
  if (result.success) {
    isEditing.value = false 
  }
}


// Update Password Handler
const updatePassword = async () => {
  try {
    if (newPassword.value !== confirmPassword.value) {
      throw new Error('Passwords do not match')
    }

    const { error } = await profile.updatePassword(newPassword.value)
    if (error) throw error

    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''

    alert('Password updated successfully!')
  } catch (error) {
    console.error('Error updating password:', error)
    alert(error.message)
  }
}

// Delete Account Handler
const handleDeleteAccount = async () => {
  await profile.deleteAccount()
  console.log("Delete Account successful!")
}

</script>

<template>
  <section class="bg-white p-3 overflow-y-auto">
    <!-- Account Information Section -->
    <section class="bg-white p-6 rounded-lg shadow-lg">
      <div class="flex justify-between items-center border-b pb-3">
        <h2 class="text-3xl font-semibold text-gray-800">Account Information</h2>
        <button v-if="!isEditing" @click="handleEdit"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Edit
        </button>
      </div>

      <div class="mt-6 space-y-4">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Username -->
          <div class="flex flex-col">
            <label for="userName" class="text-sm font-medium text-gray-700">Username</label>
            <input v-model="profile.userName.value" :disabled="!isEditing" class="mt-1 px-4 py-2 border border-gray-300 rounded-lg 
                   focus:ring-indigo-500 focus:border-indigo-500
                   disabled:bg-gray-50 disabled:cursor-not-allowed" placeholder="Enter Username" />
          </div>

          <!-- First Name -->
          <div class="flex flex-col">
            <label for="firstName" class="text-sm font-medium text-gray-700">First Name</label>
            <input v-model="profile.firstName.value" :disabled="!isEditing" class="mt-1 px-4 py-2 border border-gray-300 rounded-lg 
                   focus:ring-indigo-500 focus:border-indigo-500
                   disabled:bg-gray-50 disabled:cursor-not-allowed" placeholder="Enter your first name" />
          </div>

          <!-- Last Name -->
          <div class="flex flex-col">
            <label for="lastName" class="text-sm font-medium text-gray-700">Last Name</label>
            <input v-model="profile.lastName.value" :disabled="!isEditing" class="mt-1 px-4 py-2 border border-gray-300 rounded-lg 
                   focus:ring-indigo-500 focus:border-indigo-500
                   disabled:bg-gray-50 disabled:cursor-not-allowed" placeholder="Enter your last name" />
          </div>

          <!-- Email -->
          <div class="flex flex-col">
            <label for="email" class="text-sm font-medium text-gray-700">Email</label>
            <input v-model="profile.email.value" type="email" disabled class="mt-1 px-4 py-2 border border-gray-300 rounded-lg 
                   bg-gray-100 cursor-not-allowed" />
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4" v-if="isEditing">
            <button type="submit" :disabled="profile.loading.value" class="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg 
                   hover:bg-indigo-700 transition disabled:opacity-50">
              {{ profile.loading.value ? 'Saving...' : 'Save Changes' }}
            </button>

            <button type="button" @click="isEditing = false" class="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg 
                   hover:bg-gray-200 transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>

    <div class="grid grid-cols-2">
          <!-- Change Password Section -->


    </div>
    <section class="mt-12 bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-gray-800 border-b pb-3">Change Password</h2>
      <div class="mt-6 space-y-4">
        <form @submit.prevent="updatePassword" class="space-y-6">
          <!-- Password fields remain the same -->
          <div class="flex flex-col">
            <label for="currentPassword" class="text-sm font-medium text-gray-700">Current Password</label>
            <input v-model="currentPassword" id="currentPassword" type="password"
              class="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter current password" />
          </div>

          <!-- Similar corrections for other password fields -->

          <button type="submit" :disabled="profile.loading"
            class="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
            {{ profile.loading.value ? 'Updating...' : 'Update Password' }}
          </button>
        </form>
      </div>
    </section>

    <!-- Delete Account Section -->
    <section class="mt-12 bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-red-600 border-b pb-3">Delete Account</h2>
      <p class="mt-4 text-gray-700">Once you delete your account, there is no going back. Please be certain.</p>
      <button @click="handleDeleteAccount" :disabled="profile.loading.value"
        class="w-full py-3 mt-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition disabled:opacity-50">
        {{ profile.loading.value ? 'Deleting...' : 'Delete Account' }}
      </button>
    </section>
  </section>
</template>