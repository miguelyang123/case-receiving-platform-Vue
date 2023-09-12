<script>
import HomeSearchBar from "../components/HomeSearchBar.vue";

// pinia 全域資料庫
import { mapState, mapActions } from "pinia";
// 匯入資料庫
import dataStore from "../store/dataStore";

export default {
  computed: {
    //參數 1.資料庫 2.要取用的 state / getters
    ...mapState(dataStore, ["numTest"]),
  },
  components: {
    HomeSearchBar,
  },
};
</script>

<template>
  <div
    class="containe bg-cover bg-bottom bg-[url('/img/person-walking.jpg')] h-screen"
  >
    <main class="flex items-center h-full ml-20 pb-20">
      <div class="w-1/2">
        <!-- main button area -->
        <div class="mb-20 flex justify-center">
          <button
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-4xl px-10 py-5"
          >
            我要接案
          </button>
        </div>
        <!-- search area -->
        <HomeSearchBar />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
