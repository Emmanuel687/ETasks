import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isAdmin = ref(false)

  const isLoggedIn = computed(() => !!user.value)
  const userEmail = computed(() => user.value?.email)

  function setUser(newUser) {
    user.value = newUser
  }

  function clearUser() {
    user.value = null
    isAdmin.value = false
  }

  function setIsAdmin(adminStatus) {
    isAdmin.value = adminStatus
  }

  function updateUserProfile(profileData) {
    if (user.value) {
      user.value = { ...user.value, ...profileData }
    }
  }

  return {
    user,
    isAdmin,
    isLoggedIn,
    userEmail,
    setUser,
    clearUser,
    setIsAdmin,
    updateUserProfile
  }
})