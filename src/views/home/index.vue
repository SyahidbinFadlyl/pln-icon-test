<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Workflows</h1>
      <router-link
        to="/create"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >+ New Workflow Definition</router-link
      >
    </div>
    <CustomTable
      :headers="[
        'name',
        'description',
        'createTime',
        'version',
        'ownerEmail',
        'tasks',
      ]"
      :items="paginatedItems"
      :itemData="getItemData"
    />
    <Pagination
      v-model="currentPage"
      v-model:modelValuePerPage="perPage"
      :total-items="items.length"
      :per-page-options="[2, 5, 10, 20, 50]"
      class="mt-6"
    />
  </div>
</template>

<script setup>
import CustomTable from "../../components/CustomTable.vue";
import Pagination from "../../components/Pagination.vue";
import { onMounted, computed } from "vue";
import { useItemStore } from "../../stores/itemStore";
import { storeToRefs } from "pinia";

const store = useItemStore();
const { fetchItems, getItemData } = store;
const { items, currentPage, perPage } = storeToRefs(store);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return items.value.slice(start, start + perPage.value);
});

onMounted(() => {
  fetchItems();
});
</script>
