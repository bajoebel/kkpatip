<template>
  <LoginForm title="Halaman Login Mahasiswa" level="mahasiswa"/>
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
