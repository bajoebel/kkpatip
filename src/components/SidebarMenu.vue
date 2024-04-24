<template>
  <div>
    <b-sidebar
      id="sidebar-1"
      title="Selamat Datang DI Aplikasi KKP"
      right
      shadow
      style="text-align: center"
      v-if="isLogin"
      
    >
      <div class="px-5 py-1">
        <b-img src="img/user.png" fluid thumbnail rounded="circle"></b-img>
      </div>
      <h3 style="text-align: center">Wanhar Azri S.Kom</h3>
      <p style="text-align: center">Administrator</p>
      <b-list-group style="max-width: 500px">
        <b-list-group-item class="d-flex align-items-center" active>
          <b-avatar class="mr-3" variant="primary"></b-avatar>
          <span class="mr-auto">Mahasiswa</span>
          <b-badge>5</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar variant="primary" text="BV" class="mr-3"></b-avatar>
          <span class="mr-auto">BootstrapVue</span>
          <b-badge>12</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar
            variant="info"
            src="https://placekitten.com/300/300"
            class="mr-3"
          ></b-avatar>
          <span class="mr-auto">Super Kitty</span>
          <b-badge>9</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar
            variant="success"
            icon="people-fill"
            class="mr-3"
          ></b-avatar>
          <span class="mr-auto">ACME group</span>
          <b-badge>7</b-badge>
        </b-list-group-item>
      </b-list-group>
    </b-sidebar>
  </div>
</template>
<script>
// import SidebarMenu from '@/components/SidebarMenu.vue'
export default {
    name:"SidebarMenu",
    data:() => {
    return {
      isLogin: localStorage.getItem('isLogin'),
      isLevel:0
    }
  }
}
</script>
