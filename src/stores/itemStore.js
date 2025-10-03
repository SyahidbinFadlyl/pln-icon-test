import { defineStore } from "pinia";
import axios from "axios";

export const useItemStore = defineStore("item", {
  state: () => ({
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    perPage: 5,
  }),

  actions: {
    async fetchItems() {
      this.loading = true;
      this.error = null;
      try {
        const url = "/api/metadata/workflow";
        const response = await axios.get(url, {
          headers: {
            accept: "*/*",
          },
        });
        console.log(response.data, "response.data");
        this.items = response.data || [];
      } catch (err) {
        this.error = "Failed to fetch items";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    getItemData(item) {
      return [
        item?.name,
        item?.description,
        this.formatTimestamp(item?.createTime),
        item?.version,
        item?.ownerEmail,
        Number(item.tasks?.length),
      ];
    },
    formatTimestamp(timestamp) {
      const date = new Date(Number(timestamp));
      const pad = (n) => String(n).padStart(2, "0");

      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
  },
});
