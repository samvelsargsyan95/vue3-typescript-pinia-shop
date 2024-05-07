<template>
  <h3 class="text-center mt-2 text-teal-accent-4">Sub Categories</h3>

  <v-list>
    <v-list-item
      v-for="item in categories"
      @click.stop="getProductsByCategory(item)"
      :key="item.id"
      :prepend-avatar="item?.originalImageUrl"
      :subtitle="item?.name"
    >
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from "vue";
import { useProductsStore } from "@/stores/productsStore";
import { useCategoriesStore } from "@/stores/categoriesStore";

interface Category {
  id: string;
  name: string;
  originalImageUrl?: string;
}

export default defineComponent({
  props: {
    categories: {
      type: Array as PropType<Category[]>,
      required: true,
    },
  },

  setup() {
    const { getSortedProducts, getProducts } = useProductsStore();
    const { setData } = useCategoriesStore();

    const storeId: string = import.meta.env.VITE_STORE_ID;

    onMounted(async () => {
      try {
        await getProducts(storeId);
      } catch (e) {
        throw e;
      }
    });

    const getProductsByCategory = async (subcategory: Category): Promise<void> => {
      setData({ subcategory });

      try {
        await getSortedProducts(subcategory.id, storeId);

        setData({ showCategories: false });
      } catch (e) {
        throw e;
      }
    };

    return { getProductsByCategory };
  },
});
</script>

<style lang="scss" scoped>
::v-deep {
  .v-list-item--density-default:not(
      .v-list-item--nav
    ).v-list-item--density-default:not(
      .v-list-item--nav
    ).v-list-item--one-line {
    &:first-child {
      border-top: 1px solid lightgrey;
    }

    border-bottom: 1px solid lightgrey;
  }
}
</style>
