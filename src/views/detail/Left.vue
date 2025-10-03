<script setup>
import { ref, nextTick } from "vue";
import { useWorkflowStore } from "../../stores/workflow";

const store = useWorkflowStore();

const showPopupIndex = ref(null);
const popupPos = ref({ top: 0, left: 0 });

async function openAddStep(index, event) {
  showPopupIndex.value = index;
  await nextTick();
  const rect = event.target.getBoundingClientRect();
  popupPos.value = {
    top: rect.bottom + window.scrollY + 5,
    left: rect.left + window.scrollX - 60, // biar popup agak center
  };
}

function confirmAddStep(type) {
  store.addStep(type, showPopupIndex.value + 1);
  showPopupIndex.value = null;
}

function deleteStep(idx) {
  store.deleteStep(idx);
}
</script>

<template>
  <div class="flex flex-col items-center py-10">
    <div
      v-for="(step, idx) in store.workflow.steps"
      :key="idx"
      class="flex flex-col items-center"
    >
      <!-- Card -->
      <div
        class="relative w-80 rounded-2xl border bg-white shadow-md p-4 flex flex-col items-start overflow-visible"
      >
        <!-- Tombol Delete (pojok kanan atas) -->
        <button
          v-if="step.type !== 'START' && step.type !== 'END'"
          class="absolute -top-3 -right-3 w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 text-xs hover:bg-red-500 hover:text-white hover:border-red-500"
          @click="deleteStep(idx)"
        >
          ✕
        </button>

        <!-- Start / End -->
        <div
          v-if="step.type === 'START' || step.type === 'END'"
          class="w-20 h-20 flex items-center justify-center rounded-full border-2 border-sky-500 text-sky-500 font-semibold mx-auto"
        >
          {{ step.type }}
        </div>

        <!-- Other Steps -->
        <template v-else>
          <div class="flex justify-between w-full items-center">
            <!-- Icon lambda / http / inline -->
            <span class="text-lg">λ</span>
            <span class="flex-1 ml-2 font-medium break-words">
              {{ step.name }}
            </span>
            <span
              class="text-xs bg-gray-200 px-2 py-0.5 rounded font-mono tracking-wide"
            >
              {{ step.type }}
            </span>
          </div>
          <p class="text-sm text-gray-500 break-words mt-1">
            {{ step.taskReferenceName }}
          </p>
          <p
            v-if="step.inputParameters?.http_request?.uri"
            class="text-xs text-blue-500 break-all line-clamp-1"
          >
            {{ step.inputParameters.http_request.uri }}
          </p>
          <pre
            v-if="step.inputParameters?.expression"
            class="text-xs text-pink-600 mt-2 whitespace-pre-wrap break-words line-clamp-3"
            >{{ step.inputParameters.expression }}
          </pre>
        </template>
      </div>

      <!-- Add Step Button (hanya jika bukan END) -->
      <div v-if="step.type !== 'END'" class="relative flex justify-center">
        <button
          class="mt-3 w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 text-sm hover:bg-sky-500 hover:text-white hover:border-sky-500 shadow"
          @click="openAddStep(idx, $event)"
        >
          +
        </button>
      </div>

      <!-- Connector line -->
      <div
        v-if="idx < store.workflow.steps.length - 1"
        class="w-px h-10 bg-gray-400"
      ></div>
    </div>

    <!-- Popup pakai Teleport -->
    <Teleport to="body">
      <div
        v-if="showPopupIndex !== null"
        class="absolute z-50 bg-white border rounded-lg shadow-lg w-40"
        :style="{ top: popupPos.top + 'px', left: popupPos.left + 'px' }"
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
    </Teleport>
  </div>
</template>
