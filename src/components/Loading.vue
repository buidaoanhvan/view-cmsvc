<template>
  <div
    v-if="this.$store.getters.IS_LOADING"
    class="example"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  >
    <a-spin size="large" tip="Đang tải..." />
  </div>
</template>

<script>
export default {
  name: "LoadingVue",
};
</script>

<style scoped>
.example {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 999999999;
  width: 100vw;
  height: 100vh;
  overflow: hidden !important;
}
</style>
