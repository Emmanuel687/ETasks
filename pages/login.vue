<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSupabaseClient, useRouter } from '#imports'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const supabase = useSupabaseClient()
const router = useRouter()

const handleLogin = async () => {
  try {
    errorMessage.value = '' // Clear any previous error messages
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    // Handle successful login
    console.log('Login successful')
    router.push('/admin') // Redirect to admin dashboard
  } catch (error) {
    // Handle error
    console.error('Error logging in:', error)
    errorMessage.value = error.message || 'An error occurred during login'
  }
}
</script>