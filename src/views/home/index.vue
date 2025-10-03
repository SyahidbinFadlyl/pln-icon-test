<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Item List</h1>
      <router-link
        to="/create"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >+ Add Item</router-link
      >
    </div>
    <CustomTable
      :headers="['ID', 'Name', 'Price']"
      :items="items"
      :itemData="getItemData"
    />
  </div>
</template>

<script setup>
import CustomTable from "../../components/CustomTable.vue";

const items = [
  { id: 1, name: "Product A", price: 10000 },
  { id: 2, name: "Product B", price: 15000 },
];

const getItemData = (item) => [
  item.id,
  item.name,
  `Rp${item.price.toLocaleString()}`,
];
</script>
