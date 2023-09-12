<script>
export default {
  data() {
    return {
      searchText: "",
      jobArea: null,
      jobClass: null,
    };
  },
};
</script>

<template>
  <form>
    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only">
      搜尋案子
    </label>
    <div class="relative">
      <input
        type="search"
        id="search"
        class="block w-full p-4 text-2xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder="搜尋案子"
        v-model="searchText"
      />

      <div class="absolute right-20 bottom-2.5 h-10 flex">
        <!-- 地區 select -->
        <select
          id="jobArea"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mr-1"
          v-model="jobArea"
        >
          <option :value="null" selected>地區</option>
          <option value="TPE">台北市</option>
          <option value="TXG">台中市</option>
          <option value="TNN">台南市</option>
        </select>
        <!-- 類別 select -->
        <select
          id="jobClass"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          v-model="jobClass"
        >
          <option :value="null" selected>類別</option>
          <option value="remote">遠端</option>
          <option value="onsite">現場</option>
        </select>
      </div>
      <button
        type="submit"
        class="text-white absolute right-3 bottom-2.5 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3"
      >
        <svg
          class="w-5 h-5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
