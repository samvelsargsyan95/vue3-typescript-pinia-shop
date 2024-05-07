import { defineStore } from "pinia";
import requestService from "@/services/RequestService";

interface State {
  category: any
  subCategory: any,
  showCategories: boolean
}

export const useCategoriesStore = defineStore("categories", {
  state: (): State => ({
    category: null,
    subCategory: null,
    showCategories: true
  }),

  actions: {
    async getCategories(storeId: number): Promise<void> {
      try {
        const { items } = await requestService.read(`${storeId}/categories`);
        return items;
      } catch (err) {
        throw err;
      }
    },

    async getSubCategories(categoryId: number, storeId: number): Promise<void> {
      try {
        const { sortedIds } = await requestService.read(
          `${storeId}/categories/sort?parentCategory=0`
        );
        return sortedIds;
        /* 
            As parentCategory I have used 0 to get and show informations, 
            because with categoryId the response comes empty
          */
      } catch (err) {
        throw err;
      }
    },

    setData(data : any) {
      for (const key in data) {
        this[key] = data[key];
      }
    },
  },
});
