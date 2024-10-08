import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

  // Reactive Variables Start
  const user = ref(null)
  const isAdmin = ref(false)
  const priority = ref([
    { name: "High" },
    { name: "Medium" },
    { name: "Low" }
  ])

  const assignees = ref([{
    first_name: "Wes",
    second_name: "Kiprotich"
  },
  {
    first_name: "Sofi",
    second_name: "Kiprotich"
  }])

  const taskStatus = ref([
    { name: "open" },
    { name: "submitted-for-approval" },
    { name: "closed" },
  ]);
  // Reactive Variables End

  // IsLoggedIn Start
  const isLoggedIn = computed(() => !!user.value)
  // IsLoggedIn End

  // userEmail Start
  const userEmail = computed(() => user.value?.email)
  // userEmail End

  // Set User Start
  function setUser(newUser) {
    user.value = newUser
  }
  // Set User End

  // Clear User Start
  function clearUser() {
    user.value = null
    isAdmin.value = false
  }
  // Clear User End


  // SetIsAdmin Start
  function setIsAdmin(adminStatus) {
    isAdmin.value = adminStatus
  }
  // SetIsAdmin End

  // UpdateUserProfile Start
  function updateUserProfile(profileData) {
    if (user.value) {
      user.value = { ...user.value, ...profileData }
    }
  }
  // UpdateUserProfile End


  return {
    user,
    isAdmin,
    isLoggedIn,
    userEmail,
    setUser,
    priority,
    clearUser,
    setIsAdmin,
    assignees,
    updateUserProfile,
    taskStatus
  }
})