<template>
  <a-layout>
    <a-row class="login">
      <a-col :xs="20" :md="7">
        <a-card class="box-login">
          <a-typography-title style="margin-bottom: 20px" :level="3"
            >Quản Lý Voucher</a-typography-title
          >
          <a-input
            v-model:value="email"
            placeholder="Nhập địa chỉ email"
            type="text"
          >
            <template #prefix>
              <user-outlined
                :style="{ fontSize: '18px', color: '#08c', margin: '0 5px' }"
              /> </template
          ></a-input>
          <a-input
            v-model:value="password"
            placeholder="Nhập mật khẩu"
            type="password"
          >
            <template #prefix>
              <key-outlined
                :style="{ fontSize: '18px', color: '#08c', margin: '0 5px' }"
              />
            </template>
          </a-input>
          <a-button type="primary" block @click="onSubmit">Đăng nhập</a-button>
        </a-card>
      </a-col>
    </a-row>
  </a-layout>
</template>
<script>
import axios from "axios";
import api_url from "../configs/api";
import { UserOutlined, KeyOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    UserOutlined,
    KeyOutlined,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      this.$store.commit("LOGIN");
      axios
        .post(api_url.login, {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          const { code, message } = res.data;
          if (code == 200) {
            this.$notification["success"]({
              message: "Chú ý",
              description: message,
            });
            this.$router.push({ path: "/" });
            this.$store.commit("LOGIN_SUCCESS", res.data);
          } else {
            this.$store.commit("LOGIN_FAILED");
            this.$notification["warning"]({
              message: "Chú ý",
              description: message,
            });
          }
        })
        .catch((err) => {
          this.$store.commit("LOGIN_FAILED");
          this.$notification["error"]({
            message: "Chú ý",
            description: err.message,
          });
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
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("~@/assets/bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

.login .ant-input-affix-wrapper {
  margin-bottom: 0.8rem;
  padding: 6px;
}

.box-login {
  border: unset !important;
  border-radius: 5px;
}
</style>
