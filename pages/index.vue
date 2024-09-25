
<script setup></script>
<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!!!
  </h1>
  <AutoComplete v-model="value" :suggestions="items" @complete="search" />
</template>