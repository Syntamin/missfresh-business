import Cookie from 'js-cookie';

export default {
  /**
   * 设置 Cookie
   * @param {object} params
   */
  setCookie(params) {
    const {
      email, username, appkey, role,
    } = params;
    Cookie.set('email', email, { expires: 1, path: '' });
    Cookie.set('username', username, { expires: 1, path: '' });
    Cookie.set('appkey', appkey, { expires: 1, path: '' });
    Cookie.set('role', role, { expires: 1, path: '' });
    return true;
    // return Cookie.set('userInfo', params, { expires: 1, path: '' });
  },
  /**
   * 获取用户信息的 Cookie
   */
  getUserCookie() {
    return {
      email: Cookie.get('email'),
      username: Cookie.get('username'),
      appkey: Cookie.get('appkey'),
      role: Cookie.get('role'),
    };
  },
  /**
   * 删除用户信息的 Cookie
   */
  removeUserCookie() {
    Cookie.remove('email', { path: '' });
    Cookie.remove('username', { path: '' });
    Cookie.remove('appkey', { path: '' });
    Cookie.remove('role', { path: '' });
    return true;
  },
};
