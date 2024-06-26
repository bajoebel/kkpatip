import Vue from 'vue'
import axios from 'axios';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import '../public/assets/css/style.css'
import './app.scss'

// Switalert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};

Vue.use(VueSweetalert2, options);

// import { Select2 } from "select2-vue-component";
// Vue.component('select2', Select2)
// Make BootstrapVue available throughout your project
axios.defaults.baseURL=process.env.VUE_APP_BASE_URL;
// axios.defaults.baseURL = process.env.ATIP_API_URL
// Vue.use(axios)
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// Vue.use(axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
