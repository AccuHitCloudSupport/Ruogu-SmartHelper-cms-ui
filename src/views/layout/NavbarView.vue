<template>
  <div class="navbar-vertical navbar-expand">
    <ul class="py-4 px-3">
      <!-- 其他項目 -->
      <li class="nav-item"><router-link to="/permission" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/shield.svg"> 權限管理</router-link></li>
      <li class="nav-item"><router-link to="/dataMangent" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/gridicons.svg"> 資料處理</router-link></li>
    </ul>
    <div class="chat-container" :style="{ height: chatExpanded ? 'auto' : '45px' }">
      <div class="chat-header" @click="toggleDialogSize">
        <!-- WebChat 字樣 -->
        <img class="me-1 node-icon" :src="chatExpanded ? '../../assets/img/chatbot.png' : '../../assets/img/chatbot_closed.png'" style="width: 35px; height: 35px; filter: invert(100%);">
      </div>
      <iframe v-if="showChat" :src="chatSrc" style='min-width: 400px; width: 100%; min-height: 500px;' class="orange-background"></iframe>
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
    }
  }
}
</script>

<style scoped>
/* ... 其他樣式 ... */

.chat-container {
  position: fixed;
  bottom: 0;
  right: 0; /* 控制在最右下角 */
  border: 1px solid #ccc;
  background-color: #fff;
  z-index: 999;
  padding: 0;
  border-radius: 10px; /* 添加圓角，與表頭相同 */
  cursor: pointer;
}

.chat-header {
  background-color: #0080FF;
  opacity: 1;
  height: 60px;
  margin-bottom: 10px;
  border-radius: 10px 10px 0 0;
  border-bottom: 5px solid #0080FF !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
}

</style>
