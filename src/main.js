import Vue from 'vue';
import animate from 'animate.css';
import VCharts from 'v-charts';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/ant-design-vue';
import '@/assets/css/reset.css';

Vue.use(animate);
Vue.use(VCharts);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
