<template>
  <categories
    v-if="!loading && showCategories"
    :categories="categories"
    :isSubCategories="false"
  />

  <products v-if="!loading && !showCategories" :products="products" />

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
import { useCategoriesStore } from "@/stores/categoriesStore";
import { storeToRefs } from "pinia";
import Categories from "@/components/Categories";

export default defineComponent({
  components: {
    Categories,
  },

  setup() {
    // Pinia actions
    const { getCategories } = useCategoriesStore();

    // Using pinia state as reactive variables
    const categoriesStore = useCategoriesStore();
    const { showCategories } = storeToRefs(categoriesStore);
    const categories : Ref<any> = ref(null);
    const loading: Ref<boolean> = ref(false);

    onMounted(async () => {
      try {
        loading.value = true;
        categories.value = await getCategories();
        loading.value = false;
      } catch (e) {
        throw e;
      } finally {
        loading.value = false
      }

    });

    return {
      categories,
      loading,
      showCategories,
    };
  },
});
</script>
