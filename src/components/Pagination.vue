<template>
  <div
    class="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 text-sm"
  >
    <div class="flex items-center space-x-2">
      <label for="perPage" class="text-gray-600">Items per page:</label>
      <select
        id="perPage"
        v-model.number="perPage"
        class="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option v-for="option in perPageOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <div class="flex items-center space-x-4">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span class="text-gray-700">
        Page {{ currentPage }} of {{ totalPages }}
      </span>

      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";

const props = defineProps({
  totalItems: { type: Number, required: true },
  modelValue: { type: Number, default: 1 },
  perPageOptions: {
    type: Array,
    default: () => [5, 10, 20],
  },
  modelValuePerPage: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["update:modelValue", "update:modelValuePerPage"]);

const currentPage = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const perPage = computed({
  get: () => props.modelValuePerPage,
  set: (val) => emit("update:modelValuePerPage", val),
});

const totalPages = computed(() => {
  return Math.max(Math.ceil(props.totalItems / perPage.value), 1);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

watch(perPage, () => {
  currentPage.value = 1;
});
</script>
