<template>
  <div class="notfound">
    <div class="notfound-404">
      <h1>Oops!</h1>
      <h2>404 - The Page can't be found</h2>
    </div>
    <router-link to="/" class="nav-link">回首頁</router-link>
  </div>
</template>
<script>
import { onMounted } from "vue"

export default {
  name: "add-tutorial",
  components: {
  },
  created() {
  },
  setup() {
    
    onMounted(() => {
      
    })

  }
};
</script>