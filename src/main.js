import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import i18n from "./i18n";
import api from "./apis";
import Pagination from "@/components/Pagination"
import '@/assets/scss/base.scss'

Vue.prototype.$api = api;
Vue.config.productionTip = false;
Vue.component("Pagination", Pagination)
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");
