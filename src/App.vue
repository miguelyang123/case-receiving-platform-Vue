<script>
import HeaderView from "./components/Header.vue";
import { RouterLink, RouterView } from "vue-router";

export default {
  components: {
    HeaderView,
    RouterView,
  },
};
</script>

<template>
  <HeaderView />
  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
