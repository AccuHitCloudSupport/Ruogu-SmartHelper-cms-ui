<template>
  <div class="navbar-vertical navbar-expand">
    <ul class="py-4 px-3">
      <!-- 其他項目 -->
      <li class="nav-item"><router-link to="/permission" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/shield.svg"> 權限管理</router-link></li>
      <li class="nav-item"><router-link to="/dataMangent" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/gridicons.svg"> 資料處理</router-link></li>
      <!-- 打開聊天按鈕 -->
      <li class="nav-item">
        <button @click="toggleDialogSize" class="toggle-dialog-button">
          <img v-if="chatExpanded" class="me-1 node-icon" src="../../assets/img/up.png" style="width: 15px; height: 15px; filter: invert(100%);">
          <img v-else class="me-1 node-icon" src="../../assets/img/down.png" style="width: 15px; height: 15px; filter: invert(100%);">
        </button>
      </li>
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
        <!-- 移除關閉按鈕 -->
      </div>
      <iframe :src="chatSrc" style='min-width: 400px; width: 100%; min-height: 500px;' class="orange-background"></iframe>
    </div>
  </div>
</template>

<!-- 其他部分保持不變 -->

<style scoped>
/* ... */

/* 聊天視窗的樣式 */
/* ... */

/* 表頭樣式 */
.chat-header {
  display: flex;
  justify-content: space-between;
  background-color: #FF9224;
  opacity: 1;
  height: 45px;
  margin-bottom: 10px;
  border-radius: 10px 10px 0 0;
  border-bottom: 5px solid #FF8000 !important;
  position: relative;
  align-items: center;
}

/* 關閉按鈕的樣式 */
/* 移除相關樣式 */

/* 開關按鈕 */
.toggle-dialog-button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  z-index: 1000;
  color: white;
}
</style>
