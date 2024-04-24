<template>
  <LoginForm title="Login Disini"/>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'LoginView',
  components: {
    LoginForm
  },
  data:()=>{
    console.log(localStorage)
  }
}
</script>
