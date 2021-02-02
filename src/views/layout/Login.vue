<template>
  <div class="login">
    <a-form-model
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      v-bind="layout"
    >
      <!-- 账户 邮箱 -->
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginForm.email" type="email" autocomplete="off" />
      </a-form-model-item>
      <!-- 密码 -->
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">
          登录
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import user from '@/api/user';
import constant from '@/constant/index';
// import useCookie from '@/utils/useCookie';

export default {
  data() {
    const emailReg = /^[\w-.]+@[\w.]+com|cn/;
    // 账户校验规则
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账户'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式错误'));
    };
    // 密码校验规则
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      return callback();
    };
    return {
      loginForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          user
            .login(this.loginForm)
            .then((response) => {
              console.log(response);
              if (response.status === constant.SUCCESS) {
                this.$store.dispatch('setUserInfo', response.data);
                // jumpping to home page
                this.$router.push({
                  name: 'Home',
                });
              } else if (response.status === constant.FAIL) {
                this.$message.error(response.msg);
              }
            })
            .catch((error) => {
              console.log(error);
              this.$message.error(error);
            });
          return true;
        }
        // console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang='less'>
@import url("~@/assets/css/login.less");
</style>
