
export default defineNuxtRouteMiddleware(async (to) => {
  const user = await useSupabaseUser()

  console.log('Auth middleware running for path:', to.path)

  // Check for admin routes
  if (to.path.startsWith('/admin')) {
    console.log('Checking admin route access')

    // If not logged in, redirect to login page
    if (!user) {
      console.log('User not authenticated, redirecting to login')
      return navigateTo('/login')
    }

    console.log('User authenticated, allowing access to admin route')
  }

  // For non-admin routes, allow access
  return
})