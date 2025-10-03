<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Detail Item</h1>
    <div class="bg-white p-6 rounded shadow">
      <p><strong>ID:</strong> {{ item.id }}</p>
      <p><strong>Name:</strong> {{ item.name }}</p>
      <p><strong>Price:</strong> Rp{{ item.price.toLocaleString() }}</p>
      <router-link
        to="/"
        class="text-blue-600 hover:underline mt-4 inline-block"
        >← Back</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const id = Number(route.params.id);

const allItems = [
  { id: 1, name: "Product A", price: 10000 },
  { id: 2, name: "Product B", price: 15000 },
];

const item = allItems.find((i) => i.id === id) || {
  id: "-",
  name: "-",
  price: 0,
};
</script>
