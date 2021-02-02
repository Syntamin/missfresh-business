<template>
  <div class="home">
    <left-slider></left-slider>
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <header-nav></header-nav>
    </div>
  </div>
</template>

<script>
import LeftSlider from './components/left-slider.vue';
import HeaderNav from './components/header-nav.vue';

export default {
  components: {
    LeftSlider,
    HeaderNav,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang='less'>
/* 需要在style标签上加上特性，值为使用的预处理器的后缀名 */
/* @代表src目录，但在css中时需要使用~符号表示其为一个模块路径 */
@import "~@/assets/css/home.less";
</style>
