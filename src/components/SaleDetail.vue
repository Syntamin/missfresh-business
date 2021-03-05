<template>
  <a-form-model
    class="basic-detail"
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <!-- 商品价格 -->
    <a-form-model-item label="商品价格" prop="price">
      <a-input v-model="form.price" placeholder="请添加商品价格" />
    </a-form-model-item>
    <!-- 商品折扣价 -->
    <a-form-model-item label="商品折扣价" prop="price_off">
      <a-input v-model="form.price_off" placeholder="请添加商品折扣价" />
    </a-form-model-item>
    <!-- 商品库存量 -->
    <a-form-model-item label="商品库存量" prop="inventory">
      <a-input v-model="form.inventory" placeholder="请添加商品库存量" />
    </a-form-model-item>
    <!-- 商品单位 -->
    <a-form-model-item label="计量单位" prop="unit">
      <a-input v-model="form.unit" placeholder="请添加商品计量单位" />
    </a-form-model-item>
    <!-- 商品相册 -->
    <a-form-model-item label="商品标签" prop="tags">
      <div class="clearfix">
        <a-upload
          :action="
            'http://mallapi.duyiedu.com/upload/images?appkey=' +
            $store.state.user.appkey
          "
          list-type="picture-card"
          :file-list="fileList"
          name="avatar"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
    </a-form-model-item>
    <a-button type="primary" @click="onPrev"> 上一步 </a-button>
    <a-button type="primary" @click="onNext"> 提交 </a-button>
  </a-form-model>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ['form'],
  data() {
    return {
      labelCol: { span: 3, offset: 3 },
      wrapperCol: { span: 13 },
      rules: {
        price: [
          {
            // type: 'number',
            required: true,
            message: '请输入商品价格',
            trigger: 'blur',
          },
        ],
        // price_off: [
        //   {
        //     type: 'number',
        //     message: '请输入商品价格',
        //     trigger: 'blur',
        //   },
        // ],
        inventory: [
          {
            // type: 'number',
            required: true,
            message: '请输入商品库存量',
            trigger: 'blur',
          },
        ],
        unit: [
          {
            // type: 'string',
            required: true,
            message: '请输入商品计量单位',
            trigger: 'blur',
          },
        ],
      },
      // 上传数据
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  },
  // 编辑过程中显示图片数据
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const temp = file;
      if (!file.url && !file.preview) {
        temp.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    // 每次添加图片都需要在图片数组里面操作
    handleChange({ file, fileList }) {
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
    },
    onPrev() {
      this.$emit('prevStep');
    },
    onNext() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          return this.$emit('nextStep', this.form);
        }
        this.$message.error('信息填写错误');
        return false;
      });
    },
  },
};
</script>
