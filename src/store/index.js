import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用于控制左侧菜单栏是否展开的变量， true 展开， false 收缩
    collapsed: false,
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
  actions: {
    changeCollapsed(context) {
      context.commit('changeCollapsed');
    },
  },
  modules: {
  },
});
