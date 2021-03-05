<template>
  <div class="productsTable">
    <a-table
      :columns="columns"
      :data-source="products"
      :pagination="pagination"
      @change="onChange"
    >
      <template slot="action" slot-scope="text, record">
        <a-button type="primary" @click="editProduct(record)">编辑</a-button>
        <a-button type="danger" @click="removeProduct(record)">删除</a-button>
      </template>
    </a-table>
  </div>
</template>
<script>
// :pagination="paginations"

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc 1',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'category',
    key: 'category 2',
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price 3',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off 4',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags 5',
  },
  {
    title: '限制商品数量',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status 7',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'x',
    width: 200,
    scopedSlots: { customRender: 'action' },
  },
];

export default {
  props: ['data', 'pagination'],
  data() {
    return {
      columns,
    };
  },
  computed: {
    // 为什么使用计算属性可以成功渲染而使用 data 将得不到数据
    products() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    // 分页时的处理函数
    onChange(page) {
      this.$emit('changePage', page);
    },
    // 编辑按钮事件
    editProduct(record) {
      this.$emit('edit', record);
    },
    // 删除按钮事件
    removeProduct(record) {
      this.$emit('remove', record);
    },
  },
};
</script>

<style lang='less'>
.productsTable {
  .ant-btn {
    margin: 0 5px;
  }
}
</style>
