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

  const userProfileDetails = reactive({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
  })

  const currentPassword = ref('')
  const newPassword = ref('')
  const confirmPassword = ref('')

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
  const userProfile = useSupabaseUser()
  // Normal Variables Start


  // FetchUserData Start
  const fetchUserData = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error) {
        console.error('Error fetching user data:', error)
        return
      }

      userProfileDetails.firstName = user?.user_metadata?.firstName || ''
      userProfileDetails.lastName = user?.user_metadata?.lastName || ''
      userProfileDetails.email = user?.email || ''

    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }
  // FetchUserData End

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

  const allTasksLength = computed(()=>tasks.value.length)
  // Fetch Tasks End




  // Pending Tasks Start
  const pendingTasks = computed(() => {
    return tasks.value.filter(task => task.status === 'open')
  })
  const pendingTasksLength = computed(() => pendingTasks.value.length)
  // Pending Tasks End

  // Inprogress Tasks Start
  const inProgressTasks = computed(() => {
    return tasks.value.filter(task => task.status === 'In Progress')

  })
  const inProgressTasksLength = computed(() => inProgressTasks.value.length)

  // Inprogress Tasks End


  // Completed Tasks Start
  const completedTasks = computed(() => {
    return tasks.value.filter(task => task.status === 'closed')
  })
  const completedTasksLength = computed(() => completedTasks.value.length)
  // Completed Tasks End



  // Upcoming Tasks Start
  const upcomingTasks = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks.value.filter(task => {
      const deadline = new Date(task.deadline);
      deadline.setHours(0, 0, 0, 0);
      return deadline > today;
    });
  });
  // Upcoming Tasks End

  // Past Tasks Start
  const pastTasks = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks.value.filter(task => {
      const deadline = new Date(task.deadline);
      deadline.setHours(0, 0, 0, 0);
      return deadline < today;
    });
  });

  // Past Tasks End

  // Due Today Tasks Start
  const dueTodayTasks = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks.value.filter(task => {
      const deadline = new Date(task.deadline);
      deadline.setHours(0, 0, 0, 0);
      return deadline.getTime() === today.getTime();
    });
  });

  // Due Today Tasks End




  // OnMounted Start
  onMounted(() => {
    fetchTasks()
    fetchUserData()
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
    inProgressTasks,
    upcomingTasks,
    dueTodayTasks,
    pastTasks,
    userProfile,
    userProfileDetails,
    pendingTasksLength,
    inProgressTasksLength,
    completedTasksLength,
    allTasksLength


  }
})