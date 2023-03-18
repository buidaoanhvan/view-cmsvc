<template>
  <LoadingVue></LoadingVue>
  <a-layout>
    <a-layout-sider
      v-if="$route.name != 'login' && $route.name != 'found'"
      breakpoint="lg"
      collapsed-width="0"
      style="height: 100vh"
    >
      <div class="logo"></div>
      <a-menu theme="dark" mode="inline">
        <a-menu-item key="1">
          <dashboard-outlined />
          <span class="nav-text">Tổng quan</span>
        </a-menu-item>
        <a-menu-item key="2">
          <shop-outlined />
          <span class="nav-text">Thương hiệu</span>
        </a-menu-item>
        <a-menu-item key="3">
          <bank-outlined />
          <span class="nav-text">Đối tác</span>
        </a-menu-item>
        <a-menu-item key="4">
          <barcode-outlined />
          <span class="nav-text">Voucher</span>
        </a-menu-item>
        <a-menu-item key="5">
          <send-outlined />
          <span class="nav-text">Xuất voucher</span>
        </a-menu-item>
        <a-menu-item key="6">
          <team-outlined />
          <span class="nav-text">Người dùng</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        v-if="$route.name != 'login' && $route.name != 'found'"
        :style="{ background: '#fff', padding: 0 }"
        class="header"
      >
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            {{ this.$store.getters.CURRENT_USER?.fullname }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;" @click="isLogout">Đăng xuất</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <router-view />
      </a-layout-content>
      <a-layout-footer
        v-if="$route.name != 'login' && $route.name != 'found'"
        style="text-align: center"
      >
        v0.0.1©2023
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  ShopOutlined,
  BankOutlined,
  BarcodeOutlined,
  TeamOutlined,
  SendOutlined,
  DashboardOutlined,
} from "@ant-design/icons-vue";
import LoadingVue from "./components/Loading.vue";
import { DownOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    ShopOutlined,
    BankOutlined,
    BarcodeOutlined,
    TeamOutlined,
    SendOutlined,
    DashboardOutlined,
    LoadingVue,
    DownOutlined,
  },
  methods: {
    isLogout() {
      this.$store.commit("LOGOUT");
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
<style>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

.header {
  display: flex;
  padding: 0px 20px !important;
  justify-content: right;
}
</style>
