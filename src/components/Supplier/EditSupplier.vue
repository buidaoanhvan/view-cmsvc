<template>
  <a @click="showModal">Sửa</a>
  <a-modal
    v-model:visible="visible"
    width="500px"
    :title="`Chỉnh sửa đối tác ${supplier.name}`"
    cancelText="Hủy"
    okText="Cập nhật"
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
  props: ["supplier"],
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
      this.name = this.supplier.name;
      this.email = this.supplier.email;
      this.phone = this.supplier.phone;
    },
    handleOk() {
      axios
        .patch(api_link.supplier + "/" + this.supplier.id, {
          name: this.name,
          email: this.email,
          phone: this.phone,
        })
        .then((response) => {
          const { statusCode } = response.data;
          if (statusCode === 200) {
            this.$message.success("Cập nhật thương hiệu thành công");
            this.visible = false;
            this.$emit("ok");
          } else {
            this.$message.error("Vui lòng thử lại sau");
            this.visible = false;
          }
        })
        .catch(() => {
          this.$message.error("Cập nhật đối tác thất bại");
        });
    },
  },
};
</script>
