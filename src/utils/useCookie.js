import Cookie from 'js-cookie';

export default {
  setCookie(params) {
    return Cookie.set('userInfo', params);
  },
  getUserCookie() {
    const result = Cookie.get('userInfo');
    return JSON.parse(result);
  },
};
