<template>
  <div class="home" v-if="isLogin">
      <WelcomeMessage msg="Hello Wanhar Azri"/>
  </div>
  <div class="login" v-else>
      <LoginForm title="Login Disini"/>
  </div>
</template>

<script>
// @ is an alias to /src
import WelcomeMessage from '@/components/WelcomeMessage.vue'
import LoginForm from '@/components/LoginForm.vue'
export default {
  name: 'HomeView',
  components: {
    WelcomeMessage,
    LoginForm
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
  }
}
</script>
