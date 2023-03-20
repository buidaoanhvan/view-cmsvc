<template>
  <a-layout-content :style="{ margin: '24px 16px 0' }">
    <div
      :style="{
        padding: '24px',
        background: '#fff',
        height: 'calc(100vh - 159px)',
        overflow: 'auto',
      }"
    >
      <a-row>
        <a-typography-title :level="3">Voucher</a-typography-title>
        <AddVoucher @ok="getSupplierList"></AddVoucher>
      </a-row>
      <div
        :style="{
          height: 'calc(100vh - 268px)',
          marginTop: '16px',
          overflow: 'auto',
        }"
      >
        <a-table :columns="columns" :data-source="data" :pagination="false">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <a>
                {{ record.name }}
              </a>
            </template>
            <template v-else-if="column.key === 'action'">
              <span>
                <EditVoucher
                  :supplier="record"
                  @ok="getSupplierList"
                ></EditVoucher>
                <a-divider type="vertical" />
                <a @click="deleteSupplier(record.id)">Xóa</a>
              </span>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-layout-content>
</template>
<script>
import api_url from "../configs/api";
import axios from "axios";
import AddVoucher from "../components/Voucher/AddVoucher.vue";
import EditVoucher from "../components/Voucher/EditVoucher.vue";

import api_link from "../configs/api";
export default {
  components: { AddVoucher, EditVoucher },
  data() {
    return {
      columns: [
        {
          title: "Đối tác",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Liên hệ",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Hành động",
          key: "action",
        },
      ],
      data: [],
    };
  },
  async created() {
    this.getSupplierList();
  },

  methods: {
    getSupplierList() {
      axios.get(api_url.supplier).then((req) => {
        const { data, statusCode } = req.data;
        if (statusCode == 200) {
          this.data = data;
        }
      });
    },
    deleteSupplier(id) {
      axios.delete(api_link.supplier + "/" + id).then((req) => {
        const { statusCode } = req.data;
        if (statusCode == 200) {
          this.$message.success("Xóa đối tác thành công");
          this.getSupplierList();
        } else {
          this.$message.error("Vui lòng thử lại sau");
        }
      });
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

.ant-card-body {
  padding: 16px !important;
}
.abc {
  padding: 2px !important;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}
</style>
