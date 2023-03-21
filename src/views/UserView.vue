<template>
  <a-layout-content class="content">
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      nguoi dung
    </div>
  </a-layout-content>
</template>
<script>
import api_url from "../configs/api";
import axios from "axios";
export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    axios
      .post(api_url.user)
      .then((req) => {
        this.user = req.data.data;
        console.log(this.user);
      })
      .catch();
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
