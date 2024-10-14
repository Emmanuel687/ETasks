<script setup>

const products = ref([
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  },
])

</script>

<template>
  <section class="border rounded-md p-3 h-[400px]">
    <!-- Pending Hero Start -->
    <div class="d-card-header">
      <h1 class="d-card-title !text-indigo-700">
        Completed Tasks
        (4)

      </h1>
    </div>
    <!-- Pending Hero End -->


    <!-- Completed Task Table Start -->
    <DataTable :value="products" tableStyle="min-width: 20rem">
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
    <!-- Completed Task Table End -->

  </section>
</template>

<style></style>