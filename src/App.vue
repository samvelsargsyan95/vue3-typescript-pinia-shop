<template>
  <main-container />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainContainer from "@/components/MainContainer";

export default defineComponent({
  components: {
    MainContainer
  }
});
</script>

<style lang="scss">
@import "src/assets/styles/main.scss";
</style>
