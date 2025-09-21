<template>
  <div class="home">
      <h4>Verifikasi Token </h4>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TokenView',
  
  data:() => {
    return {
      isLogin: '',
      token: '',
      isLevel: '',
        level: ''
    }
  },
  mounted() {
    if(localStorage.getItem('isLevel')==null){
      this.getInfo()
    }
  },
  methods:{
    getInfo: async function() {
      let token = this.$route.params.id;
      await axios
      .request({
        headers: {
          Authorization: `Bearer ` + token,
        },
        method: "GET",
        url: `me`,
      })
      .then((response) => {
        console.log(response.data);
        this.level = (response.data.info.level==1?'Administrator':(response.data.info.level==2?'Admin Prodi':(response.data.info.level==3?"Mahasiswa":"Dosen")))
        localStorage.setItem('isLevel',response.data.info.level);
        localStorage.setItem('isLogin',true);
        localStorage.setItem('token',token);
        this.isLevel = response.data.info.level
        this.isLogin = true;
        this.token = this.$route.params.id
        // this.$router.push('/');
        window.location.href = "https://kkp.poltekatipdg.ac.id?token="+token;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
      return false;
    }
  }
}
</script>
