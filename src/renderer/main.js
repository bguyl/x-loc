import Vue from 'vue';

import App from './App';
import router from './router';

// Import css librairies
import 'materialize-css/dist/css/materialize.css';
import 'font-awesome/css/font-awesome.css';

// Import js librairies

import * as $ from 'jquery';
window.$ = window.jQuery = $;
require('hammerjs');
require('materialize-css');

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app');
