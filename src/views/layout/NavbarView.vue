<template>
  <div class="navbar-vertical navbar-expand">
    <ul class="py-4 px-3">
      <!-- 其他項目 -->
      <li class="nav-item"><router-link to="/permission" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/shield.svg"> 權限管理</router-link></li>
      <li class="nav-item"><router-link to="/dataMangent" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/gridicons.svg"> 資料處理</router-link></li>
    </ul>
    <div class="chat-container">
      <div class="chat-header">
        <!-- WebChat 字樣 -->
        <img class="me-1 node-icon" src="../../assets/img/chatbot.png" style="width: 35px; height: 35px; filter: invert(100%);">
        <!-- 展開/收起 按鈕容器 -->
        <div class="toggle-dialog-container">
          <!-- 展開/收起 按鈕 -->
          <button @click="toggleDialogSize" class="toggle-dialog-button" style="top: -60px;">
            <img class="me-1 node-icon" src="../../assets/img/chatbot.png" style="width: 35px; height: 35px; filter: invert(100%);">
          </button>
        </div>
      </div>
      <iframe v-if="chatExpanded" :src="chatSrc" style='min-width: 400px; width: 100%; min-height: 500px;' class="orange-background"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarView',
  data() {
    return {
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
  overflow: hidden; /* 隱藏多餘內容 */
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
.toggle-dialog-container {
  position: absolute;
  top: 0;
  right: 0px;
  display: flex;
  align-items: center;
}

.toggle-dialog-button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  z-index: 1000;
  color: white;
  position: relative; /* 添加相對定位 */
}
</style>
