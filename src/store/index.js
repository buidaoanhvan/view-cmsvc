import { createStore, createLogger } from "vuex";
import Auth from "./modules/auth";
import brand from "./modules/brand";

export default createStore({
  modules: { Auth, brand },
  strict: "debug",
  plugins: [createLogger()],
});
