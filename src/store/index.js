import Vue from 'vue';
import Vuex from 'vuex';
import useCookie from '@/utils/useCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用于控制左侧菜单栏是否展开的变量， true 展开， false 收缩
    collapsed: false,

    // 用户账户信息
    user: useCookie.getUserCookie(),
    // 菜单路由
    menuRoutes: [],
  },
  mutations: {
    // 修改导航栏伸缩装填
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    // 登录时设置用户账户信息
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    // 退出登录置空用户信息
    logOut(state) {
      state.user.username = '';
      state.user.email = '';
      state.user.appkey = '';
      state.user.role = '';
    },
    // 添加菜单栏路由
    changeMenu(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    changeCollapsed(context) {
      context.commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      // 1.存储到cookie
      useCookie.setCookie(userInfo);
      commit('setUserInfo', userInfo);
    },
    logOut({ commit }) {
      commit('logOut');
    },
    changeMenu({ commit }, routes) {
      commit('changeMenu', routes);
    },
  },
  modules: {
  },
});
