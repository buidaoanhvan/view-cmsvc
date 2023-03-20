<template>
  <a key="list-loadmore-edit" @click="showModal">Sửa</a>
  <a-modal
    v-model:visible="visible"
    width="500px"
    :title="`Chỉnh sửa thương hiệu ${brand.name}`"
    cancelText="Hủy"
    okText="Cập nhật"
    :maskClosable="false"
    @ok="handleOk"
  >
    <a-input
      v-model:value="name"
      placeholder="Tên thương hiệu"
      style="margin-bottom: 15px"
    />
    <a-upload
      v-model:file-list="fileList"
      list-type="picture"
      :max-count="1"
      action="http://localhost:3000/upload"
      :headers="headers"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Thay ảnh thương hiệu
      </a-button>
    </a-upload>
  </a-modal>
</template>
<script>
import { UploadOutlined } from "@ant-design/icons-vue";
import axios from "axios";
import api_link from "@/configs/api";
export default {
  components: {
    UploadOutlined,
  },
  props: ["brand"],
  data() {
    return {
      visible: false,
      name: "",
      fileList: [],
      imgUrl: "",
      headers: {
        authorization: `Bearer ${this.$store.getters.CURRENT_USER.token}`,
      },
    };
  },

  methods: {
    showModal() {
      this.visible = true;
      this.name = this.brand.name;
      this.imgUrl = this.brand.logo;
    },
    handleOk() {
      this.fileList.forEach((element) => {
        this.imgUrl = element.response.url;
      });
      axios
        .patch(api_link.brand + "/" + this.brand.id, {
          name: this.name,
          logo: this.imgUrl,
        })
        .then((response) => {
          const { statusCode } = response.data;
          if (statusCode === 200) {
            this.$message.success("Cập nhật thương hiệu thành công");
            this.visible = false;
            this.name = "";
            this.imgUrl = "";
            this.fileList = [];
            this.$store.dispatch("brand/getAllBrand");
          } else {
            this.$message.error("Vui lòng thử lại sau");
            this.visible = false;
            this.name = "";
            this.imgUrl = "";
            this.fileList = [];
          }
        })
        .catch(() => {
          this.$message.error("Cập nhật thương hiệu thất bại");
        });
    },
  },
};
</script>
