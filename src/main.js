import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import store from '../store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/style.css'


Vue.config.productionTip = false

Vue.use(BootstrapVue);

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
