<script setup>
import { onMounted, ref, watch } from "vue";
import { useWorkflowStore } from "../../stores/workflow";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import "highlight.js/styles/github-dark.css";

hljs.registerLanguage("json", json);

const store = useWorkflowStore();
const codeRef = ref(null);

const renderCode = () => {
  if (codeRef.value) {
    codeRef.value.textContent = JSON.stringify(store.workflow, null, 2);
    hljs.highlightElement(codeRef.value);
  }
};

onMounted(renderCode);
watch(() => store.workflow, renderCode, { deep: true });
</script>

<template>
  <div class="w-full max-w-4xl mx-auto">
    <pre>
      <code ref="codeRef" class="json"></code>
    </pre>
  </div>
</template>
