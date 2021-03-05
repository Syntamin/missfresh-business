<template>
  <div class="header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ routes[0].meta.title }}</a-breadcrumb-item>
        <a-breadcrumb-item
          ><a href="">
            {{ routes[1].meta.title }}
          </a></a-breadcrumb-item
        >
      </a-breadcrumb>
    </div>
    <ul class="header-info">
      <li>
        {{ $store.state.user.username }}
        <a-icon type="down" />
      </li>
      <li class="logout" @click="logOut">退出</li>
    </ul>
  </div>
</template>

<script>
import useCookie from '@/utils/useCookie';

export default {
  data() {
    return {
      routes: this.$router.currentRoute.matched,
    };
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    logOut() {
      this.$store.dispatch('logOut');
      useCookie.removeUserCookie();
      this.$router.push({ path: '/login', name: 'Login' });
    },
  },
  watch: {
    $route() {
      this.routes = this.$router.currentRoute.matched;
    },
  },
};
</script>
