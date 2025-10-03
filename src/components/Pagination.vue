<template>
  <div class="flex items-center justify-between mt-6">
    <button
      class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      Previous
    </button>

    <div class="flex space-x-2">
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-3 py-2 text-sm rounded',
          page === currentPage
            ? 'bg-blue-600 text-white font-bold'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700',
        ]"
      >
        {{ page }}
      </button>
    </div>

    <button
      class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { computed, watch, toRefs } from "vue";

const props = defineProps({
  totalItems: { type: Number, required: true },
  perPage: { type: Number, default: 10 },
  modelValue: { type: Number, default: 1 },
  maxVisiblePages: { type: Number, default: 5 },
});

const emit = defineEmits(["update:modelValue"]);

const { totalItems, perPage, modelValue, maxVisiblePages } = toRefs(props);

const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value));
const currentPage = computed(() => modelValue.value);

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    emit("update:modelValue", page);
  }
}

const visiblePages = computed(() => {
  const half = Math.floor(maxVisiblePages.value / 2);
  let start = Math.max(currentPage.value - half, 1);
  let end = start + maxVisiblePages.value - 1;

  if (end > totalPages.value) {
    end = totalPages.value;
    start = Math.max(end - maxVisiblePages.value + 1, 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
</script>
