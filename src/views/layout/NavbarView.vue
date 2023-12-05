<template>
  <div class="navbar-vertical navbar-expand">
    <!-- 開關按鈕 -->
    <button class="toggle-chat-button" @click="toggleChat">
      <img v-if="!showChat" class="me-1 node-icon" src="../../assets/img/chatbot.png" style="width: 35px; height: 35px; filter: invert(100%);">
      <img v-else class="me-1 node-icon" src="../../assets/img/close-icon.png" style="width: 25px; height: 25px; filter: invert(100%);">
    </button>
    <ul class="py-4 px-3">
      <!-- 其他項目 -->
      <li class="nav-item"><router-link to="/permission" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/shield.svg"> 權限管理</router-link></li>
      <li class="nav-item"><router-link to="/dataMangent" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/gridicons.svg"> 資料處理</router-link></li>
    </ul>
    <div v-if="showChat" class="chat-container" :style="{ height: chatExpanded ? 'auto' : '45px' }">
      <div class="chat-header">
        <!-- WebChat 字樣 -->
        <!-- 移除了原先的 chatbot.png -->
        <!-- 展開/收起 按鈕 -->
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
      showChat: true,
      chatExpanded: true
    };
  },
  computed: {
    chatSrc() {
      return `https://webchat.botframework.com/embed/testing-smarthelper-chatbot-bot?s=${process.env.VUE_APP_BOT_TOKEN}`;
    }
  },
  methods: {
    toggleDialogSize() {
      this.chatExpanded = !this.chatExpanded;
    },
    toggleChat() {
      this.showChat = !this.showChat;
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

/* 開關按鈕樣式 */
.toggle-chat-button {
  position: fixed;
  bottom: 10px;
  left: 10px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  padding: 0;
  z-index: 1001;
}

.toggle-chat-button img {
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
}

/* 表頭樣式 */
.chat-header {
  background-color: #0080FF;
  opacity: 1;
  height: 60px;
  margin-bottom: 10px;
  border-radius: 10px 10px 0 0;
  border-bottom: 5px solid #0080FF !important;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
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
</style>
