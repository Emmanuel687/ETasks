<script setup>
definePageMeta({
  layout: 'admin'
})

// Imports Start
import { useUserStore } from '@/stores/user'
// Imports End

// Variables Start
const appStore = useUserStore()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
// Variables End

// Reactive Variables Start
const searchTask = ref('');
const tasks = ref([])
const openCreateTaskDialog = ref(false)
const loading = ref(false)
const error = ref(null)
const selectedTaskStatus = ref('')
const isLoading = ref(false)
// Reactive Variables End


// Fetch Tasks Start
const fetchTasks = async () => {
  loading.value = true
  error.value = null

  try {
    let query = supabase
      .from('tasks')
      .select('*')

    if (selectedTaskStatus.value) {
      query = query.eq('status', selectedTaskStatus.value)
    }

    if (searchTask.value.trim()) {
      query = query.ilike('taskName', `%${searchTask.value.trim()}%`)
    }

    query = query.order('created_at', { ascending: false })

    const { data, error: supabaseError } = await query

    console.log(data, "data")

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



// HandleEditTask Start
const updateTask = async (updatedTask) => {
  console.log('Updating task:', updatedTask)
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({ status: updatedTask.status })
      .eq('id', updatedTask.id)
      .select('*')

    if (error) throw error

    if (data && data.length > 0) {
      console.log('Task updated successfully:', data[0])
      const index = tasks.value.findIndex(task => task.id === updatedTask.id)
      if (index !== -1) {
        tasks.value[index] = { ...tasks.value[index], ...data[0] }
      } else {
        console.warn('Updated task not found in local array')
      }
    } else {
      console.warn('No data returned after update')
    }
  } catch (error) {
    console.error('Error updating task:', error)
  }
}
// HandleEditTask End

// Debounce Start
function debounce(fn, delay) {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
// Debounce End

// Debounced Fetch Tasks Start
const debouncedFetchTasks = debounce(fetchTasks, 300)
// Debounced Fetch Tasks End


// Watcher Start
watch([selectedTaskStatus, searchTask], ([newStatus, newSearch], [oldStatus, oldSearch]) => {
  if (!newStatus && !newSearch.trim() && (oldStatus || oldSearch.trim())) {
    fetchTasks()
  } else {
    debouncedFetchTasks()
  }
})
// Watcher End

// OnMounted Start
onMounted(async () => {
  await fetchTasks()

})
// OnMounted End
</script>

<template>
  <section class="dashboard rounded-md py-3 bg-white h-full  overflow-x-auto">
    <!-- My Tasks Header Start -->
    <section class="flex justify-between items-end border-b-2 pb-1 px-3 mb-3">
      <h1 class="text-lg text-indigo-700 font-semibold">
        My Tasks
      </h1>

      <button class="btn-primary !bg-indigo-700 border-indigo-700   hover:bg-indigo-600"
        @click="openCreateTaskDialog = true">
        <i class="pi pi-plus"></i>
        New Task
      </button>
    </section>
    <!-- My Tasks Header End -->

    <!-- Search Bar Start -->
    <section class="flex gap-2 ml-[20px]">
      <SearchSimple v-model="searchTask" />
      <Dropdown v-model="selectedTaskStatus" filter showClear :options="appStore.taskStatus" option-label="name"
        option-value="name" />
    </section>
    <!-- Search Bar End -->

    <!-- Create Tasks Dialog Start -->
    <section>
      <AdminTasksCreateTask :openCreateTaskDialog="openCreateTaskDialog" @close="() => openCreateTaskDialog = false"
        @fetchTasks="fetchTasks" />
    </section>
    <!-- Create Tasks Dialog End -->

    <!-- Task List Start -->
    <section>
      <CustomLoader v-if="loading" />

      <AdminTasks :tasks="tasks" @update-task="updateTask" v-else="loading" />
    </section>
    <!-- Task List End -->



  </section>
</template>

