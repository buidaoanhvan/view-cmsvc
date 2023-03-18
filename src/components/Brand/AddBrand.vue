<template>
  <div>
    <a-button type="primary" @click="showModal" style="margin-left: 10px"
      >+</a-button
    >
    <a-modal
      v-model:visible="visible"
      width="500px"
      title="Thêm thương hiệu"
      cancelText="Hủy"
      okText="Thêm"
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
          Tải lên hình ảnh thương hiệu
        </a-button>
      </a-upload>
    </a-modal>
  </div>
</template>
<script>
import { UploadOutlined } from "@ant-design/icons-vue";
import axios from "axios";
import api_link from "@/configs/api";
export default {
  components: {
    UploadOutlined,
  },
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
    },
    handleOk() {
      if (this.name && this.fileList.length > 0) {
        this.fileList.forEach((element) => {
          this.imgUrl = element.response.url;
        });
        axios
          .post(api_link.brand, {
            name: this.name,
            logo: this.imgUrl,
          })
          .then((response) => {
            const { statusCode } = response.data;
            if (statusCode === 200) {
              this.$message.success("Thêm thương hiệu thành công");
              this.visible = false;
              this.name = "";
              this.imgUrl = "";
              this.fileList = [];
              this.$emit("ok");
            } else {
              this.$message.error("Vui lòng thử lại sau");
              this.visible = false;
              this.name = "";
              this.imgUrl = "";
              this.fileList = [];
            }
          })
          .catch(() => {
            // this.$message.error("Thêm thương hiệu thất bại");
          });
      } else {
        this.$message.error("Vui lòng nhập tên thương hiệu và hình ảnh");
      }
    },
  },
};
</script>
