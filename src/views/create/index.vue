<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Create New Item</h1>
    <form
      @submit.prevent="submitForm"
      class="bg-white p-6 rounded shadow space-y-4"
    >
      <div>
        <label class="block text-sm font-medium">Name</label>
        <input
          v-model="name"
          type="text"
          class="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium">Price</label>
        <input
          v-model.number="price"
          type="number"
          class="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const price = ref(0);
const router = useRouter();

const submitForm = () => {
  console.log("New Item:", { name: name.value, price: price.value });
  router.push("/");
};
</script>
