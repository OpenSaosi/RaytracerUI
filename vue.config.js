const vueConfig = {
    "transpileDependencies": [
      "vuetify"
    ],
     publicPath: "./" // "https://www.nonmql.com/"
};

if (process.env.NODE_ENV === 'production') {
  vueConfig.chainWebpack = (config) => {
    config.plugin('html').init((P