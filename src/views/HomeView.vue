<template>
  <!-- <WelcomeMessage msg="Hello Wanhar Azri"/>  -->
  <div class="home" v-if="isLogin">
      <!-- <WelcomeMessage msg="Hello Wanhar Azri"/> -->
      <div v-if="isLevel!='4'">
      <shorcut-menu :level=isLevel />
      </div>
      <div v-else>
        <!-- <h1>Profile Mahasiswa</h1> -->
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
import axios from 'axios'
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
  mounted() {
    if(localStorage.getItem('isLevel')==null){
      this.getInfo()
    }
  },
  methods:{
    getInfo: async function() {
      let token = localStorage.getItem("token");
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
        this.isLevel = response.data.info.level
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
