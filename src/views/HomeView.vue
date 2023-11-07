<template>
  <HeaderView></HeaderView>
    <NavbarView></NavbarView>
  <div class="content">
    <router-view />
  </div>

</template>

<script>
import NavbarView from './layout/NavbarView.vue';
import HeaderView from './layout/HeaderView.vue';
export default {
  name: 'HomeView',
  components: {
    NavbarView,
    HeaderView
  },
  setup() {
  }
}
</script>
