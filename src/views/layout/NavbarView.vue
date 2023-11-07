<template>
    <div class="navbar-vertical navbar-expand">
        <ul class="py-4 px-3">
          <li class="nav-item"><router-link to="/permission" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/shield.svg"> 權限管理</router-link></li>
          <li class="nav-item"><router-link to="/dataMangent" class="nav-link" href="#"><img class="me-1 node-icon" src="../../assets/img/gridicons.svg"> 資料處理</router-link></li>
        </ul>
        
    </div>
</template>
<script>
export default {
  name: 'NavbarView',
  props: {
    msg: String
  }
}
</script>