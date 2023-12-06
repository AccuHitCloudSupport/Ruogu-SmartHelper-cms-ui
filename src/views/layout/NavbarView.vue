<template>
  <div class="navbar-vertical navbar-expand">
    <ul class="py-4 px-3">
      <!-- 其他項目 -->
      <li class="nav-item"><router-link to="/permission" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/shield.svg"> 權限管理</router-link></li>
      <li class="nav-item"><router-link to="/dataMangent" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/gridicons.svg"> 資料處理</router-link></li>
      <!-- 打開聊天按鈕 -->
      <li class="nav-item">
        <button @click="toggleChat" :class="{ 'chat-toggle-btn-active': showChat }" class="nav-link">
          <img class="me-1 node-icon" src="../../assets/img/cha-bubbles-two-svgrepo-com.svg" style="width: 15px; height: 15px;">
          對話測試
        </button>
      </li>
    </ul>
    <div v-if="showChat" class="chat-container" :style="{ height: chatExpanded ? 'auto' : '45px' }">
      <div class="chat-header">
        <!-- 展開/收起 按鈕 -->
        <button @click="toggleDialogSize" class="toggle-dialog-button">
          <img v-if="chatExpanded" class="me-1 node-icon" src="../../assets/img/up.png" style="width: 15px; height: 15px; filter: invert(100%);">
          <img v-else class="me-1 node-icon" src="../../assets/img/down.png" style="width: 15px; height: 15px; filter: invert(100%);">
        </button>
        <!-- 移除關閉按鈕 -->
      </div>
      <iframe :src="chatSrc" style='min-width: 400px; width: 100%; min-height: 500px;' class="orange-background"></iframe>
    </div>
  </div>
</template>

<!-- 其他部分保持不變 -->

<style scoped>
/* 共用樣式 */
/* ... */

/* 聊天視窗的樣式 */
/* ... */

/* 表頭樣式 */
.chat-header {
  display: flex; /* 新增這行，讓展開/收起按鈕靠左對齊 */
  background-color: #FF9224; /* 橘色背景 */
  opacity: 1; /* 透明度 100% */
  height: 45px; /* 調整表頭高度 */
  margin-bottom: 10px; /* 新增這行，給表頭留出一些空間 */
  border-radius: 10px 10px 0 0; /* 添加圓角，使整個表頭上方兩邊為圓角 */
  border-bottom: 5px solid #FF8000 !important; /* 使用 !important 強制生效 */
  position: relative; /* 相對定位，以便絕對定位的按鈕參照 */
  align-items: center; /* 新增這行，讓元素垂直居中 */
}

/* 關閉按鈕的樣式 */
/* 移除相關樣式 */

/* 開關按鈕 */
.toggle-dialog-button {
  /* 調整位置 */
  margin-right: auto;
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  z-index: 1000;
  color: white;
}
</style>
