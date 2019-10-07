import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GCP_API_KEY,
    libraries: "places"
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
