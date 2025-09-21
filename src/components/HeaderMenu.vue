<template>
  <nav>
    <div>
      <b-navbar toggleable="lg" type="light" variant="default"
        style="border-bottom: solid 1px #ccc; border-collapse: collapse" class="header">
        <b-navbar-brand href="#" style="padding-left: 10px">

          <b-img :src="baseurl + 'img/logo.png'" fluid alt="Fluid image"></b-img>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav right>
            <b-link to="/" class="nav-link"><b-icon icon="house-fill"></b-icon> Home</b-link>
            <div v-for="item in menu" :key="item.roleid">

              <b-link :to="'/' + item.route" class="nav-link"><b-icon :icon="item.icon"></b-icon> {{ item.menunama
                }}</b-link>
            </div>
          </b-navbar-nav>

          <b-navbar-nav right>
            <a class="nav-link" @click="logout()" v-if="isLogin"><b-icon icon="power"
                aria-hidden="true"></b-icon>Logout</a>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <b-sidebar id="sidebar-1" title="Selamat Datang Di Aplikasi KKP" shadow style="text-align: center" v-if="isLogin">
      <div class="px-5 py-1">
        <b-img src="img/user.png" fluid thumbnail rounded="circle"></b-img>
      </div>
      <h3 style="text-align: center">{{ nama }}</h3>
      <p style="text-align: center">{{ level }}</p>
      <b-list-group style="max-width: 500px">
        <b-list-group-item class="d-flex align-items-center" active>
          <b-avatar class="mr-3" variant="primary"></b-avatar>
          <span class="mr-auto">
            <!-- <b-link to="/about">Mahasiswa</b-link> -->
            <router-link to="mahasiswa">Mahasiswa</router-link>
          </span>
          <b-badge>5</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar variant="primary" text="BV" class="mr-3"></b-avatar>
          <span class="mr-auto">BootstrapVue</span>
          <b-badge>12</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar variant="info" src="https://placekitten.com/300/300" class="mr-3"></b-avatar>
          <span class="mr-auto">Super Kitty</span>
          <b-badge>9</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar variant="success" icon="people-fill" class="mr-3"></b-avatar>
          <span class="mr-auto">ACME group</span>
          <b-badge>7</b-badge>
        </b-list-group-item>
      </b-list-group>
    </b-sidebar>
  </nav>
</template>
<script>
import axios from "axios";
export default {
  name: "HeaderMenu",
  data: () => {
    return {
      isLogin: localStorage.getItem("isLogin"),
      nama: "",
      level: "",
      menu: '',
      baseurl: 'https://kkp.poltekatipdg.ac.id/'
      // baseurl:process.env.VUE_BASE_URL
    };
  },
  mounted() {
    this.isLogin = localStorage.getItem("isLogin");
    // alert(this.baseurl);
    this.getInfo()
    // alert(token)
    // alert(this.nama)
  },
  methods: {
    logout() {
      // let self = this;
      localStorage.clear();
      this.$router.push("/");
      location.reload();
    },
    getInfo: async function () {
      let token = localStorage.getItem("token");
      console.clear();
      console.log('Token ' + token)
      if (token != null) {
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
            this.nama = response.data.info.nama
            this.menu = response.data.info.menu;
            console.clear();
            console.log(this.menu)
            this.level = (response.data.info.level == 1 ? 'Administrator' : (response.data.info.level == 2 ? 'Admin Prodi' : (response.data.info.level == 3 ? "Mahasiswa" : "Dosen")))
            localStorage.setItem('isLevel', response.data.info.level)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
      }

      return false;
    },
  },
};
</script>
<style scoped lang="scss">
.navbar {
  padding: 0px;
}

ul .nav-link {
  padding: 15px 30px;
  font-size: 14pt;
}

ul .nav-link:hover {
  color: #ccc;
  border-bottom: 5px solid #0d6efd;
}

.router-link-exact-active {
  color: #ccc;
  border-bottom: 5px solid #0d6efd;
}

ul .nav-item {
  padding: 20px;
  font-size: 14pt;
}

.dropdown-menu li {
  font-size: 14pt;
}

.navbrand {
  padding-top: 0px;
  padding-bottom: 0px;
}

// .navbar-collapse .navbar-nav .nav-link{
//   padding: 10px;
// }
// .navbar-collapse .navbar-nav .router-link-exact-active{
//   background-color: #0d6efd;
//   color: #ccc;
// }</style>
