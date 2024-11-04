import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

  // Reactive Variables Start
  const user = ref(null)
  const tasks = ref([])
  const loading = ref(false)
  const error = ref('')
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
    { name: "In Progress" },
    { name: "closed" },
  ]);
  // Reactive Variables End

  // Normal Variables Start
  const supabase = useSupabaseClient()
  // Normal Variables Start



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


  // Fetch Tasks Start
  const fetchTasks = async () => {
    loading.value = true
    error.value = null

    try {
      let query = supabase
        .from('tasks')
        .select('*')

      query = query.order('created_at', { ascending: false })
      const { data, error: supabaseError } = await query
      tasks.value = data
      if (supabaseError) throw supabaseError

    } catch (e) {
      error.value = e.message || 'An error occurred while fetching tasks'
      console.error('Error fetching tasks:', e)
    } finally {
      loading.value = false
    }
  }
  // Fetch Tasks End


  // Pending Tasks Start
  const pendingTasks = computed(() => {
    return tasks.value.filter(task => task.status === 'open')
  })
  // Pending Tasks End

  // Inprogress Tasks Start
  const inProgressTasks = computed(() =>{
    return tasks.value.filter(task => task.status === 'In Progress')

  })
  // Inprogress Tasks End


  // Completed Tasks Start
  const completedTasks = computed(() => {
    return tasks.value.filter(task => task.status === 'closed')
  })
  // Completed Tasks End



  // Upcoming Tasks Start
  const upcomingTasks = computed(() => {
    return tasks.value.filter(task => new Date(task.due_date) > new Date())
  })
  // Upcoming Tasks End

  // Past Tasks Start
  const pastTasks = computed(() => {
    return tasks.value.filter(task => new Date(task.due_date) < new Date())
  })
  // Past Tasks End

  // Due Today Tasks Start
  const dueTodayTasks = computed(() => {
    return tasks.value.filter(task => new Date(task.due_date).toISOString().slice(0, 19) === new Date().toISOString().slice(0, 19))
  })
  // Due Today Tasks End




  // OnMounted Start
  onMounted(() => {
    fetchTasks()
  })
  // OnMounted End



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
    fetchTasks,
    taskStatus,
    tasks,
    pendingTasks,
    completedTasks,
    inProgressTasks


  }
})