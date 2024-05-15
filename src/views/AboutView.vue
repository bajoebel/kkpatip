<template>
  <div class="kotak" v-if="isLogin">
    <h1>Selamat Datang Di Aplikasi KKP Politeknik ATI Padang</h1>
  </div>
  <div v-else >
    <div class="kotak">
    <h3 class="text-center">
      Anda Belum Login <br>
      <b-link class="text-center" to="/">Silahkan Login Disini</b-link>
      </h3>
    
    </div>
  </div>
</template>
<script>
// import axios from 'axios';
export default {
  data: ()=>{
    return {
      isLogin: localStorage.getItem('isLogin'),
      aku: 'Aku',
      data: {
        
      }
    }
  },
  
  methods:{
    onCheck:()=>{
      return localStorage.getItem('isLogin');
    }
  }
}
</script>