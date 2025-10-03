<template>
  <div class="overflow-x-auto shadow-md rounded-lg border border-gray-200">
    <table class="min-w-full bg-white">
      <thead class="bg-gray-100 text-gray-700 text-left text-sm uppercase">
        <tr>
          <th v-for="(header, i) in headers" :key="i" class="px-6 py-3">
            {{ header }}
          </th>
          <th class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.id"
          class="border-t hover:bg-gray-50"
        >
          <td v-for="(value, i) in itemData(item)" :key="i" class="px-6 py-4">
            {{ value }}
          </td>
          <td class="px-6 py-4">
            <router-link
              :to="`/detail/${item.id}`"
              class="text-blue-600 hover:underline mr-2"
              >Detail</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  headers: Array,
  items: Array,
  itemData: Function,
});
</script>
