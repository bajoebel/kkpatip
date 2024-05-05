<template>
  <!-- <WelcomeMessage msg="Hello Wanhar Azri"/>  -->
  <div class="home" v-if="isLogin">
      <!-- <WelcomeMessage msg="Hello Wanhar Azri"/> -->
      <shorcut-menu/>
  </div>
  <div class="login" v-else>
      <LoginForm title="Login Disini"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import WelcomeMessage from '@/components/WelcomeMessage.vue'
import LoginForm from '@/components/LoginForm.vue'
import ShorcutMenu from '@/components/ShorcutMenu.vue'
export default {
  name: 'HomeView',
  components: {
    LoginForm,
    ShorcutMenu
  },
  data:() => {
    return {
      form: {
        username: "",
        password: "",
      },
      isLogin: localStorage.getItem('isLogin'),
      isLevel:0
    }
  },
  
}
</script>
