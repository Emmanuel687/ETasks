import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', () => {
  // Reactive State Start
  const tasks = ref([])
  const loading = ref(false)
  const error = ref(null)
  // Reactive State End


  // Fetch Tasks Start
  const fetchTasks = async (searchQuery = '', statusFilter = '') => {
    const supabase = useSupabaseClient()
    loading.value = true
    error.value = null

    try {
      let query = supabase
        .from('tasks')
        .select('*')

      if (statusFilter) {
        query = query.eq('status', statusFilter)
      }

      if (searchQuery.trim()) {
        query = query.ilike('taskName', `%${searchQuery.trim()}%`)
      }

      query = query.order('created_at', { ascending: false })

      const { data, error: supabaseError } = await query

      if (supabaseError) throw supabaseError

      tasks.value = data
    } catch (e) {
      error.value = e.message || 'An error occurred while fetching tasks'
      console.error('Error fetching tasks:', e)
    } finally {
      loading.value = false
    }
  }
  // Fetch Tasks End


  // Update task Start
  const updateTask = async (updatedTask) => {
    const supabase = useSupabaseClient()
    try {
      const { data, error: updateError } = await supabase
        .from('tasks')
        .update({ status: updatedTask.status })
        .eq('id', updatedTask.id)
        .select('*')

      if (updateError) throw updateError

      if (data && data.length > 0) {
        const index = tasks.value.findIndex(task => task.id === updatedTask.id)
        if (index !== -1) {
          tasks.value[index] = { ...tasks.value[index], ...data[0] }
        }
      }
      return { success: true, data }
    } catch (error) {
      console.error('Error updating task:', error)
      return { success: false, error }
    }
  }
  // Update task End


  return {
    tasks,
    loading,
    error,

    fetchTasks,
    updateTask
  }
})