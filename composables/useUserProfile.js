import { ref, reactive } from 'vue'

export const useUserProfile = () => {
  // Reactive Variables Start
  const firstName = ref('')
  const lastName = ref('')
  const userName = ref('')
  const userDetails = ref({})
  const email = ref('')
  const loading = ref(false)
  const error = ref(null)
  // Reactive Variables End


  const supabase = useSupabaseClient()

  // Fetch user data Start
   const fetchUserData = async () => {
    try {
      loading.value = true
      const { data: { user }, error: fetchError } = await supabase.auth.getUser()

      if (fetchError) throw fetchError

      firstName.value = user?.user_metadata?.firstName || ''
      lastName.value = user?.user_metadata?.lastName || ''
      userName.value = user?.user_metadata?.userName || ''
      userDetails.value = user?.user_metadata || {}
      email.value = user?.email || ''

    } catch (err) {
      console.error('Error fetching user data:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // Fetch user  End


  // Update User Profile Start
  const updateProfile = async () => {
    try {
      loading.value = true
      const { data, error: updateError } = await supabase.auth.updateUser({
        data: {
          firstName: firstName.value,
          lastName: lastName.value,
          userName: userName.value
        }
      })

      if (updateError) throw updateError

      await fetchUserData() // Refresh data after update
      return { success: true }
    } catch (err) {
      error.value = err.message
      console.error('Error updating profile:', err)
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }
  // Update User Profile End


  // Update Password
  const updatePassword = async (newPassword) => {
    try {
      loading.value = true
      const { error: passwordError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (passwordError) throw passwordError

      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // Delete Account
  const deleteAccount = async () => {
    try {
      loading.value = true
      const { error: deleteError } = await supabase.auth.deleteUser()

      if (deleteError) throw deleteError

      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // Initialize
  onMounted(() => {
    fetchUserData()

  }  )

  return {
    // State
    firstName,
    lastName,
    userName,
    email,
    userDetails,
    loading,
    error,

    // Methods
    fetchUserData,
    updateProfile,
    updatePassword,
    deleteAccount,
  }
}