const permissionRoutes = {
  coustomer: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'ProductEdit',
    },
  ],
  admin: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'ProductEdit',
    },
    {
      name: 'Category',
    },
  ],
};

/**
 * 将需要筛选的路由传入，过滤出应该得到的路由
 * @param {*} role 用户身份
 * @param {*} routes 需要筛选的路由
 * @returns {*} resultRoutes 筛选出来的具有权限的路由
 */
export default function getMenu(role, routes) {
  const allowRoutesName = permissionRoutes[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
    const objTemp = r;
    if (allowRoutesName.indexOf(r.name) !== -1) {
      const { children } = objTemp;
      objTemp.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
