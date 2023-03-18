import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import VueCookies from "vue3-cookies";
import "ant-design-vue/dist/antd.css";
import { initialize } from "./store/modules/general";

initialize(store, router);

createApp(App).use(Antd).use(VueCookies).use(store).use(router).mount("#app");
