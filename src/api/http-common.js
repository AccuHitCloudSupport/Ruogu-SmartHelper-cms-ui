import router from "@/router";
import axios from "axios";
import Notify from "../utility/notify.js";

axios.defaults.timeout = 5000;
// // axios.defaults.baseURL = process.env.API_ROOT; // 域名
//axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;
axios.defaults.baseURL = "https://testing-smarthelper-cms-api.azurewebsites.net/";
// // http request 欄截
axios.interceptors.request.use(
  (config) => {
    (config.headers["Authorization"] = config.url.includes("Login")
      ? ""
      : `Bearer ${sessionStorage.getItem("Token")}`),
      (config.headers["Access-Control-Allow-Origin"] = "*");
    config.headers["Access-Control-Allow-Methods"] =
      "GET, PUT, POST, DELETE, OPTIONS";
    config.headers["Access-Control-Max-Age"] = "86400";
    config.headers["Accept"] = "application/json,multipart/form-data";
    config.url.includes("documents") && config.method === "post"
      ? (config.headers["Content-Type"] = "multipart/form-data")
      : (config.headers["Content-Type"] = "application/json");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 異常處理
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err && err.response) {
      let fileNmae = "";

      switch (err.response.status) {
        case 401:
          Notify.error("沒有權限請重新登入");
          sessionStorage.removeItem("Token");
          router.push("/login");
          // this.subject.next(123)
          break;
        case 404:
          Notify.error(`找不到該頁面`);
          break;
        case 500:
          Notify.error(`伺服器出錯`);
          break;
        case 503:
          Notify.error("服務失效");
          break;
        case 409:
          if (err.response.data.duplicates !== undefined) {
            err.response.data.duplicates.forEach((element) => {
              fileNmae += element;
            });
          }
          Notify.error(`檔案上傳重複<br/> ${fileNmae}`);
          break;
      }
    } else {
      Notify.error("連接到服務器失敗");
      sessionStorage.removeItem("Token");
      router.push("/login");
    }
    return Promise.resolve(err);
  }
);
export default axios;
