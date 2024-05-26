<template>
  <!-- <WelcomeMessage msg="Hello Wanhar Azri"/>  -->
  <div class="home" v-if="isLogin">
      <!-- <WelcomeMessage msg="Hello Wanhar Azri"/> -->
      <div v-if="isLevel==='1'">
      <shorcut-menu/>
      </div>
      <div v-else>
        <ProfileMahasiswa />
      </div>
  </div>
  <div class="login" v-else>
      <LoginForm title="Login Disini " level="mahasiswa"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import WelcomeMessage from '@/components/WelcomeMessage.vue'
import LoginForm from '@/components/LoginForm.vue'
import ShorcutMenu from '@/components/ShorcutMenu.vue'
import ProfileMahasiswa from '@/components/ProfileMahasiswa.vue'
export default {
  name: 'HomeView',
  components: {
    LoginForm,
    ShorcutMenu,
    ProfileMahasiswa
  },
  data:() => {
    return {
      isLogin: localStorage.getItem('isLogin'),
      token: localStorage.getItem('token'),
      isLevel: localStorage.getItem('isLevel')
    }
  },
  
}
</script>
