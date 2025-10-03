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
      :total-items="items.length"
      :per-page="perPage"
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

const items = storeToRefs(store).items;
const currentPage = storeToRefs(store).currentPage;
const perPage = storeToRefs(store).perPage;
console.log({ currentPage, perPage });

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  console.log(start, "start");
  return items.value.slice(start, start + perPage.value);
});

onMounted(() => {
  fetchItems();
});
</script>
