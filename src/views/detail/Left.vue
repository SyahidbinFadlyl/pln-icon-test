<script setup>
import { ref } from "vue";

const steps = ref([
  { id: 1, type: "start", label: "Start" },
  { id: 2, type: "end", label: "End" },
]);

const showPopupIndex = ref(null);

function openAddStep(index) {
  showPopupIndex.value = index;
}

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

  steps.value.splice(showPopupIndex.value + 1, 0, newStep);
  showPopupIndex.value = null;
}
</script>

<template>
  <div class="flex flex-col items-center py-10">
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

        <!-- Add Step Button (tidak muncul di End) -->
        <div class="relative w-full flex justify-center">
          <button
            v-if="step.type !== 'end'"
            class="mt-3 bg-sky-500 text-white text-xs px-3 py-1 rounded shadow"
            @click="openAddStep(idx)"
          >
            + Add Step
          </button>

          <!-- Popup -->
          <div
            v-if="showPopupIndex === idx"
            class="absolute top-full mt-2 w-40 bg-white border rounded-lg shadow-lg z-10"
          >
            <button
              class="block w-full text-left px-3 py-2 text-sm hover:bg-sky-100"
              @click="confirmAddStep('SIMPLE')"
            >
              SIMPLE
            </button>
            <button
              class="block w-full text-left px-3 py-2 text-sm hover:bg-sky-100"
              @click="confirmAddStep('HTTP')"
            >
              HTTP
            </button>
            <button
              class="block w-full text-left px-3 py-2 text-sm hover:bg-sky-100"
              @click="confirmAddStep('INLINE')"
            >
              INLINE
            </button>
            <button
              class="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50"
              @click="showPopupIndex = null"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- Connector line -->
      <div v-if="idx < steps.length - 1" class="w-px h-10 bg-gray-400"></div>
    </div>
  </div>
</template>
