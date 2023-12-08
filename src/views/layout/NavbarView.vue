<template>
  <div class="navbar-vertical navbar-expand">
    <ul class="py-4 px-3">
      <!-- 其他項目 -->
      <li class="nav-item"><router-link to="/permission" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/shield.svg"> 權限管理</router-link></li>
      <li class="nav-item"><router-link to="/dataMangent" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/gridicons.svg"> 資料處理</router-link></li>
    </ul>
    <div class="chat-container" :class="{ 'chat-container-expanded': chatExpanded }">
      <div class="chat-header">
        <!-- 移除close按鈕和圖片 -->
        <!-- 展開/收起 按鈕移到左邊 -->
        <button @click="toggleDialogSize" class="toggle-dialog-button">
          <img v-if="chatExpanded" class="me-1 node-icon" src="../../assets/img/down.png" style="width: 15px; height: 15px; filter: invert(100%);">
          <img v-else class="me-1 node-icon" src="../../assets/img/hello.png" style="width: 37px; height: 37px; filter: invert(100%);">
        </button>
      </div>
      <iframe :src="chatSrc" style='min-width: 400px; width: 100%; min-height: 500px;' class="orange-background"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarView',
  data() {
    return {
      chatExpanded: false // 修改這裡，預設為收起狀態
    };
  },
  computed: {
    chatSrc() {
      // 使用環境變數
      return `https://webchat.botframework.com/embed/testing-smarthelper-chatbot-bot?s=${process.env.VUE_APP_BOT_TOKEN}`;
    }
  },
  methods: {
    toggleDialogSize() {
      this.chatExpanded = !this.chatExpanded;
    }
  }
}
</script>

<style scoped>
/* 共用樣式 */
.nav-item {
  /* 共用的樣式設定，可以根據需要調整 */
}

.nav-link {
  /* 共用的樣式設定，可以根據需要調整 */
}

.node-icon {
  margin-right: 1em;
}

/* 聊天視窗的樣式 */
.chat-container {
  position: fixed;
  bottom: 0;
  right: 0; /* 控制在最右下角 */
  border: 1px solid #ccc;
  background-color: #fff;
  z-index: 999;
  padding: 0;
  border-radius: 10px; /* 添加圓角，與表頭相同 */
  overflow: hidden; /* 隱藏內容溢出部分 */
  transition: right 0.3s, bottom 0.3s; /* 添加過渡效果 */
}

/* 收縮時隱藏內容 */
.chat-container:not(.chat-container-expanded) {
  right: -100%; /* 隱藏在視窗右側 */
  bottom: -100%; /* 隱藏在視窗底部 */
  height: auto; /* 顯示內容 */
}

/* 表頭樣式 */
.chat-header {
  background-color: #0080FF; 
  opacity: 1; /* 透明度 100% */
  height: 50px; /* 調整表頭高度 */
  margin-bottom: 10px; /* 新增這行，給表頭留出一些空間 */
  border-radius: 10px 10px 0 0; /* 添加圓角，使整個表頭上方兩邊為圓角 */
  border-bottom: 5px solid #0080FF !important; /* 使用 !important 強制生效 */
  position: relative; /* 相對定位，以便絕對定位的按鈕參照 */
}

/* 關閉按鈕的樣式 */
.close-chat {
  /* 移除或留空 */
}

/* 開關按鈕 */
.toggle-dialog-button {
  position: absolute;
  top: 0;
  left: 0; /* 調整 left 屬性 */
  padding: 5px 10px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  z-index: 1000;
  color: white;
}
</style>
