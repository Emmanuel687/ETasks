<template>
  <div>
    <WebsiteNavbar />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
console.log('Default layout loaded')
// No authentication checks should be here
</script>