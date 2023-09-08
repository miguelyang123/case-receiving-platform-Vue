<script>
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <div
    class="containe bg-cover bg-bottom bg-[url('/img/person-walking.jpg')] h-screen"
  >
    <main class="flex items-center h-full ml-20">
      <div class="w-1/2">
        <!-- main button area -->
        <div class="mb-20">
          <button
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-4xl px-10 py-5"
          >
            我要接案
          </button>
        </div>
        <!-- search area -->
        <div>
          <form action="/">
            <div class="mb-6">
              <input
                type="text"
                id="large-input"
                placeholder="搜尋"
                class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xl focus:ring-blue-500 focus:border-blue-500"
              />
              <button type="submit" class="">搜尋</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
