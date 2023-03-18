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
        <a-typography-title :level="3">Thương hiệu</a-typography-title>
        <AddBrand @ok="getBrandList"></AddBrand>
      </a-row>
      <div
        :style="{
          height: 'calc(100vh - 268px)',
          marginTop: '16px',
          overflow: 'auto',
        }"
      >
        <a-list
          :grid="{ gutter: 20 }"
          :data-source="data"
          style="overflow-x: hidden"
        >
          <template #renderItem="{ item }">
            <a-list-item @click="getBrandList">
              <a-card hoverable style="width: 200px">
                <template #cover>
                  <img
                    alt="example"
                    :src="item.logo"
                    :width="200"
                    :height="200"
                  />
                </template>
                <a-card-meta :title="item.name"> </a-card-meta>
                <template #actions>
                  <a key="list-loadmore-edit">edit</a>
                  <a key="list-loadmore-more">more</a>
                </template>
              </a-card>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </div>
  </a-layout-content>
</template>
<script>
import api_url from "../configs/api";
import axios from "axios";
import AddBrand from "../components/Brand/AddBrand.vue";
export default {
  components: { AddBrand },
  data() {
    return {
      data: [],
    };
  },
  async created() {
    this.getBrandList();
  },

  methods: {
    getBrandList() {
      axios.get(api_url.brand).then((req) => {
        const { data, statusCode } = req.data;
        if (statusCode == 200) {
          this.data = data;
          console.log(data);
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
