<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Detail Item</h1>
    <div class="bg-white p-6 rounded shadow">
      <router-link
        to="/"
        class="text-blue-600 hover:underline mt-4 inline-block"
        >← Back</router-link
      >
      <h1 class="text-2xl font-bold mb-4">Create New Workflow</h1>

      <form @submit.prevent="createWorkflow" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Name</label
          >
          <input
            v-model="name"
            type="text"
            class="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Enter workflow name"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Description</label
          >
          <textarea
            v-model="description"
            rows="3"
            class="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Enter workflow description"
          />
        </div>

        <button
          type="submit"
          class="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
        >
          Create Workflow
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useWorkflowStore } from "../../stores/workflow";

const store = useWorkflowStore();
const router = useRouter();

const name = ref("");
const description = ref("");

function createWorkflow() {
  store.setWorkflow({
    ownerApp: null,
    createTime: Date.now(),
    updateTime: null,
    createdBy: null,
    updatedBy: null,
    accessPolicy: {},
    name: name.value,
    description: description.value,
    version: 1,
    tasks: [],
    inputParameters: [],
    outputParameters: {},
  });

  router.push("/detail/" + name.value);
}
</script>
