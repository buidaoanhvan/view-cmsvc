<template>
  <a-layout-content class="content">
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <a-row>
        <a-col :span="12">
          <a-typography-title :level="3">
            Quản lý người dùng</a-typography-title
          ></a-col
        >
        <a-col :span="12" style="display: flex; justify-content: end">
          <a-dropdown-button>
            <template #overlay>
              <a-menu>
                <!-- <a-menu-item key="1">Thêm người dùng</a-menu-item> -->
                <AddUser></AddUser>
                <a-menu-item key="2">Tạo chức vụ</a-menu-item>
                <a-menu-item key="3">Tạo quyền</a-menu-item>
                <a-menu-item key="4">Gắn quyền</a-menu-item>
              </a-menu>
            </template>
            <template #icon>...</template>
          </a-dropdown-button></a-col
        >
      </a-row>

      <div
        :style="{
          height: 'calc(100vh - 268px)',
          marginTop: '16px',
          overflow: 'auto',
        }"
      >
        <a-table :columns="columns" :data-source="listUser">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'roles'">
              {{ record.roles.name }}
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-layout-content>
</template>
<script>
import { userStore } from "@/store";
import { storeToRefs } from "pinia";
// import { DownOutlined } from "@ant-design/icons-vue";
import AddUser from "../components/User/AddUser.vue";
export default {
  components: {
    // DownOutlined,
    AddUser,
  },
  setup() {
    const userS = userStore();
    const { listUser } = storeToRefs(userS);
    return { listUser, userS };
  },
  data() {
    return {
      columns: [
        {
          title: "Người dùng",
          dataIndex: "fullname",
          key: "fullname",
        },
        {
          title: "Địa chỉ email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Chức vụ",
          dataIndex: "roles",
          key: "roles",
        },
        {
          title: "Hành động",
          key: "action",
        },
      ],
    };
  },
  created() {
    this.userS.getUserAll();
    this.userS.getRolesAll();
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
