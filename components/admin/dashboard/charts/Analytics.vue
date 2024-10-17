<template>
  <div class="border rounded-md p-3 h-[400px]">
    <client-only>
      <apexchart width="500" type="line" :options="chartOptions" :series="series"></apexchart>
    </client-only>
  </div>
</template>

<script setup>
const chartOptions = ref({
  chart: {
    id: 'vuechart-example'
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
  }
})
const series = ref([{
  name: 'series-1',
  data: [30, 40, 35, 50, 49, 60, 70, 91]
}])

onMounted(() => {
  // You can fetch data or perform any client-side operations here
})
</script>