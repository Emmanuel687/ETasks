<template>
  <div>
    <WebsiteNavbar />
    <main>
      <slot />
      <Footer />
    </main>
  </div>
</template>

<script setup>
import Footer from './footer.vue';
console.log('Default layout loaded')
// No authentication checks should be here
</script>