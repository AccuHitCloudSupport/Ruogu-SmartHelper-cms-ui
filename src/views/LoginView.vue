<template>
  <div class="login">
    <h1>愛酷智能科技</h1>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="form-inner">
            <div>
              <img src="../assets/img/logo.png" alt="logo">
            </div>
            <h2 class="h2">Welcome!</h2>
            <p>Sign Into Your Account</p>

            <div class="w-full">
              <VForm v-slot="{ meta }">
                <div class="mb-3 text-start tip">
                  <label class="form-label">帳號</label>
                  <VField class="form-control" name="email" type="email" v-model="email" rules="required|email"
                    placeholder="請輸入Email" />
                  <ErrorMessage name="email" />
                </div>

                <div class="mb-3 text-start tip">
                  <label class="form-label">密碼</label>
                  <VField class="form-control" name="password" type="password" v-model="password" rules="required"
                    placeholder="請輸入密碼" />
                  <ErrorMessage name="password" />
                </div>

                <div class="d-grid gap-2">
                  <button class="btn btn-primary" type="button" :disabled="!meta.valid" v-on:click="login()">送出</button>
                </div>

              </VForm>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginApiService from "../api/login/loginApiService";
import { ref } from "vue";
import Notify from "../utility/notify.js";
import router from '@/router';
import { useLoading } from 'vue-loading-overlay'
import loginApiService from '../api/login/loginApiService';
export default {
  name: "login-view",
  setup() {
    const email = ref(null);
    const password = ref(null);
    const loading = useLoading({
      // options
    });
    function login() {
      const loader = loading.show({
        // Optional parameters
        color: '#F2994a'
      });
      LoginApiService.login({ email: this.email, password: this.password })
        .then(response => {
          if (response.status !== undefined && response.status === 200) {
            sessionStorage.setItem('Token', response.data.token)
            loginApiService.getUserInfo().then(response => {
              sessionStorage.setItem('UserInfo', JSON.stringify(response.data))
              Notify.success("登入成功")

              loader.hide()
              router.push('/')

            }).catch(e => {
              loader.hide()
              Notify.error(e.message)
            })
          } else {
            loader.hide()
            Notify.error(response.message)
          }

        })
        .catch(e => {
          loader.hide()
          Notify.error(e.message)
        });

    }

    function newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    }
    return { email, password, login, newTutorial }

  },
};
</script>