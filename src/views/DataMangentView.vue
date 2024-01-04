<template>
  <h1 class="tit mb-4">資料處理</h1>

  <div class="card p-4">
    <VForm ref="formSearch" @submit="searchForm">
      <div class="row mb-2">
        <div class="col-3">
          <label class="form-label">上傳時間起</label>
          <VueDatePicker v-model="startDate" :enable-time-picker="false" vertical></VueDatePicker>
        </div>
        <div class="col-3">
          <label class="form-label">上傳時間迄</label>
          <VueDatePicker v-model="endDate" :enable-time-picker="false" vertical></VueDatePicker>
        </div>
        <div class="col-3">
          <label class="form-label">上傳人員</label>
          <VField class="form-control" name="updatePeople" type="text" />
          <ErrorMessage name="updatePeople" />
        </div>
        <div class="col-3">
          <label class="form-label">檔案名稱</label>
          <VField class="form-control" name="fileName" type="text" />
          <ErrorMessage name="fileName" />
        </div>
      </div>

      <div class="row d-flex align-items-end">
        <div class="col-3">
          <label class="form-label">狀態</label>
          <VField class="form-select" name="status" as="select">
            <option value="">請選擇狀態</option>
            <option v-for="(item, index) in statusData.data" :key="index" :value="item">{{ item }}
            </option>
          </VField>
        </div>
        <div class="col-3">
          <label class="form-label">檔案類型</label>
          <VField class="form-select" name="source" as="select">
            <option value="">請選擇檔案類型</option>
            <option v-for="(item, index) in sourceData.data" :key="index" :value="item">{{ item }}
            </option>
          </VField>
        </div>
        <div class="col">
          <button class="btn btn-primary px-5" type="submit">搜尋</button>
        </div>

      </div>
    </VForm>
  </div>


  <div class="card mt-3 p-4">
    <div class="d-flex justify-content-between mb-2">
      <div>
        <button class="btn btn-primary me-2 tool-tip" v-if="userInfo.permissions.includes('manage_users')"
          v-on:click="openReviewModal()" type="button" data-tooltip-title="審核" data-tooltip-position="bottom">
          <img src="../../src/assets/img/design_file.svg">
        </button>
        <button class="btn btn-red tool-tip" v-on:click="openDeleteUserModal()" type="button" data-tooltip-title="刪除"
          data-tooltip-position="bottom"><img src="../../src/assets/img/delete.svg"></button>
      </div>
      <div>
        <button class="btn btn-blue me-2 px-3" type="button" v-on:click="getExample()"><img class="me-1"
            src="../../src/assets/img/data-library.svg"> 範例下載</button>
        <button class="btn btn-blue px-3" v-on:click="openUpFileModel()" type="button"><img class="me-1"
            src="../../src/assets/img/upload-logs.svg"> 上傳檔案</button>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th width="8%">#</th>
          <th width="8%" class="text-center"><button class="btn btn-blue2" v-on:click="allSelect()">全選</button></th>
          <th>檔名</th>
          <th width="16%" class="date" v-on:click="changeDataSort()">上傳時間<span class="sort" :class="sortStatus"></span>
          </th> <!--desc向下/asc向上-->
          <th width="16%">上傳人員</th>
          <th width="12%">檔案類型</th>
          <th width="10%">狀態</th>
        </tr>
      </thead>

      <tbody>
        <template v-for="(item, index) in items.formData" :key="index">
          <tr>
            <td>{{ ((currentPage - 1) * pageSize) + index + 1 }}</td>
            <td class="text-center"><input
                v-if="((userInfo.name === item.userName && !userInfo.permissions.includes('manage_users')) || userInfo.permissions.includes('manage_users'))"
                class="form-check-input" type="checkbox" v-on:click="selectData(item)" :checked="item.check" /></td>
            <td><a :href=item.url><img class="me-1" src="../../src/assets/img/download-alt.svg"> {{ item.docName }}</a>
            </td>
            <td>{{ item.timestamp }}</td>
            <td>{{ item.userName }}</td>
            <td>{{ item.source }}</td>
            <template v-if="item.status === '不通過'">
              <td>
                <p class="nopass">{{ item.status }}</p>
              </td>
            </template>
            <template v-if="item.status === '待審核'">
              <td>
                <p class="disposal">{{ item.status }}</p>
              </td>
            </template>
            <template v-if="item.status === '處理中'">
              <td>
                <p class="pinying">{{ item.status }}</p>
              </td>
            </template>
            <template v-if="item.status === '通過'">
              <td>
                <p class="pass">{{ item.status }}</p>
              </td>
            </template>
            <template v-if="item.status === '資料異常'">
              <td>
                <p class="unusual">{{ item.status }}</p>
              </td>
            </template>
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
  <div class="modal fade" data-bs-backdrop="static" ref="upFileModelRef" id="upFileModel" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">資料上傳</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="state.files.length > 0" class="files">
            <div class="file-item" v-for="(file, index) in state.files" :key="index">
              <span>{{ file.name }}</span>
              <span class="delete-file" @click="handleClickDeleteFile(index)"><img
                  src="../../src/assets/img/red_delete.svg"></span>
            </div>
          </div>
          <div v-else class="dropzone" v-bind="getRootProps()">
            <div class="border" :class="{
              isDragActive,
            }">
              <input v-bind="getInputProps()" accept=".pdf,.doc,.dot,.docx,.txt" />
              <p class="text-center"><img src="../../src/assets/img/upload.svg"><br>將檔案拖曳至此或點擊區塊上傳</p>
            </div>
          </div>
          <div class="my-3">
            <p class="mb-2">注意事項</p>
            <p>1.上傳檔案格式請用PDF、DOC、ODT、DOCX、TXT。</p>
            <p>2.單次上傳數量上限為20筆。</p>
            <p>3.單次上傳檔案大小上限為50MB</p>
          </div>


          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary px-4" v-on:click="closeUpFileModel()">
              取消
            </button>
            <button type="button" class="btn btn-primary px-5" v-on:click="upFile()">上傳</button>
          </div>
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
            <button type="button" class="btn btn-primary px-4" v-on:click="deleteFile()">確定</button>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" data-bs-backdrop="static" ref="reviewModelRef" id="reviewModel" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered tips">
      <div class="modal-content">
        <div class="modal-body">
          <div class="d-flex justify-content-end">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <p class="text-center my-3">是否確認檔案通過審核?</p>
          <div class="modal-footer d-flex justify-content-center">
            <button type="button" class="btn btn-secondary px-4" v-on:click="approveFile('unapproved')">不通過</button>
            <button type="button" class="btn btn-primary px-4" v-on:click="approveFile('approved')">確認通過</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" data-bs-backdrop="static" ref="messageModelRef" id="messageModel" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>
        </div>
        <div class="modal-body">
          {{ modalMessage }}
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary px-4" data-bs-dismiss="modal">
              確定
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive, watch } from "vue";
import { Modal } from "bootstrap";
import { useLoading } from "vue-loading-overlay";
import Notify from "../utility/notify.js";
import dataManagentApiService from "@/api/dataMangent/dataManagentApiService";
import { useDropzone } from 'vue3-dropzone';
export default {
  name: "data-mangent",
  setup() {
    const startDate = ref(null);
    const endDate = ref(null);
    const upFileModelRef = ref(null);
    const deleteUserModelRef = ref(null);
    const reviewModelRef = ref(null);
    const messageModelRef = ref(null);
    const formSearch = ref(null);
    const items = reactive({ formData: null });
    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalConut = ref(0);
    const totalPage = ref(1);
    const sortStatus = ref(null);
    const modalTitle = ref(null);
    const modalMessage = ref(null);
    const statusData = reactive({ data: null });
    const sourceData = reactive({ data: null });
    const userInfo = ref(null);
    const loading = useLoading({
      // options
    });
    let upFileModel;
    let deleteUserModel;
    let reviewModel;
    let messageModel;
    let nowSearchRequset;
    userInfo.value = JSON.parse(sessionStorage.getItem('UserInfo'));
    onMounted(() => {
      upFileModel = new Modal(upFileModelRef.value);
      deleteUserModel = new Modal(deleteUserModelRef.value);
      reviewModel = new Modal(reviewModelRef.value);
      messageModel = new Modal(messageModelRef.value);
      //使用方法
      search();
      getDropList('status');
      getDropList('source');
    });

    const state = reactive({
      files: [],
    });

    // const { getRootProps, getInputProps, isDragActive, ...rest } = useDropzone({
    //   onDrop,
    // });
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    watch(state, () => {
      // console.log('state', state);
    });

    watch(isDragActive, () => {
      // console.log('isDragActive', isDragActive.value, rest);
    });

    function onDrop(acceptFiles) {
      let nowSize = 0;
      let fileName = "";
      if (acceptFiles.length <= 20) {
        acceptFiles.forEach((element, index) => {
          if (element.type === 'application/pdf' || element.type === 'application/msword' || element.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || element.type === 'application/vnd.oasis.opendocument.text') {
            nowSize = element.size + nowSize;
            state.files.push(element)
            if (index + 1 === acceptFiles.length) {
              if (nowSize > 52428800) {
                modalTitle.value = '格式錯誤';
                modalMessage.value = '檔案過大';
                openMessageModel();
                state.files = []
              }
            }
          } else {
            if (fileName === "") {
              fileName = element.name;
            } else {
              fileName += " , " + element.name;
            }
          }

        });
        if (fileName !== "") {
          modalTitle.value = '格式錯誤';
          modalMessage.value = `${fileName}`;
          openMessageModel();
        }
      } else {
        modalTitle.value = '格式錯誤';
        modalMessage.value = '選擇檔案數量超過上限請重新選擇';
        openMessageModel();
      }
    }

    function handleClickDeleteFile(index) {
      state.files.splice(index, 1);
    }
    function upFile() {
      const loader = loading.show({
        color: "#F2994a",
      });
      let formData = new FormData();
      state.files.forEach((data) => {
        formData.append("docContent", data);
      })
      formData.append("userName", JSON.parse(sessionStorage.getItem("UserInfo")).name);
      dataManagentApiService.uploadDocuments(formData)
        .then((response) => {
          if (response.status !== undefined && response.status === 200) {
            loader.hide();

            closeUpFileModel();
            search()
          }
          else {
            loader.hide();
            Notify.error(response.message)
          }
        })
        .catch((e) => {
          loader.hide();
          Notify.error(e.message)
        });

    }

    const searchForm = (value) => {
      let startTime = (startDate.value === null || startDate.value === undefined) ? null : new Date(startDate.value).getFullYear() + '-' + (new Date(startDate.value).getMonth() + 1) + '-' + (new Date(startDate.value).getDate() < 10 ? '0' + new Date(startDate.value).getDate() : new Date(startDate.value).getDate());
      let endTime = (endDate.value === null || endDate.value === undefined) ? null : new Date(endDate.value).getFullYear() + '-' + (new Date(endDate.value).getMonth() + 1) + '-' + (new Date(endDate.value).getDate() < 10 ? '0' + new Date(endDate.value).getDate() : new Date(endDate.value).getDate());
      let request = { docName: value.fileName, status: value.status, source: value.source, userName: value.updatePeople, startDate: startTime, endDate: endTime, pageSize: pageSize.value, currentPage: 1, sortAsc: sortStatus.value === null || sortStatus.value === 'asc' ? false : true }
      search(request);
    };
    const onClickHandler = (page) => {
      if (nowSearchRequset === '') {
        let startTime = (startDate.value === null || startDate.value === undefined) ? null : new Date(startDate.value).getFullYear() + '-' + (new Date(startDate.value).getMonth() + 1) + '-' + (new Date(startDate.value).getDate() < 10 ? '0' + new Date(startDate.value).getDate() : new Date(startDate.value).getDate());
        let endTime = (endDate.value === null || endDate.value === undefined) ? null : new Date(endDate.value).getFullYear() + '-' + (new Date(endDate.value).getMonth() + 1) + '-' + (new Date(endDate.value).getDate() < 10 ? '0' + new Date(endDate.value).getDate() : new Date(endDate.value).getDate());
        let request = { docName: '', status: '', source: '', userName: '', startDate: startTime, endDate: endTime, pageSize: pageSize.value, currentPage: currentPage.value, sortAsc: sortStatus.value === null || sortStatus.value === 'asc' ? false : true }
        search(request)

      } else {
        nowSearchRequset.currentPage = page
        search(nowSearchRequset)

      }
    };
    //定義方法
    function search(data = "") {
      const loader = loading.show({
        color: "#F2994a",
      });

      dataManagentApiService
        .getdocuments(data)
        .then((response) => {
          if (response.status !== undefined && response.status === 200) {
            nowSearchRequset = data;
            currentPage.value = response.data.currentPage;
            pageSize.value = response.data.pageSize;
            totalConut.value = response.data.totalItemCount;
            totalPage.value = response.data.totalPages;
            items.formData = response.data.docList;
            items.formData.forEach((data) => {
              data.check = false;
            })
            loader.hide();
          }
          else {
            loader.hide();
            Notify.error(response.message)
          }
        })
        .catch((e) => {
          loader.hide();
          Notify.error(e.message)
        });

    }

    function getDropList(data) {
      const loader = loading.show({
        color: "#F2994a",
      });
      dataManagentApiService.getDocumentStatus(data)
        .then((response) => {
          if (response.status !== undefined && response.status === 200) {
            if (data === 'status') {
              statusData.data = response.data.values
            } else if (data === 'source') {
              sourceData.data = response.data.values
            }
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

    function getExample() {
      const loader = loading.show({
        color: "#F2994a",
      });
      dataManagentApiService.getExample("demo_uploading")
        .then((response) => {
          if (response.status !== undefined && response.status === 200) {
            window.open(response.data.url);
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
    function changeDataSort() {
      if (sortStatus.value === 'desc') {
        sortStatus.value = 'asc';
        if (nowSearchRequset === '') {
          let startTime = (startDate.value === null || startDate.value === undefined) ? null : new Date(startDate.value).getFullYear() + '-' + (new Date(startDate.value).getMonth() + 1) + '-' + (new Date(startDate.value).getDate() < 10 ? '0' + new Date(startDate.value).getDate() : new Date(startDate.value).getDate());
          let endTime = (endDate.value === null || endDate.value === undefined) ? null : new Date(endDate.value).getFullYear() + '-' + (new Date(endDate.value).getMonth() + 1) + '-' + (new Date(endDate.value).getDate() < 10 ? '0' + new Date(endDate.value).getDate() : new Date(endDate.value).getDate());
          let request = { docName: '', status: '', source: '', userName: '', startDate: startTime, endDate: endTime, pageSize: pageSize.value, currentPage: currentPage.value, sortAsc: sortStatus.value === null || sortStatus.value === 'asc' ? false : true }
          search(request)

        } else {
          nowSearchRequset.sortAsc = false;
          search(nowSearchRequset);
        }
      } else if (sortStatus.value === null || sortStatus.value === 'asc') {
        sortStatus.value = 'desc';
        if (nowSearchRequset === '') {
          let startTime = (startDate.value === null || startDate.value === undefined) ? null : new Date(startDate.value).getFullYear() + '-' + (new Date(startDate.value).getMonth() + 1) + '-' + (new Date(startDate.value).getDate() < 10 ? '0' + new Date(startDate.value).getDate() : new Date(startDate.value).getDate());
          let endTime = (endDate.value === null || endDate.value === undefined) ? null : new Date(endDate.value).getFullYear() + '-' + (new Date(endDate.value).getMonth() + 1) + '-' + (new Date(endDate.value).getDate() < 10 ? '0' + new Date(endDate.value).getDate() : new Date(endDate.value).getDate());
          let request = { docName: '', status: '', source: '', userName: '', startDate: startTime, endDate: endTime, pageSize: pageSize.value, currentPage: currentPage.value, sortAsc: sortStatus.value === null ? false : true }
          search(request)

        } else {

          nowSearchRequset.sortAsc = true;
          search(nowSearchRequset);
        }
      }
    }

    function allSelect() {
      
      if (JSON.parse(sessionStorage.getItem('UserInfo')).permissions.includes('manage_users')) {
        items.formData.forEach((data) => {
          data.check = true;
        })
      } else {
        items.formData.forEach((data) => {
          if (userInfo.value.name === data.userName) {
            data.check = true;
          }
        })
      }

    }
    function allNotSelect() {
      items.formData.forEach((data) => {
        data.check = false;
      })
    }
    function deleteFile() {
      const loader = loading.show({
        color: "#F2994a",
      });
      let file = [];
      items.formData.forEach((data) => {
        if (data.check) {
          file.push(data.docId)
        }
      })
      dataManagentApiService.deleteDocuments({ "docIds": file })
        .then((response) => {
          if (response.status !== undefined && response.status === 200) {
            search();
            closeDeleteUserModal()
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
    function approveFile(status) {
      const loader = loading.show({
        color: "#F2994a",
      });
      let file = [];
      items.formData.forEach((data) => {
        if (data.check) {
          file.push(data.docId)
        }
      })
      dataManagentApiService.approveDocuments({ "docIds": file, "approvalStatus": status })
        .then((response) => {
          if (response.status !== undefined && response.status === 200) {
            search();
            closeReviewModal()
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

    function selectData(item) {
      if (item.check) {
        item.check = false;
      } else {
        item.check = true
      }
    }

    function openUpFileModel() {
      upFileModel.show();
    }
    function closeUpFileModel() {
      upFileModel.hide();
      state.files = []
    }

    function openDeleteUserModal() {
      let openStatus = false;
      items.formData.forEach((data) => {
        if (data.check) {
          openStatus = true;
        }
      })
      if (openStatus) {
        deleteUserModel.show();
      } else {
        Notify.error('尚未選擇任何檔案')

      }
    }
    function closeDeleteUserModal() {
      deleteUserModel.hide();
    }

    function openReviewModal() {
      let openStatus = false;
      items.formData.forEach((data) => {
        if (data.check) {
          openStatus = true;
        }
      })
      if (openStatus) {
        reviewModel.show();
      } else {
        Notify.error('尚未選擇任何檔案')
      }
    }
    function closeReviewModal() {
      reviewModel.hide();
    }

    function openMessageModel() {
      messageModel.show();
    }
    function closeMessageModel() {
      messageModel.hide();
    }
    //傳送使用
    return {
      modalTitle,
      modalMessage,
      formSearch,
      items,
      loading,
      upFileModelRef,
      deleteUserModelRef,
      reviewModelRef,
      messageModelRef,
      upFileModel,
      deleteUserModel,
      reviewModel,
      messageModel,
      nowSearchRequset,
      currentPage,
      pageSize,
      totalConut,
      totalPage,
      startDate,
      endDate,
      isDragActive,
      state,
      userInfo,
      sortStatus,
      statusData,
      sourceData,
      closeUpFileModel,
      openUpFileModel,
      closeDeleteUserModal,
      openReviewModal,
      closeReviewModal,
      openDeleteUserModal,
      openMessageModel,
      closeMessageModel,
      onClickHandler,
      searchForm,
      search,
      handleClickDeleteFile,
      getRootProps,
      getInputProps,
      allSelect,
      allNotSelect,
      selectData,
      changeDataSort,
      getDropList,
      getExample,
      upFile,
      deleteFile,
      approveFile
    };
  },
};
</script>
