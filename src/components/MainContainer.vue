<template>
  <span
    v-if="
      (route.name === 'CategoriesProductsView' && !showCategories) ||
      route.name !== 'CategoriesProductsView'
    "
    @click="goBack"
    class="mdi mdi-arrow-left-circle back-btn text-teal-accent-4"
  ></span>

  <h1 class="text-center mt-2 text-teal-accent-4">{{ headerTitle }}</h1>

  <RouterView />

  <router-link
    v-if="route.name !== 'Cart'"
    class="cart-btn bg-teal-accent-4"
    to="/cart"
  >
    <span v-if="cartQuantity" class="cart-quantity text-teal-accent-4">{{
      cartQuantity
    }}</span>
    <span class="mdi mdi-cart-outline"></span>
  </router-link>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { storeToRefs } from "pinia";
import { useRouter, useRoute, RouteRecordName } from "vue-router";

// Assuming the structure of items stored in localStorage
interface CartItem {
  id: number;
  quantity: number;
  name: string;
}

export default defineComponent({
  setup() {
    // Pinia
    const cartStore = useCartStore();
    const categoriesStore = useCategoriesStore();
    const { cartQuantity } = storeToRefs(cartStore);
    const { showCategories } = storeToRefs(categoriesStore);

    // Router
    const router = useRouter();
    const route = useRoute();

    // Attempt to parse the cartItems from localStorage
    const cartItems: CartItem[] = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    let quantity: number = cartQuantity.value;

    // Compute the header title based on the current route
    const headerTitle = computed(() => {
      let heading: string = "";

      switch (route.name) {
        case "CategoriesProductsView":
          heading = showCategories.value ? "Categories" : "Products";
          break;
        case "Product":
          heading = "Product Details";
          break;
        case "Cart":
          heading = "Cart";
          break;
      }

      return heading;
    });

    onMounted(() => {
      /*
        If the cart is not empty, calculate the total quantity from
        cartItems and update it using Pinia store.
      */
      cartItems.forEach((item: CartItem) => {
        quantity += item.quantity;
      });

      cartStore.setQuantity(quantity);
    });

    // Function to handle navigation logic
    const goBack = () => {
      if (!showCategories.value && route.name === "CategoriesProductsView") {
        categoriesStore.setData({
          category: null,
          subcategory: null,
          showCategories: true,
        });
      } else {
        router.back();
      }
    };

    return { cartQuantity, headerTitle, goBack, showCategories, route };
  },
});
</script>
