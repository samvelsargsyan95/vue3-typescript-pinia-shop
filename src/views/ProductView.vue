<template>
  <v-card
    v-if="!loading && productInfo"
    class="mx-auto my-12 product"
    max-width="450"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="200" :src="productInfo?.originalImageUrl" contain></v-img>

    <v-card-item>
      <v-card-title>{{ productInfo?.name }}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">Local Favorite</span>

        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :model-value="4.5"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        ></v-rating>

        <div class="text-grey ms-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        {{ productInfo?.defaultDisplayedPriceFormatted }} •
        <!-- Italian, Cafe -->
      </div>

      <div class="product__description" v-html="productInfo?.description" />
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-actions>
      <v-btn
        @click="addToCart(productInfo)"
        color="deep-purple-lighten-2"
        text="Buy"
        block
        border
      ></v-btn>
    </v-card-actions>
  </v-card>

  <div v-if="loading" class="loader">
    <v-progress-circular
      :size="50"
      class="text-teal-accent-4"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/productsStore";
import { useCart } from "@/composables/useCart";

interface Product {
  id: number;
  originalImageUrl: string;
  name: string;
  defaultDisplayedPriceFormatted: string;
  description: string;
}

export default defineComponent({
  setup() {
    // Pini Action
    const { getProduct } = useProductsStore();

    // using addToCart function from useCart composable
    const { addToCart } = useCart();

    // Router part
    const route = useRoute();

    const productId: number = route.params.id;
    const storeId: number = import.meta.env.VITE_STORE_ID;
    let loading: Ref<boolean> = ref(false);
    let productInfo: Ref<Product | null> = ref(null);

    onMounted(async () => {
      try {
        loading.value = true;
        productInfo.value = await getProduct(storeId, productId);
        loading.value = false;
      } catch (e) {
        throw e;
      } finally {
        loading.value = false;
      }
    });

    return { addToCart, productInfo, loading };
  },
});
</script>

<style lang="scss">
.product {
  &__description {
    & p:first-child {
      margin-bottom: 10px;
    }
  }
}
</style>