<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Workflows</h1>
      <router-link
        to="/create"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >+ Add Item</router-link
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
      :items="items"
      :itemData="getItemData"
    />
  </div>
</template>

<script setup>
import CustomTable from "../../components/CustomTable.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

const items = ref([]);

const getItemData = (item) => [
  item?.name,
  item?.description,
  new Date(item.createTime).toLocaleDateString(),
  item?.version,
  item?.ownerEmail,
  Number(item.tasks?.length),
];

const loading = ref(true);
const error = ref("");

const fetchData = async () => {
  try {
    const url = "/api/metadata/workflow";
    const response = await axios.get(url, {
      headers: {
        accept: "*/*",
      },
    });
    console.log(response.data, "response.data");
    items.value = response.data;
  } catch (err) {
    console.log("Error occurred:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>
