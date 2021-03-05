<template>
  <a-form-model
    class="basic-detail"
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <!-- 标题 -->
    <a-form-model-item label="标题" prop="title">
      <a-input v-model="form.title" placeholder="请添加商品标题" />
    </a-form-model-item>
    <!-- 商品描述 -->
    <a-form-model-item label="商品描述" prop="desc">
      <a-textarea v-model="form.desc" placeholder="请添加商品描述" :rows="2" />
    </a-form-model-item>
    <!-- 商品类目 -->
    <a-form-model-item label="商品类目" prop="category">
      <a-select
        v-model="form.category"
         placeholder="请添加类目"
        @change="selectCategory"
      >
        <a-select-option v-for="c in categoryList" :value="c.id" :key="c.id">{{
          c.name
        }}</a-select-option>
      </a-select>
      <a-select v-model="form.c_items" placeholder="请添加子类目">
        <a-select-option v-for="c in categoryItems" :value="c" :key="c">{{
          c
        }}</a-select-option>
      </a-select>
    </a-form-model-item>
    <!-- 商品标签 -->
    <a-form-model-item label="商品标签" prop="tags">
      <a-select
        mode="tags"
        placeholder="请选择商品标签"
        :default-value="['包邮，最晚次日达']"
        v-model="form.tags"
      >
        <a-select-option value="包邮，最晚次日达">
          包邮，最晚次日达
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-button type="primary" @click="onSubmit"> 下一步 </a-button>
  </a-form-model>
</template>
<script>
import Category from '@/api/category';

export default {
  props: ['form'],
  data() {
    return {
      // 居中显示，添加了offset
      labelCol: { span: 3, offset: 3 },
      wrapperCol: { span: 13 },
      categoryList: [],
      categoryItems: [],
      rules: {
        title: [
          {
            required: true,
            message: '请输入商品标题',
            trigger: 'blur',
          },
        ],
        category: [
          {
            required: true,
            message: '请选择类目',
            trigger: 'blur',
          },
        ],
        tags: [
          {
            required: true,
            message: '请选择商品标签',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  created() {
    Category.getCategory().then((res) => {
      this.categoryList = res.data.data;
    });
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          return this.$emit('nextStep', this.form);
        }
        this.$message.error('信息填写错误');
        return false;
      });
    },
    // 上一级select被改变时,当前select选项被改变
    selectCategory(val) {
      this.categoryItems.splice(0, this.categoryItems.length); // 将上一次选择的选项清空
      this.form.c_items = null; // 每次选择父级类目都需要将子级类目置空
      const temp = this.categoryList[val - 1];
      for (let i = 0; i < temp.c_items.length; i += 1) {
        this.categoryItems.push(temp.c_items[i]);
      }
    },
  },
};
</script>
