import { defineStore } from "pinia";

interface State {
  cartQuantity: number
}

export const useCartStore = defineStore("cart", {
  state: (): State => ({
    cartQuantity: 0,
  }),

  actions: {
    setQuantity(quantity : number) : void {
      this.cartQuantity = quantity
    },
  },
});
