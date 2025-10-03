<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Detail Item</h1>
    <div class="bg-white p-6 rounded shadow">
      <router-link
        to="/"
        class="text-blue-600 hover:underline mt-4 inline-block"
        >← Back</router-link
      >
      <div class="w-full flex">
        <div class="flex-1">
          <Left />
        </div>
        <div class="flex-1">
          <Right />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useItemStore } from "../../stores/itemStore";
import { useWorkflowStore } from "../../stores/workflow";
import { storeToRefs } from "pinia";
import Left from "./Left.vue";
import Right from "./Right.vue";

const store = useItemStore();
const workflowStore = useWorkflowStore();
const { setWorkflow } = workflowStore;
const { items } = storeToRefs(store);

const route = useRoute();
const id = route.params.id;

const item = ref(null);

const fetchItem = async () => {
  if (!items.value.length) {
    await store.fetchItems();
  }
  const find = items.value.find((e) => e.name === id) || null;
  setWorkflow(find);
  item.value = find;
};

onMounted(() => {
  fetchItem();
});
</script>
