import { defineStore } from "pinia";
import Axios from "axios";
import api_link from "@/configs/api";
import { message } from "ant-design-vue";
// import router from "../../router/index";

export const userStore = defineStore({
  id: "user",
  state: () => ({
    listUser: [],
    rolesList: [],
  }),

  actions: {
    async getUserAll() {
      try {
        const res = await Axios.post(api_link.alluser);
        if (res.data.code == 200) {
          this.listUser = res.data.data;
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getRolesAll() {
      try {
        const res = await Axios.get(api_link.roles);
        if (res.data.statusCode == 200) {
          this.rolesList = res.data.data;
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addUser(fullname, email, phone, password, role_id) {
      try {
        const res = await Axios.post(api_link.register, {
          fullname,
          email,
          phone,
          password,
          role_id,
        });
        if (res.data.code == 200) {
          message.success("Tạo tài khoản thành công");
        } else {
          message.warning("Vui lòng kiểm tra lại");
        }
      } catch (error) {
        if (error.response.status === 400) {
          error.response.data.message.forEach((element) => {
            message.error(element);
          });
        } else {
          message.error("Vui lòng thử lại sau");
        }
      }
    },
  },
});
