<template>
  <h2 class="tit mb-4">權限管理</h2>
  <div class="card p-4">
    <VForm ref="formSearch" @submit="searchForm">
      <div class="row search">
        <div class="col-9">
          <label class="form-label">輸入關鍵字</label>
          <VField class="form-control" name="keyWord" type="text" />
          <ErrorMessage name="keyWord" />
        </div>
        <div class="col-3 d-flex">
          <button class="btn btn-primary me-2 py-2 px-3" type="submit"><img class="me-1"
              src="../../src/assets/img/ri_search.svg"> 搜尋</button>
          <button  v-if="userInfo.permissions.includes('manage_users')" class="btn btn-blue py-2 px-3" type="button" v-on:click="openAddUserModal()"><img class="me-1"
              src="../../src/assets/img/user-add.svg"> 新增</button>
        </div>
      </div>
    </VForm>
  </div>

  <div class="card mt-3 p-4">
    <table class="table">
      <thead>
        <tr>
          <th width="8%">#</th>
          <th width="20%">姓名</th>
          <th width="15%">角色</th>
          <th>帳號</th>
          <th width="15%" v-if="userInfo.permissions.includes('manage_users')">操作</th>
        </tr>
      </thead>

      <tbody>
        <template v-for="(item, index) in userData.formData" :key="index">
          <tr>
            <td>{{ ((currentPage - 1) * pageSize) + index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.role }}</td>
            <td>{{ item.email }}</td>
            <td class="d-flex" v-if="userInfo.permissions.includes('manage_users')">
              <button class="btn btn-blue me-2" type="button" v-on:click="openModifyUserModal(item)">
                <img src="../../src/assets/img/edit.svg">
              </button>
              <button class="btn btn-red" type="button" v-on:click="openDeleteUserModal(item)">
                <img src="../../src/assets/img/delete.svg">
              </button>
            </td>
          </tr>
        </template>

      </tbody>
    </table>
    <div class="example-five">
      <vue-awesome-paginate :total-items=totalConut v-model="currentPage" :itemsPerPage="10" :on-click="onClickHandler">
        <template #prev-button>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="black" width="8" height="8" viewBox="0 0 24 24">
              <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
            </svg>
            Prev
          </span>
        </template>

        <template #next-button>
          <span>
            Next
            <svg xmlns="http://www.w3.org/2000/svg" fill="black" width="8" height="8" viewBox="0 0 24 24">
              <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
            </svg>
          </span>
        </template>
      </vue-awesome-paginate>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" data-bs-backdrop="static" ref="addUserModelRef" id="addUserModel" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增使用者</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <VForm ref="addUser" @submit="addUserForm">
            <div class="mb-3">
              <label class="form-label required">姓名</label>
              <VField class="form-control" name="addName" type="text" rules="required" />
              <ErrorMessage name="addName">
                <p class="error">請填寫姓名</p>
              </ErrorMessage>
            </div>
            <div class="mb-3">
              <label class="form-label required">帳號</label>
              <VField class="form-control" name="addEmail" type="text" rules="required|email" />
              <ErrorMessage name="addEmail">
                <p class="error">請填寫信箱</p>
              </ErrorMessage>
            </div>
            <div class="mb-3">
              <label class="form-label required">密碼</label>
              <VField class="form-control" name="addPassword" type="password" autocomplete="new-password"
                rules="required" />
              <ErrorMessage name="addPassword">
                <p class="error">請填寫密碼</p>
              </ErrorMessage>
            </div>
            <div class="mb-3">
              <label class="form-label required">角色權限</label>
              <VField class="form-select" name="addRole" as="select" rules="required">
                <option v-for="(item, index) in roleList.data" :key="index" :value="item.roleId">{{ item.roleName }}
                </option>
              </VField>
              <ErrorMessage name="addRole">
                <p class="error">請選擇角色權限</p>
              </ErrorMessage>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary px-4" data-bs-dismiss="modal">取消</button>
              <button type="submit" class="btn btn-primary px-5">新增</button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" data-bs-backdrop="static" ref="deleteUserModelRef" id="deleteUserModel" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm tips">
      <div class="modal-content">
        <div class="modal-body">
          <p class="text-center my-3">是否確定刪除？</p>
          <div class="modal-footer d-flex justify-content-center">
            <button type="button" class="btn btn-outline-secondary px-4" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary px-4" v-on:click="deleteUser()">確定</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" data-bs-backdrop="static" ref="modifyUserModelRef" id="modifyUserModel" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">編輯使用者</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <VForm ref="addUser" @submit="modifyUserForm">
            <div class="mb-3">
              <VField class="form-control" v-model="modifyId" name="modifyId" type="hidden" disabled />
              <label class="form-label">姓名</label>
              <VField class="form-control" v-model="modifyName" name="name" type="text" disabled />
              <ErrorMessage name="name">
                <p>請填寫姓名</p>
              </ErrorMessage>
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <VField class="form-control" v-model="modifyEmail" name="email" type="text" disabled />
              <ErrorMessage name="email">
                <p>請填寫信箱</p>
              </ErrorMessage>
            </div>
            <div class="mb-3">
              <label class="form-label">修改密碼</label>
              <VField class="form-control" v-model="modifyPassword" name="modifyPassword" type="password"
                autocomplete="new-password"/>
              <ErrorMessage name="modifyPassword">
                <p class="error">請填寫密碼</p>
              </ErrorMessage>
            </div>
            <div class="mb-3">
              <label class="form-label">角色權限</label>
              <VField class="form-select" v-model="modifyRole" name="modifyRole" as="select" rules="required">
                <option v-for="(item, index) in roleList.data" :key="index" :value="item.roleId">{{ item.roleName }}
                </option>
              </VField>
              <ErrorMessage name="modifyRole">
                <p>請選擇角色權限</p>
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
</template>
<script>
import { onMounted, ref, reactive } from "vue";
import { Modal } from "bootstrap";
import { useLoading } from "vue-loading-overlay";
import permissionApiService from "@/api/permission/permissionApiService";
import Notify from "../utility/notify.js";
export default {
  name: "data-mangent",
  setup() {
    const addUserModelRef = ref(null);
    const modifyUserModelRef = ref(null);
    const deleteUserModelRef = ref(null);
    const modifyId = ref(null);
    const modifyName = ref(null);
    const modifyEmail = ref(null);
    const modifyPassword = ref(null);
    const modifyRole = ref(null);
    const formSearch = ref(null);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalConut = ref(0);
    const totalPage = ref(1);
    const userInfo = ref(null);
    const roleList = reactive({ data: null });
    const userData = reactive({ formData: null });
    const keyWord = ref(null);
    const loading = useLoading({
      // options
    });
    let deleteUserId;
    let addUserModel;
    let modifyUserModel;
    let deleteUserModel;
    userInfo.value = JSON.parse(sessionStorage.getItem('UserInfo'));
    onMounted(() => {
      addUserModel = new Modal(addUserModelRef.value);
      modifyUserModel = new Modal(modifyUserModelRef.value);
      deleteUserModel = new Modal(deleteUserModelRef.value);

      //使用方法
      search();
      getRole();
    });

    const searchForm = (value) => {
      keyWord.value = value;
      currentPage.value = 1;
      search(value);
    };
    const addUserForm = (value) => {
      addUser(value)
    };
    const modifyUserForm = (value) => {
      modifyUserInfo(value)
    };
    function getRole() {
      const loader = loading.show({
        color: "#F2994a",
      });
      permissionApiService
        .getRoleList()
        .then((response) => {
          if (response.status !== undefined && response.status === 200) {
            roleList.data = response.data.roleList;
            loader.hide();
          } else {
            loader.hide()
            Notify.error(response.message)
          }
        })
        .catch((e) => {
          loader.hide();
          Notify.error(e.message)
        });
    }
    const onClickHandler = (page) => {
      currentPage.value = page
      search()
    };
    //定義方法
    function search(data = "") {
      const loader = loading.show({
        color: "#F2994a",
      });
      permissionApiService
        .getPermissionList(data.keyWord, pageSize.value, currentPage.value)
        .then((response) => {
          keyWord.value = data.keyWord;
          if (response.status !== undefined && response.status === 200) {
            currentPage.value = response.data.currentPage;
            pageSize.value = response.data.pageSize;
            totalConut.value = response.data.totalItemCount;
            totalPage.value = response.data.totalPages;
            userData.formData = response.data.userList;
            loader.hide();
          } else {
            loader.hide()
            Notify.error(response.message)
          }
        })
        .catch((e) => {
          loader.hide();
          Notify.error(e.message)
        });
    }
    function addUser(data) {
      const loader = loading.show({
        color: "#F2994a",
      });
      permissionApiService
        .addUser({ "name": data.addName, "email": data.addEmail, "password": data.addPassword, "roleId": data.addRole })
        .then((response) => {
          if (response.status !== undefined && response.status === 200) {
            closeAddUserModal();
            search();
            loader.hide();
          } else {
            loader.hide()
            if (response.response !== undefined) {
              Notify.error(response.response.data.message)
            } else {
              Notify.error(response.message)
            }
          }
        })
        .catch((e) => {
          loader.hide();
          Notify.error(e.message)
        });
    }

    function modifyUserInfo(data) {
      const loader = loading.show({
        color: "#F2994a",
      });
      let params = { 
        "name": data.name, 
        "email": data.email,
        "roleId": data.modifyRole 
      };
      if (!data.modifyPassword === null){
        params.password = data.modifyPassword;
      }
      permissionApiService
        .modifyUserInfo(data.modifyId, params)
        .then((response) => {
          if (response.status !== undefined && response.status === 200) {
            closeModifyUserModal();
            search();
            loader.hide();
          } else {
            loader.hide()
            Notify.error(response.message)
          }
        })
        .catch((e) => {
          loader.hide();
          Notify.error(e.message)
        });

    }
    function deleteUser() {
      const loader = loading.show({
        color: "#F2994a",
      });
      permissionApiService
        .deleteUser({ "userId": deleteUserId })
        .then((response) => {
          if (response.status !== undefined && response.status === 200) {
            closeDeleteUserModal();
            search();
            loader.hide();
          } else {
            loader.hide()
            Notify.error(response.message)
          }

        })
        .catch((e) => {
          loader.hide();
          Notify.error(e.message)
        });
    }

    function openAddUserModal() {
      addUserModel.show();
    }
    function closeAddUserModal() {
      addUserModel.hide();
    }

    function openDeleteUserModal(item) {
      deleteUserId = item.userId;
      deleteUserModel.show();
    }
    function closeDeleteUserModal() {
      deleteUserModel.hide();
    }

    function openModifyUserModal(data) {
      modifyName.value = data.name;
      modifyEmail.value = data.email;
      modifyId.value = data.userId;
      roleList.data.forEach((item) => {
        if (item.roleName === data.role) {
          modifyRole.value = item.roleId
        }
      })
      modifyUserModel.show();
    }
    function closeModifyUserModal() {
      modifyUserModel.hide();
    }

    //傳送使用
    return {
      deleteUserId,
      formSearch,
      userData,
      roleList,
      loading,
      modifyId,
      modifyName,
      modifyEmail,
      modifyPassword,
      modifyRole,
      userInfo,
      currentPage,
      pageSize,
      totalConut,
      totalPage,
      keyWord,
      addUserModelRef,
      modifyUserModelRef,
      deleteUserModelRef,
      modifyUserModel,
      addUserModel,
      deleteUserModel,
      closeModifyUserModal,
      openModifyUserModal,
      closeAddUserModal,
      openAddUserModal,
      closeDeleteUserModal,
      openDeleteUserModal,
      searchForm,
      addUserForm,
      modifyUserForm,
      search,
      onClickHandler,
      getRole,
      addUser,
      modifyUserInfo,
      deleteUser,
    };
  },
};
</script>