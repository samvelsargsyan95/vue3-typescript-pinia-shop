<template>
  <v-table height="550px" fixed-header>
    <thead>
      <tr>
        <th class="text-center">Image</th>
        <th class="text-center">Name</th>
        <th class="text-center">Price</th>
        <th class="text-center">#</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in sortedProducts" :key="item.id" class="hovered-tr">
        <td
          class="text-center"
        >
          <img
            @click="openProductDetails(item.id)"
            :src="item?.smallThumbnailUrl"
            :alt="`Product ${item?.name}`"
            class="product-img cursor-pointer"
          />
        </td>
        <td class="text-center">{{ item?.name }}</td>
        <td class="text-center">{{ item?.defaultDisplayedPriceFormatted }}</td>
        <td class="text-center">
          <span
            @click="addToCart(item)"
            class="mdi mdi-plus-circle-outline buy-btn text-teal-accent-4"
          ></span>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useProductsStore } from "@/stores/productsStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useCart } from "@/composables/useCart";

export default defineComponent({
  setup() {
    // Using pinia state as reactive variables
    const productsStore = useProductsStore();
    const { sortedProducts } = storeToRefs(productsStore);
    const router = useRouter();

    // using addToCart function from useCart composable
    const { addToCart } = useCart();

    const openProductDetails = (productId: number) => {
      router.push(`/product/${productId}`);
    };

    return { sortedProducts, openProductDetails, addToCart };
  },
});
</script>

<style lang="scss" scoped>
.buy-btn {
  font-size: 30px;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  cursor: pointer;
}
</style>