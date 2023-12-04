<template>
  <div class="navbar-vertical navbar-expand">
    <ul class="py-4 px-3">
      <!-- 其他項目 -->
      <li class="nav-item"><router-link to="/permission" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/shield.svg"> 權限管理</router-link></li>
      <li class="nav-item"><router-link to="/dataMangent" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/gridicons.svg"> 資料處理</router-link></li>
    </ul>
    <div v-if="showChat" class="chat-container" :style="{ height: chatExpanded ? '45px' : 'auto' }">
      <div class="chat-header">
        <!-- WebChat 字樣 -->
        <img class="me-1 node-icon" src="../../assets/img/cha-bubbles-two-svgrepo-com.svg" style="width: 20px; height: 20px; filter: invert(100%);">
        <span style="color: white; font-size: 16px;">WebChat</span>
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
      chatExpanded: false
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
  right: 0;
  border: 1px solid #ccc;
  background-color: #fff;
  z-index: 999;
  padding: 0;
  border-radius: 10px;
}

/* 表頭樣式 */
.chat-header {
  background-color: #FF9224;
  opacity: 1;
  height: 45px;
  margin-bottom: 10px;
  border-radius: 10px 10px 0 0;
  border-bottom: 5px solid #FF8000 !important;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 將子元素分散對齊，將展開/收起按鈕放在最右邊 */
  padding: 0 10px;
}

/* 關閉按鈕的樣式 */
.close-chat {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 10px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  z-index: 1000; /* 將 z-index 設定為更高的值，確保在最上層 */
  color: white;
}

/* 開關按鈕 */
.toggle-dialog-button {
  position: absolute;
  top: 0;
  right: 25px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  z-index: 1000;
  color: white;
}
</style>
