import { defineStore } from "pinia";
import axios from "axios";

export const useItemStore = defineStore("item", {
  state: () => ({
    items: [],
    loading: false,
    error: null,
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
        new Date(item.createTime).toLocaleDateString(),
        item?.version,
        item?.ownerEmail,
        Number(item.tasks?.length),
      ];
    },
  },
});
