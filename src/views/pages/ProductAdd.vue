<template>
  <div>
    <a-steps class="steps" :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <BasicDetail v-if="current === 0" @nextStep="next" :form="form" />
      <SaleDetail
        v-else-if="current === 1"
        @prevStep="prev"
        @nextStep="next"
        :form="form"
      />
      <!-- <SaleDetail :form="form"/> -->
    </div>
  </div>
</template>
<script>
import BasicDetail from '@/components/BasicDetail.vue';
import SaleDetail from '@/components/SaleDetail.vue';
import apiProducts from '@/api/products';

export default {
  components: {
    BasicDetail,
    SaleDetail,
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
          content: 'First-content',
        },
        {
          title: '填写商品销售信息',
          content: 'Second-content',
        },
      ],
      form: {
        title: '',
        desc: '',
        category: null,
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        inventory: 0,
        unit: '',
        images: [],
      },
    };
  },
  created() {
    const { id } = this.$route.params;
    if (id) {
      apiProducts.detailProduct(id).then((res) => {
        this.form = res.data;
      });
    }
  },
  mounted() {
    console.log('000', this.form);
  },
  methods: {
    next(formInfo) {
      console.log('111', { ...this.form });
      // ???? 每个填写信息的页面都会使用此方法，所以将其混合到同一个对象中
      this.form = {
        ...this.form,
        formInfo,
      };
      console.log('222', this.form);
      if (this.current === 1) {
        if (this.$route.params.id) {
          apiProducts.editProduct(this.form).then(() => {
            this.$success({
              title: 'miessfresh info',
              // JSX support
              content: (
              <div>
                <p>修改商品成功</p>
              </div>
              ),
            });
            this.$router.push({ name: 'ProductList' });
          });
        } else {
          apiProducts.addProduct(this.form).then(() => {
            this.$success({
              title: 'miessfresh info',
              // JSX support
              content: (
              <div>
                <p>新增商品成功</p>
              </div>
              ),
            });
            this.$router.push({ name: 'ProductList' });
          });
        }
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style lang='less' scoped>
.steps {
  width: 50%;
  margin: 20px auto;
}
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>
