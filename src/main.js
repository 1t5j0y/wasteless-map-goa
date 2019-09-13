import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDIY-0AoM_8mTXdtrV69bP8PE8XEohPI9I",
    libraries: "places"
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
