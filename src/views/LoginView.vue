<template>
  <LoginForm title="Login Disini" level="admin"/>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'LoginView',
  components: {
    LoginForm
  },
}
</script>
