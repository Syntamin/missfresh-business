<template>
  <a-form-model
    layout="inline"
    :model="Search"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <!-- 检索关键字输入框 -->
    <a-form-model-item label="检索关键字">
      <a-input v-model="Search.searchWord" placeholder="请输入关键字">
      </a-input>
    </a-form-model-item>
    <!-- 商品类目选择器 -->
    <a-form-model-item label="商品类目">
      <a-select
        show-search
        placeholder="请选择类目"
        style="width: 200px"
        @change="handleChange"
        allowClear
      >
        <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
          {{ c.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" html-type="submit"> 搜索 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import apiCategory from '@/api/category';

export default {
  created() {
    apiCategory.getCategory().then((response) => {
      this.categoryList = response.data.data;
    });
  },
  data() {
    return {
      Search: {
        searchWord: '',
        category: '',
      },
      categoryList: [],
    };
  },
  methods: {
    // 搜索按钮点击提交
    handleSubmit() {
      this.$emit('submitSearch', this.Search);
    },
    // selection 选择事件
    handleChange(value) {
      this.Search.category = value;
    },
  },
};
</script>
