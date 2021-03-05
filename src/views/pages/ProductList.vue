<template>
  <div class="product-list">
    <div class="search-input">
      <search-input @submitSearch="getSearch" />
    </div>
    <a-button>
      <router-link :to="{ name: 'ProductAdd' }">添加商品</router-link>
    </a-button>
    <div class="products-table">
      <products-table
        :data="tableData"
        :pagination="page"
        @changePage="changePage"
        @edit="editProduct"
        @remove="removeProduct"
      />
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue';
import ProductsTable from '@/components/ProductsTable.vue';
import apiProducts from '@/api/products';

export default {
  components: {
    SearchInput,
    ProductsTable,
  },
  created() {
    this.getTableData();
  },
  data() {
    return {
      // 商品数据
      tableData: [],
      // 搜索框组件传递的关键词
      searchForm: {},
      // 需要传递到 table 的翻页数据
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
    };
  },
  methods: {
    // 子组件传值事件
    // 搜索关键字事件 ？？ 搜索完关键字后页码依旧停留在当前页码，如果调用方法使其跳转将会造成死循环，该如何解决 1：重构分页的change事件
    getSearch(value) {
      this.searchForm = value;
      this.getTableData();
    },
    // 获取商品信息
    getTableData() {
      apiProducts
        .searchProductsAll({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((response) => {
          this.page.total = response.data.total;
          this.tableData = response.data.data;
        });
    },
    // 更改页面
    changePage(pagination) {
      this.page.current = pagination.current;
      this.page.pageSize = pagination.pageSize;
      this.getTableData({});
    },
    // 编辑商品
    editProduct(value) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: value.id,
        },
      });
    },
    // 删除商品
    removeProduct(value) {
      apiProducts
        .removeProduct(value.id)
        .then((response) => {
          if (response.status === 'success') {
            return this.getTableData();
          }
          return this.$confirm(response.msg);
        })
        .catch((error) => this.$confirm(error));
    },
  },
};
</script>

<style scoped lang='less'>
.product-list {
  position: relative;
  .search-input {
    padding: 10px 10px 10px 30px;
  }
  .ant-btn {
    position: absolute;
    right: 20px;
    top: 15px;
  }
}
</style>
