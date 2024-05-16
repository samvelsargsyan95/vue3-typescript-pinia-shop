<template>
  <v-container class="categories">
    <v-expansion-panels class="mb-6">
      <v-expansion-panel v-for="item in categories" :key="item.id">
        <v-expansion-panel-title
          @click="getSubs(item)"
          expand-icon="mdi-menu-down"
        >
          <img
            :src="item.originalImageUrl"
            class="categories__img me-3"
            alt="Category img"
          />
          <span class="text-light-blue-darken-3 font-weight-bold">{{
            item.name
          }}</span>
        </v-expansion-panel-title>

        <v-expansion-panel-text v-if="subCategories.length">
          <sub-categories :categories="subCategories" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ComputedRef,
  ref,
  Ref,
  PropType,
} from "vue";
import { useCategoriesStore } from "@/stores/categoriesStore";
import SubCategories from "@/components/SubCategories";

interface Category {
  id: number;
  name: string;
  originalImageUrl: string;
}

export default defineComponent({
  components: {
    SubCategories,
  },

  props: {
    categories: {
      type: Array as PropType<Category[]>,
      required: true,
    },
  },

  setup(props: any) {
    // Pinia actions
    const { getSubCategories, setData } = useCategoriesStore();

    const subCategories: Ref = ref([]);

    const getSubs = async (category: Category): Promise<void> => {
      setData({ category });
      subCategories.value = []

      try {
        subCategories.value = await getSubCategories(category.id);
      } catch (e) {
        throw e;
      }
    };

    return { getSubs, subCategories };
  },
});
</script>

<style lang="scss" scoped>
::v-deep {
  .v-expansion-panel-title__icon {
    color: #ff8400;
  }

  .v-expansion-panel-text__wrapper {
    padding: 8px 16px 16px;
  }

  .v-expansion-panel-title {
    padding: 12px;
  }

  .v-expansion-panel-text {
    border-top: 1px solid lightgrey;
  }
}

.categories {
  &__img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
}
</style>
