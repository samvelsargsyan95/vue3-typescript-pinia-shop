import { defineStore } from "pinia";
import requestService from "@/services/RequestService";

interface State {
  products: any[] | null;
  sortedProductsIds: number[] | null;
}

export const useProductsStore = defineStore("products", {
  state: (): State => ({
    products: null,
    sortedProductsIds: null,
  }),

  actions: {
    async getProducts(): Promise<void> {
      try {
        const { items } = await requestService.read(`products`);
        this.products = items;
      } catch (err) {
        throw err;
      }
    },

    async getSortedProducts( categoryId: number): Promise<void> {
      try {
        const { sortedIds } = await requestService.read(
          `products/sort?parentCategory=${categoryId}`
        );

        this.sortedProductsIds = sortedIds;
      } catch (err) {
        throw err;
      }
    },

    async getProduct(productId: number): Promise<void> {
      try {
        const response = await requestService.read(`products/${productId}`);
        return response
      } catch (err) {
        throw err;
      }
    }
  },

  getters: {
    sortedProducts() {
      if (this.sortedProductsIds.length) {
        return this.products.filter((item: any) => {
          if (this.sortedProductsIds.includes(item?.id)) {
            return item;
          }
        });
      }

      return []
    },
  },
});
