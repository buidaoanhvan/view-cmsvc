<template>
  <a-button type="primary" @click="showModal" style="margin-left: 10px"
    >+</a-button
  >
  <a-modal
    v-model:visible="visible"
    width="500px"
    title="Thêm đối tác"
    cancelText="Hủy"
    okText="Thêm"
    :maskClosable="false"
    @ok="handleOk"
  >
    <a-typography-text type="secondary">Tên đối tác:</a-typography-text>
    <a-input
      v-model:value="name"
      placeholder="Tên đối tác"
      style="margin-bottom: 15px"
    />
    <a-typography-text type="secondary">Địa chỉ email:</a-typography-text>
    <a-input
      v-model:value="email"
      placeholder="Địa chỉ email"
      style="margin-bottom: 15px"
    />
    <a-typography-text type="secondary">Liên hệ:</a-typography-text>
    <a-input
      v-model:value="phone"
      placeholder="Liên hệ"
      style="margin-bottom: 15px"
    />
  </a-modal>
</template>
<script>
import axios from "axios";
import api_link from "@/configs/api";
export default {
  data() {
    return {
      visible: false,
      name: "",
      email: "",
      phone: "",
    };
  },

  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      if (this.name && this.email && this.phone) {
        axios
          .post(api_link.supplier, {
            name: this.name,
            email: this.email,
            phone: this.phone,
          })
          .then((response) => {
            const { statusCode } = response.data;
            if (statusCode === 200) {
              this.$message.success("Thêm đối tác thành công");
              this.visible = false;
              this.name = "";
              this.email = "";
              this.phone = "";
              this.$emit("ok");
            } else {
              this.$message.error("Vui lòng thử lại sau");
              this.visible = false;
              this.name = "";
              this.email = "";
              this.phone = "";
            }
          })
          .catch(() => {
            this.$message.error("Vui lòng kiểm tra lại thông tin nhập");
          });
      } else {
        this.$message.error("Vui lòng nhập đủ thông tin");
      }
    },
  },
};
</script>
