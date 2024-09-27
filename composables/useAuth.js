import { useSupabaseClient, useSupabaseUser } from '#imports'
import { ref } from 'vue'

export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const loading = ref(false)
  const error = ref(null)

  const login = async (email, password) => {
    loading.value = true
    error.value = null
    const { error: loginError } = await supabase.auth.signIn({ email, password })
    if (loginError) error.value = loginError.message
    loading.value = false
  }

  const signup = async (email, password) => {
    loading.value = true
    error.value = null
    const { error: signupError } = await supabase.auth.signUp({ email, password })
    if (signupError) error.value = signupError.message
    loading.value = false
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout
  }
}