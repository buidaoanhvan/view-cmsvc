<template>
  <a @click="showModal">Chi tiết</a>
  <a-modal
    v-model:visible="visible"
    width="800px"
    :title="voucher.title"
    cancelText="Đóng"
  >
  </a-modal>
</template>

<script>
export default {
  props: ["voucher"],
  data() {
    return {
      visible: false,
    };
  },

  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {},
  },
};
</script>

<style scoped>
.box-add-vc {
  padding: 0px 10px;
}
</style>
