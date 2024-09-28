<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSignup">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const supabase = useSupabaseClient()

const handleSignup = async () => {
  try {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    // Handle successful signup (e.g., redirect or show message)
  } catch (error) {
    // Handle error (e.g., show error message)
    console.error('Error signing up:', error)
  }
}
</script>