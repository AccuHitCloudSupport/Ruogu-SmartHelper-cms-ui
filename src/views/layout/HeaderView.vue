<template>
    <div class="navbar-top">
        <div class="navbar-collapse">
            <div class="d-flex align-items-center justify-content-between">
                <div class="navbar-logo">
                    <img src="../../assets/img/logo2.png" width="113" alt="logo">
                </div>

                <ul class="d-flex align-items-center">
                    <li class="d-flex align-items-center username" v-on:click="openModifyPasswordModel()"><img
                            src="../../assets/img/user-line.svg">{{ userName }}</li>
                    <li>
                        <button title="登出" class="btn" v-on:click="logout()">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 3.25C11.8011 3.25 11.6103 3.32902 11.4697 3.46967C11.329 3.61032 11.25 3.80109 11.25 4C11.25 4.19891 11.329 4.38968 11.4697 4.53033C11.6103 4.67098 11.8011 4.75 12 4.75C12.9521 4.75 13.8948 4.93753 14.7745 5.30187C15.6541 5.66622 16.4533 6.20025 17.1265 6.87348C17.7997 7.5467 18.3338 8.34593 18.6981 9.22554C19.0625 10.1052 19.25 11.0479 19.25 12C19.25 12.9521 19.0625 13.8948 18.6981 14.7745C18.3338 15.6541 17.7997 16.4533 17.1265 17.1265C16.4533 17.7997 15.6541 18.3338 14.7745 18.6981C13.8948 19.0625 12.9521 19.25 12 19.25C11.8011 19.25 11.6103 19.329 11.4697 19.4697C11.329 19.6103 11.25 19.8011 11.25 20C11.25 20.1989 11.329 20.3897 11.4697 20.5303C11.6103 20.671 11.8011 20.75 12 20.75C14.3206 20.75 16.5462 19.8281 18.1872 18.1872C19.8281 16.5462 20.75 14.3206 20.75 12C20.75 9.67936 19.8281 7.45376 18.1872 5.81282C16.5462 4.17187 14.3206 3.25 12 3.25Z"
                                    fill="#F2994A" />
                                <path
                                    d="M10.47 9.53009C10.3375 9.38792 10.2654 9.19987 10.2688 9.00557C10.2723 8.81127 10.351 8.62588 10.4884 8.48847C10.6258 8.35106 10.8112 8.27234 11.0055 8.26892C11.1998 8.26549 11.3878 8.33761 11.53 8.47009L14.53 11.4701C14.6705 11.6107 14.7493 11.8013 14.7493 12.0001C14.7493 12.1988 14.6705 12.3895 14.53 12.5301L11.53 15.5301C11.4613 15.6038 11.3785 15.6629 11.2865 15.7039C11.1945 15.7449 11.0952 15.7669 10.9945 15.7687C10.8938 15.7705 10.7938 15.7519 10.7004 15.7142C10.607 15.6765 10.5222 15.6203 10.451 15.5491C10.3797 15.4779 10.3236 15.3931 10.2859 15.2997C10.2482 15.2063 10.2296 15.1063 10.2314 15.0056C10.2332 14.9049 10.2552 14.8056 10.2962 14.7136C10.3372 14.6216 10.3963 14.5388 10.47 14.4701L12.19 12.7501H4C3.80109 12.7501 3.61032 12.6711 3.46967 12.5304C3.32902 12.3898 3.25 12.199 3.25 12.0001C3.25 11.8012 3.32902 11.6104 3.46967 11.4698C3.61032 11.3291 3.80109 11.2501 4 11.2501H12.19L10.47 9.53009Z"
                                    fill="#F2994A" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <!-- <h1>This is an Header page</h1> -->
    </div>
    <div class="modal fade" data-bs-backdrop="static" ref="modifyPasswordModelRef" id="modifyPasswordModel" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">修改密碼</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <VForm ref="modifyPassword" @submit="modifyPasswordForm">
                        <div class="mb-3">
                            <label class="form-label required">密碼</label>
                            <VField class="form-control" v-model="newPassword" name="newPassword" type="password"
                                rules="required" />
                            <ErrorMessage name="newPassword">
                                <p class="error">請輸入密碼</p>
                            </ErrorMessage>
                        </div>
                        <div class="mb-3">
                            <label class="form-label required">確認密碼</label>
                            <VField class="form-control" v-model="newPasswordAgain" name="newPasswordAgain" type="password"
                                rules="required" />
                            <ErrorMessage name="newPasswordAgain">
                                <p class="error">請再次輸入密碼</p>
                            </ErrorMessage>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-outline-secondary px-4" type="button" data-bs-dismiss="modal">取消</button>
                            <button class="btn btn-primary px-5" type="submit">儲存</button>
                        </div>

                    </VForm>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" data-bs-backdrop="static" ref="modifyPasswordMessageModelRef" id="modifyPasswordMessageModel"
        tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered tips">
            <div class="modal-content">
                <div class="modal-body">
                    <p class="text-center my-3">修改密碼成功！<br/>按下確認後請重新登入</p>
                    <div class="modal-footer d-flex justify-content-center">
                        <button type="button" class="btn btn-outline-secondary px-4" v-on:click="closeModifyPasswordMessageModel()">
                            確定
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import loginApiService from '@/api/login/loginApiService';
import { useLoading } from 'vue-loading-overlay';
import { Modal } from "bootstrap";
import router from '@/router';
import { onMounted, ref } from "vue";
import Notify from "../../utility/notify.js";
export default {
    name: 'HeaderView',
    props: {
        msg: String
    },
    setup() {
        const modifyPasswordModelRef = ref(null);
        const modifyPasswordMessageModelRef = ref(null);

        const newPassword = ref(null);
        const newPasswordAgain = ref(null);
        const userName = JSON.parse(sessionStorage.getItem('UserInfo')).name;
        const loading = useLoading({
            // options
        });
        let modifyPasswordModel;
        let modifyPasswordMessageModel;
        onMounted(() => {
            modifyPasswordModel = new Modal(modifyPasswordModelRef.value);
            modifyPasswordMessageModel = new Modal(modifyPasswordMessageModelRef.value);
        })

        function openModifyPasswordMessageModel() {
            modifyPasswordMessageModel.show();
        }
        function closeModifyPasswordMessageModel() {
            sessionStorage.removeItem("Token");
            sessionStorage.removeItem("UserInfo");
            router.push('/login')
            modifyPasswordMessageModel.hide();
        }

        function openModifyPasswordModel() {
            modifyPasswordModel.show();
        }
        function closeModifyPasswordModel() {
            modifyPasswordModel.hide();
        }
        const modifyPasswordForm = (value) => {
            if (value.newPassword === value.newPasswordAgain) {
                changePassword(value.newPassword)
            } else {
                Notify.error('兩個密碼輸入不一致請重新確認')
            }

        };
        function changePassword(data) {
            const loader = loading.show({
                // Optional parameters
                color: '#F2994a'
            });
            loginApiService.changePassword({
                "password": data
            })
                .then((data) => {
                    if (data.status === 200) {
                        loader.hide();
                        closeModifyPasswordModel();
                        openModifyPasswordMessageModel();
                    } else {
                        loader.hide();
                        Notify.error(data.message)
                    }

                })
                .catch(e => {
                    loader.hide();
                    Notify.error(e.message)
                });
        }
        //定義方法
        function logout() {
            const loader = loading.show({
                // Optional parameters
                color: '#F2994a'
            });
            loginApiService.logout({
                "token": sessionStorage.getItem("Token")
            })
                .then((response) => {
                    if (response.status !== undefined && response.status === 200) {
                        loader.hide()
                        sessionStorage.removeItem("Token");
                        sessionStorage.removeItem("UserInfo");
                        router.push('/login')
                    } else {
                        loader.hide();
                        Notify.error(response.message)
                    }
                })
                .catch(e => {
                    loader.hide();
                    Notify.error(e.message)
                });
        }
        return { userName, newPassword, newPasswordAgain, modifyPasswordForm, modifyPasswordModel, modifyPasswordMessageModel, modifyPasswordModelRef, modifyPasswordMessageModelRef, loading, logout, openModifyPasswordModel, closeModifyPasswordModel, openModifyPasswordMessageModel, closeModifyPasswordMessageModel }
    }
}
</script>
