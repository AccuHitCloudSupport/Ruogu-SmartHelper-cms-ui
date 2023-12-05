<template>
  <div class="navbar-vertical navbar-expand">
    <ul class="py-4 px-3">
      <!-- 其他項目 -->
      <li class="nav-item"><router-link to="/permission" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/shield.svg"> 權限管理</router-link></li>
      <li class="nav-item"><router-link to="/dataMangent" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/gridicons.svg"> 資料處理</router-link></li>
    </ul>
    <div class="chat-container">
      <button @click="toggleDialogSize" class="toggle-dialog-button">
        <img v-if="chatExpanded" class="me-1 node-icon" src="../../assets/img/chatbot.png" style="width: 35px; height: 35px; filter: invert(100%);">
      </button>
      <div class="chat-header">
        <!-- WebChat 字樣 -->
        <img class="me-1 node-icon" v-if="chatExpanded" src="../../assets/img/chatbot.png" style="width: 35px; height: 35px; filter: invert(100%);">
        <!-- 展開/收起 按鈕 -->
        <button @click="toggleDialogSize" class="me-1 node-icon toggle-dialog-button">
          <img v-if="chatExpanded" class="me-1 node-icon" src="../../assets/img/down.png" style="width: 15px; height: 15px; filter: invert(100%);">
          <img v-else class="me-1 node-icon" src="../../assets/img/up.png" style="width: 15px; height: 15px; filter: invert(100%);">
        </button>
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
