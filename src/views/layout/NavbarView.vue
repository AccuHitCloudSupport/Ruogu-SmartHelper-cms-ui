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
      <div v-if="chatExpanded" class="chat-header">
        <button @click="toggleDialogSize" class="toggle-dialog-button">
          <img v-if="chatExpanded" class="me-1 node-icon" src="../../assets/img/down.png" style="width: 15px; height: 15px; filter: invert(100%);">
          <img v-else class="me-1 node-icon" src="../../assets/img/up.png" style="width: 15px; height: 15px; filter: invert(100%);">
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
      showChat: false,
      chatExpanded: true
    };
  },
  computed: {
    chatSrc() {
      // 使用環境變數
      return `https://webchat.botframework.com/embed/testing-smarthelper-chatbot-bot?s=${process.env.VUE_APP_BOT_TOKEN}`;
    }
  },
  methods: {
    toggleChat() {
      this.showChat = !this.showChat;
    },
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

/* 打開聊天按鈕的樣式 */
.chat-toggle-btn {
  cursor: pointer;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
}

.chat-toggle-btn-active {
  background-color: #FFDCB9; /* 變色效果，可根據需求修改 */
  color: #fff;
  border: none;
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
}

/* 表頭樣式 */
.chat-header {
  background-color: #FF9224; /* 橘色背景 */
  opacity: 1; /* 透明度 100% */
  height: 45px; /* 調整表頭高度 */
  margin-bottom: 10px; /* 新增這行，給表頭留出一些空間 */
  border-radius: 10px 10px 0 0; /* 添加圓角，使整個表頭上方兩邊為圓角 */
  border-bottom: 5px solid #FF8000 !important; /* 使用 !important 強制生效 */
  position: relative; /* 相對定位，以便絕對定位的按鈕參照 */
}

/* 關閉按鈕的樣式 */
.close-chat {
  display: none; /* 隱藏關閉按鈕 */
}

/* 開關按鈕 */
.toggle-dialog-button {
  position: absolute;
  top: 0;
  right: 0px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  z-index: 1000;
  color: white;
}

/* 調整展開/收起按鈕樣式 */
.toggle-dialog-button img {
  margin: 0; /* 移除圖片的 margin */
}
</style>
