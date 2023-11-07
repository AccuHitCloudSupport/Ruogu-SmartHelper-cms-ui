import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { Field, Form, ErrorMessage, defineRule,configure } from "vee-validate";
// 引入 VeeValidate 的驗證規則
import * as VeeValidate  from "@vee-validate/rules";
// 引入 VeeValidate 的 i18n 功能
import { localize, setLocale } from '@vee-validate/i18n';
// 引入 VeeValidate 的繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import ToastPlugin from 'vue-toast-notification';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// import the package
import VueAwesomePaginate from "vue-awesome-paginate";
// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

import "./assets/scss/style.scss";

// 使用 Object.keys 將 AllRules 轉為陣列並使用 forEach 迴圈將驗證規則加入 VeeValidate
Object.keys(VeeValidate).forEach((rule) => {
  defineRule(rule, VeeValidate[rule]);
});
// 將當前 VeeValidate 的語系設定為繁體中文
configure({
    generateMessage: localize({ zh_TW: zhTW }),
    validateOnInput: true,
  });
  setLocale('zh_TW');

const app = createApp(App);
app.component("VField", Field);
app.component("VForm", Form);
app.component("ErrorMessage", ErrorMessage);
app.component('VueDatePicker', VueDatePicker);
app.use(LoadingPlugin);
app.use(ToastPlugin);
app.use(VueAwesomePaginate);
app.use(router).mount("#app");
