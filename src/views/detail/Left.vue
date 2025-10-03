<script setup>
import { ref } from "vue";

const steps = ref([
  { id: 1, type: "start", label: "Start" },
  { id: 2, type: "end", label: "End" },
]);

const showModal = ref(false);
const insertIndex = ref(null); // index di steps untuk insert
const selectedType = ref(null);

// open modal pilih type
function openAddStep(index) {
  insertIndex.value = index;
  showModal.value = true;
}

// confirm add step
function confirmAddStep(type) {
  const newId = Date.now();
  let newStep = {};

  if (type === "SIMPLE") {
    newStep = {
      id: newId,
      type: "lambda",
      title: "newSimple",
      label: "simple_ref",
      tag: "SIMPLE",
    };
  } else if (type === "HTTP") {
    newStep = {
      id: newId,
      type: "http",
      title: "http",
      label: "http_ref",
      tag: "HTTP",
      url: "http://example.com",
    };
  } else if (type === "INLINE") {
    newStep = {
      id: newId,
      type: "inline",
      title: "inline",
      label: "inline_ref",
      tag: "INLINE",
      code: "(function(){ return $.value1 + $.value2 })()",
    };
  }

  steps.value.splice(insertIndex.value + 1, 0, newStep);
  showModal.value = false;
  selectedType.value = null;
}
</script>

<template>
  <div class="flex flex-col items-center gap-6 py-10">
    <div
      v-for="(step, idx) in steps"
      :key="step.id"
      class="flex flex-col items-center"
    >
      <!-- Card -->
      <div
        class="relative w-72 rounded-xl border bg-white shadow-md p-4 flex flex-col items-start"
      >
        <!-- Start / End -->
        <div
          v-if="step.type === 'start' || step.type === 'end'"
          class="w-20 h-20 flex items-center justify-center rounded-full border-2 border-sky-500 text-sky-500 font-semibold mx-auto"
        >
          {{ step.label }}
        </div>

        <!-- Other Types -->
        <template v-else>
          <div class="flex justify-between w-full items-center">
            <span class="font-medium">{{ step.title }}</span>
            <span class="text-xs bg-gray-200 px-2 py-0.5 rounded">{{
              step.tag
            }}</span>
          </div>
          <p class="text-sm text-gray-500">{{ step.label }}</p>
          <p v-if="step.url" class="text-xs text-blue-500 truncate">
            {{ step.url }}
          </p>
          <pre v-if="step.code" class="text-xs text-pink-600 mt-2">{{
            step.code
          }}</pre>
        </template>

        <!-- Add Step Button -->
        <button
          class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-xs px-3 py-1 rounded shadow"
          @click="openAddStep(idx)"
        >
          + Add Step
        </button>
      </div>

      <!-- Connector line -->
      <div v-if="idx < steps.length - 1" class="w-px h-10 bg-gray-400"></div>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-xl shadow-lg w-64">
        <h2 class="text-lg font-semibold mb-4">Select Step Type</h2>
        <div class="flex flex-col gap-2">
          <button
            class="bg-gray-100 hover:bg-sky-100 py-2 rounded"
            @click="confirmAddStep('SIMPLE')"
          >
            SIMPLE
          </button>
          <button
            class="bg-gray-100 hover:bg-sky-100 py-2 rounded"
            @click="confirmAddStep('HTTP')"
          >
            HTTP
          </button>
          <button
            class="bg-gray-100 hover:bg-sky-100 py-2 rounded"
            @click="confirmAddStep('INLINE')"
          >
            INLINE
          </button>
        </div>
        <button class="mt-4 text-sm text-red-500" @click="showModal = false">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
