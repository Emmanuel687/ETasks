<script setup>
// Imports start
import { useUserProfile } from "@/composables/useUserProfile"
import { useCustomToast } from '~/composables/useToast'

import { useRouter } from "vue-router";
// Import End

// Composables Start
const profile = useUserProfile();
// Composables End

// Reactive Variables Start
const isEditing = ref(false)
const loading = ref(false)
const error = ref(null)
const visible = ref(false)
// Reactive Variables End

// Variables Declarations Start
const supabase = useSupabaseClient()
const toast = useCustomToast()
const router = useRouter()
// Variables Declarations End

// Handle Edit Start
const handleEdit = () => {
  isEditing.value = true
}
// Handle Edit End


// Handle Submit Start
const handleSubmit = async () => {
  const result = await profile.updateProfile()
  if (result.success) {
    isEditing.value = false
  }
}
// Handle Submit End


// Delete Account Start
const deleteAccount = async () => {
  try {
    loading.value = true

    const { error: deleteError } = await supabase.rpc('delete_user')

    if (deleteError) throw deleteError

    await supabase.auth.signOut()

    toast.success('Account deleted successfully')
    router.push('/login')
    return { success: true }
  } catch (err) {
    error.value = err.message
    toast.error('Error deleting account: ' + err.message)
    return { success: false, error: err.message }
  } finally {
    loading.value = false
  }
}
// Delete Account End


</script>

<template>
  <section class="h-[800px] bg-white p-3 overflow-y-auto">
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


    <!-- Delete Account Section -->
    <section class="mt-12 bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-red-600 border-b pb-3">Delete Account</h2>
      <p class="mt-4 text-gray-700">Once you delete your account, there is no going back. Please be certain.</p>
      <button @click=" visible = true" :disabled="loading"
        class="w-full py-3 mt-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition disabled:opacity-50">
        {{ loading ? 'Deleting...' : 'Delete Account' }}
      </button>



      <Dialog v-model:visible="visible" modal header="Delete Account" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Are you sure you want to delete this
          account.</span>
        <div class="flex justify-end gap-2">
          <button
            class="px-3 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50"
            @click="visible = false">
            Cancel
          </button>

          <Button type="button" label="Delete" severity="danger" @click="deleteAccount"></Button>

        </div>
      </Dialog>
    </section>
  </section>
</template>