import Vue from 'vue'

import App from './App'

// Import css librairies
import 'materialize-css/dist/css/materialize.css'
import 'font-awesome/css/font-awesome.css'

// Import js librairies

import * as $ from 'jquery'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
window.$ = window.jQuery = $
require('hammerjs')
require('materialize-css')

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
