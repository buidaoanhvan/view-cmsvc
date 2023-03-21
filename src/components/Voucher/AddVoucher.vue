<template>
  <a-button type="primary" @click="showModal" style="margin-left: 10px"
    >+</a-button
  >
  <a-modal
    v-model:visible="visible"
    width="800px"
    title="Thêm Voucher"
    cancelText="Hủy"
    okText="Thêm"
    :maskClosable="false"
    @ok="handleOk"
  >
    <a-row>
      <a-col :span="12" class="box-add-vc">
        <!-- Tên voucher: -->
        <a-typography-text type="secondary">Tên voucher:</a-typography-text>
        <a-input
          v-model:value="title"
          placeholder="Tên voucher"
          style="margin-bottom: 15px"
        />
        <!-- Mô tả: -->
        <a-typography-text type="secondary">Mô tả:</a-typography-text>
        <a-input
          v-model:value="description"
          placeholder="Mô tả"
          style="margin-bottom: 15px"
        />
        <!-- Hình ảnh: -->
        <a-typography-text type="secondary">Hình ảnh:</a-typography-text>
        <a-input
          v-model:value="image"
          placeholder="Hình ảnh"
          style="margin-bottom: 15px"
        />
        <!-- Thương hiệu cung cấp: -->
        <div class="select-box">
          <a-typography-text type="secondary"
            >Thương hiệu cung cấp:</a-typography-text
          >
          <a-select
            v-model:value="brandId"
            show-search
            placeholder="Chọn thương hiệu"
            style="width: 100%; margin-bottom: 15px"
            :options="listBrand"
            :filter-option="filterBrand"
            :fieldNames="{ label: 'name', value: 'id' }"
            @change="handleChangeBrand"
          ></a-select>
        </div>
        <!-- Ngày bắt đầu: -->
        <a-typography-text type="secondary">Ngày bắt đầu:</a-typography-text>
        <a-date-picker
          placeholder="Ngày bắt đầu"
          style="width: 100%; margin-bottom: 15px"
          @change="onChangeStart"
        />
      </a-col>
      <a-col :span="12" class="box-add-vc">
        <!-- Giá trị voucher: -->
        <a-typography-text type="secondary">Giá trị voucher:</a-typography-text>
        <a-input
          v-model:value="discount_value"
          placeholder="Giá trị giảm"
          style="margin-bottom: 15px"
        />
        <!-- Loại voucher giảm: -->
        <div class="select-box">
          <a-typography-text type="secondary"
            >Loại voucher giảm:</a-typography-text
          >
          <a-select
            v-model:value="discount_type"
            placeholder="Chọn loại giảm giá"
            style="width: 100%; margin-bottom: 15px"
            :options="options_discount_type"
            @change="handleChangeDiscountType"
          ></a-select>
        </div>
        <!-- Giảm tối đa: -->
        <a-typography-text type="secondary">Giảm tối đa:</a-typography-text>
        <a-input
          v-model:value="max_discount"
          placeholder="Giảm tối đa"
          style="margin-bottom: 15px"
        />
        <!-- Đối tác: -->
        <div class="select-box">
          <a-typography-text type="secondary">Đối tác:</a-typography-text>
          <a-select
            v-model:value="supplierId"
            show-search
            placeholder="Chọn đối tác"
            style="width: 100%; margin-bottom: 15px"
            :options="listSupplier"
            :filter-option="filterSupplier"
            :fieldNames="{ label: 'name', value: 'id' }"
            @change="handleChangeSupplier"
          ></a-select>
        </div>
        <!-- Ngày kết thúc: -->
        <a-typography-text type="secondary">Ngày kết thúc:</a-typography-text>
        <a-date-picker
          placeholder="Ngày kết thúc"
          style="width: 100%; margin-bottom: 15px"
          @change="onChangeEnd"
        />
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { brandStore, supplierStore, voucherStore } from "@/store";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const brandS = brandStore();
    const supplierS = supplierStore();
    const voucherS = voucherStore();
    const { listBrand } = storeToRefs(brandS);
    const { listSupplier } = storeToRefs(supplierS);
    return { brandS, supplierS, listBrand, listSupplier, voucherS };
  },

  data() {
    return {
      visible: false,
      supplierId: "",
      brandId: "",
      title: "",
      description: "",
      discount_value: "",
      discount_type: "",
      max_discount: "",
      image: "",
      start_time: "",
      end_time: "",
      options_discount_type: [
        {
          value: 1,
          label: "Giảm theo %",
        },
        {
          value: 2,
          label: "Giảm theo giá tiền",
        },
        {
          value: 3,
          label: "Giảm theo cách thức khác",
        },
      ],
    };
  },

  methods: {
    showModal() {
      this.visible = true;
      this.brandS.getBrandAll();
      this.supplierS.getSupplierAll();
    },

    filterSupplier(input, option) {
      return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },

    filterBrand(input, option) {
      return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },

    handleChangeSupplier(value) {
      this.supplierId = value;
    },

    handleChangeDiscountType(value) {
      this.discount_type = value;
    },

    handleChangeBrand(value) {
      this.brandId = value;
    },

    onChangeStart(date) {
      this.start_time = date;
    },

    onChangeEnd(date) {
      this.end_time = date;
    },

    handleOk() {
      // <!-- id	brandId	supplierId	title	description	image	status	discount_value	discount_type	max_discount	start_time	end_time -->
      if (
        this.title &&
        this.description &&
        this.discount_value &&
        this.discount_type &&
        this.max_discount &&
        this.start_time &&
        this.end_time
      ) {
        this.voucherS.addVoucher(
          this.brandId,
          this.supplierId,
          this.title,
          this.description,
          this.image,
          parseInt(this.discount_value),
          parseInt(this.discount_type),
          parseInt(this.max_discount),
          this.start_time,
          this.end_time
        );
      } else {
        this.$message.warning("Vui lòng điền đủ thông tin");
      }
    },
  },
};
</script>

<style scoped>
.box-add-vc {
  padding: 0px 10px;
}
</style>
