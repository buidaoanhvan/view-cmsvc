<template>
  <a-layout>
    <a-row class="login">
      <a-col :xs="20" :md="8">
        <a-card>
          <a-typography-title :level="3">Quản Lý Voucher</a-typography-title>
          <a-input
            v-model:value="email"
            placeholder="Nhập địa chỉ email"
            type="text"
          />
          <a-input
            v-model:value="password"
            placeholder="Nhập mật khẩu"
            type="password"
          />
          <a-button type="primary" block @click="onSubmit">Đăng nhập</a-button>
        </a-card>
      </a-col>
    </a-row>
  </a-layout>
</template>
<script>
import axios from "axios";
import api_url from "../configs/api";
import router from "@/router";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      axios
        .post(api_url.login, {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          const { code, message, accessToken } = res.data;
          if (code == 200) {
            localStorage.setItem("user", accessToken);
            this.$notification["success"]({
              message: "Chú ý",
              description: message,
            });
            router.push("/");
          } else {
            this.$notification["warning"]({
              message: "Chú ý",
              description: message,
            });
          }
        })
        .catch((err) => {
          const { statusCode, message } = err.response.data;
          if (statusCode == 400) {
            message.forEach((message) => {
              this.$notification["error"]({
                message: "Chú ý",
                description: message,
              });
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login input {
  margin-bottom: 0.8rem;
}
</style>
