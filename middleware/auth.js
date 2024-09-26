export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  const userStore = useUserStore()

  if (user.value) {
    userStore.setUser(user.value)
  } else {
    userStore.clearUser()
  }

  if (!user.value && to.path.startsWith('/admin')) {
    return navigateTo('/login')
  }
})


// 1.defineNuxtRouteMiddleware((to, from) => { ... }):
// This is a Nuxt 3 function used to define route middleware.
// It takes a function as an argument, which receives two parameters:
// ->to: the route being navigated to
// ->from: the current route being navigated away from

// 2. const user = useSupabaseUser():
// This line is using a composable (likely custom-made) to get the current 
// user from Supabase.

// 3.const userStore = useUserStore():
// This is using a store, probably created with Pinia
// to manage user state across the application.

// 4.
// if (user.value) {
//   userStore.setUser(user.value)
// } else {
//   userStore.clearUser()
// }

// This checks if there's a user logged in. If so, it updates the
// user store with the user's data.If not, it clears the user data 
// from the store. This ensures the store always reflects the current authentication state.


// 5.The second if block:
// if (!user.value && to.path.startsWith('/admin')) {
//   return navigateTo('/login')
// }

// This is implementing a route guard. If there's no user logged in (!user.value) and the user is trying
// to access an admin page (to.path.startsWith('/admin')),
// it redirects them to the login page using Nuxt's navigateTo function.