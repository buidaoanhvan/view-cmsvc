<template>
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
          <user-outlined />
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-menu-item key="4">
          <user-outlined />
          <span class="nav-text">nav 4</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        v-if="$route.name != 'login' && $route.name != 'found'"
        :style="{ background: '#fff', padding: 0 }"
      />
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <router-view />
      </a-layout-content>
      <a-layout-footer
        v-if="$route.name != 'login' && $route.name != 'found'"
        style="text-align: center"
      >
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons-vue";
export default {
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
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
</style>
