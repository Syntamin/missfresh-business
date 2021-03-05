<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[defaultSelectedKeys]"
      :default-open-keys="[defaultOpenKeys]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <template v-for="routes in this.$store.state.menuRoutes">
        <a-sub-menu v-if="!routes.meta.hidden" :key="routes.name">
          <span slot="title"
            ><a-icon :type="routes.meta.icon" /><span>{{
              routes.meta.title
            }}</span></span
          >
          <template v-for="option in routes.children">
            <a-menu-item :key="option.name" v-if="!option.meta.hidden">
              <router-link :to="{ name: option.name }">
                <a-icon :type="option.meta.icon" />
                <span>
                  {{ option.meta.title }}
                </span>
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  computed: {
    defaultSelectedKeys: {
      get() {
        return this.$router.currentRoute.matched[1]
          ? this.$router.currentRoute.matched[1].name
          : '';
      },
    },
    defaultOpenKeys: {
      get() {
        return this.$router.currentRoute.matched[0].name;
      },
    },
  },
};
</script>
