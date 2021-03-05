module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/missfresh-business-show' : '/',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
};
