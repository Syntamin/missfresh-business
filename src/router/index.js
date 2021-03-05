import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import getMenu from '@/utils/permission';
import Statistics from '@/views/pages/Statistics.vue';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);

// 首页 {统计} 商品 {商品列表 添加商品 类目管理}
const ayncRouterMap = [
  {
    path: '/Product',
    name: 'Product',
    component: Home,
    meta: {
      title: '商品',
      icon: 'project',
      hidden: false,
    },
    children: [
      {
        path: 'ProductList',
        name: 'ProductList',
        component: () => import('@/views/pages/ProductList.vue'),
        meta: {
          title: '商品列表',
          icon: 'unordered-list',
          hidden: false,
        },
      },
      {
        path: 'ProductAdd',
        name: 'ProductAdd',
        component: () => import('@/views/pages/ProductAdd.vue'),
        meta: {
          title: '添加商品',
          icon: 'folder-add',
          hidden: false,
        },
      },
      {
        path: 'ProductEdit/:id',
        name: 'ProductEdit',
        component: () => import('@/views/pages/ProductAdd.vue'),
        meta: {
          title: '编辑商品',
          icon: 'folder-add',
          hidden: true,
        },
      },
      {
        path: 'Category',
        name: 'Category',
        component: () => import('@/views/pages/Category.vue'),
        meta: {
          title: '类目管理',
          icon: 'control',
          hidden: false,
        },
      },
    ],
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/Statistics', // 重定向的路由组件使用异步组件将会报错
    meta: {
      title: '首页',
      icon: 'home',
      hidden: false,
    },
    children: [
      {
        path: 'Statistics',
        name: 'Statistics',
        component: Statistics,
        meta: {
          title: '统计',
          icon: 'area-chart',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      icon: 'login',
      hidden: true,
    },
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

let isAddRoutes = false; // 避免每次路由跳转都会执行操作造成栈溢出
router.beforeEach((to, from, next) => {
  const { user } = store.state;
  // if the router isn't go to login page
  if (to.path !== '/login') {
    if (user.username
      && user.email
      && user.appkey
      && user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenu(user.role, ayncRouterMap);
        store.dispatch('changeMenu', routes.concat(menuRoutes)).then(() => {
          // 当 dispatch 之后才动态添加路由，异步代码，防止在跳转完成后路由才被渲染出来
          router.addRoutes(menuRoutes); // 用户鉴权
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  // 当不跳转到 login 时，也判断用户信息是否存在，存在则不能跳转到登录页面，直接跳转到首页
  if (user.username
    && user.email
    && user.appkey
    && user.role) {
    return next('/');
  }
  return next();
});

export default router;
