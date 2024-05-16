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
    async getCategories(): Promise<void> {
      try {
        const { items } = await requestService.read(`categories`);
        return items;
      } catch (err) {
        throw err;
      }
    },

    async getSubCategories(categoryId: number): Promise<void> {
      try {
        const { items } = await requestService.read(
          `categories?parent=${categoryId}`
        );

        return items
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
