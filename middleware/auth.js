import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser()
  const userStore = useUserStore()
  const supabase = useSupabaseClient()

  // Check if the session is still valid
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error checking session:', error)
    userStore.clearUser()
    if (to.path.startsWith('/admin') || to.path.startsWith('/dashboard')) {
      return navigateTo('/login')
    }
  }

  if (session?.user) {
    userStore.setUser(session.user)

    // Check for admin status using user metadata
    const isAdmin = session.user.user_metadata?.is_admin === true
    userStore.setIsAdmin(isAdmin)

    // Redirect non-admin users trying to access admin pages
    if (to.path.startsWith('/admin') && !isAdmin) {
      return navigateTo('/dashboard')
    }
  } else {
    userStore.clearUser()
    if (to.path.startsWith('/admin') || to.path.startsWith('/dashboard')) {
      return navigateTo('/login')
    }
  }

  // Optional: Redirect logged-in users away from login/signup pages
  if (session?.user && (to.path === '/login' || to.path === '/signup')) {
    return navigateTo('/dashboard')
  }
})