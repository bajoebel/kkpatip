<template>
  <nav>
    <div>
      <b-col>
        <b-navbar
          toggleable="lg"
          type="light"
          variant="default"
          style="border-bottom: solid 1px #ccc; border-collapse: collapse"
        >
          <!-- <b-container> -->
          <b-navbar-brand href="#" style="padding-left: 10px">
            <b-img
              src="http://localhost:8081/img/logo.png"
              fluid
              alt="Fluid image"
              v-b-toggle.sidebar-1
              v-if="isLogin"
            ></b-img>
            <b-img src="img/logo.png" fluid alt="Fluid image" v-else></b-img>
          </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav right v-if="isLogin && level=='Administrator'">
              <b-link to="/" class="nav-link"><b-icon icon="house-fill"></b-icon> Home</b-link>
              <b-link to="/perusahaan" class="nav-link"><b-icon icon="bank"></b-icon> Perusahaan</b-link>
              <b-link to="/mahasiswa" class="nav-link"><b-icon icon="people-fill"></b-icon> Mahasiswa</b-link>
              <b-link to="/prodi" class="nav-link"><b-icon icon="intersect"></b-icon> Prodi</b-link>
              <b-link to="/jenis" class="nav-link"><b-icon icon="folder-check"></b-icon> Jenis</b-link>
              <b-link to="/jeniskuota" class="nav-link"><b-icon icon="union"></b-icon> Jenis Kuota</b-link>
              <b-link to="/dokumen" class="nav-link"><b-icon icon="folder-fill"></b-icon> Dokumen</b-link>
              <b-link to="/kuota" class="nav-link"><b-icon icon="alarm-fill"></b-icon> Kuota</b-link>
              <b-link to="/register" class="nav-link"><b-icon icon="card-list"></b-icon> Register</b-link>
              <!-- <b-link to="/about" class="nav-link">About</b-link> -->
              
            </b-navbar-nav>
            <b-navbar-nav right v-else-if="isLogin && level=='Admin Prodi'">
              <b-link to="/" class="nav-link"><b-icon icon="house-fill"></b-icon> Home</b-link>
              <b-link to="/mahasiswa" class="nav-link"><b-icon icon="people-fill"></b-icon> Mahasiswa</b-link>
              <b-link to="/dosen" class="nav-link"><b-icon icon="people"></b-icon> Dosen</b-link>
              
            </b-navbar-nav>
            <b-navbar-nav right v-else-if="isLogin && level=='Mahasiswa'">
              <b-link to="/" class="nav-link"><b-icon icon="house-fill"></b-icon> Home</b-link>
              <b-link to="/profile" class="nav-link"><b-icon icon="file-check"></b-icon> Laporan Magang</b-link>
              <!-- <b-link to="/about" class="nav-link">About</b-link> -->
              
            </b-navbar-nav>
            <b-navbar-nav right>
              <a class="nav-link" @click="logout()" v-if="isLogin"><b-icon icon="power" aria-hidden="true"></b-icon>Logout</a>
              </b-navbar-nav>
            <!-- <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown text="Lang" right>
                  <b-dropdown-item href="#">EN</b-dropdown-item>
                  <b-dropdown-item href="#">ES</b-dropdown-item>
                  <b-dropdown-item href="#">RU</b-dropdown-item>
                  <b-dropdown-item href="#">FA</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown text="User" right>
                  <b-dropdown-item href="#">Account</b-dropdown-item>
                  <b-dropdown-item href="#">Settings</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav> -->
          </b-collapse>
          <!-- </b-container> -->
        </b-navbar>
      </b-col>
    </div>
    <b-sidebar
      id="sidebar-1"
      title="Selamat Datang Di Aplikasi KKP"
      shadow
      style="text-align: center"
      v-if="isLogin"
    >
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
          <b-avatar
            variant="info"
            src="https://placekitten.com/300/300"
            class="mr-3"
          ></b-avatar>
          <span class="mr-auto">Super Kitty</span>
          <b-badge>9</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar
            variant="success"
            icon="people-fill"
            class="mr-3"
          ></b-avatar>
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
      nama: "Ujang",
      level: "Guest",
    };
  },
  mounted() {
    this.isLogin = localStorage.getItem("isLogin");
    // alert('getInfo');
    this.getInfo()
    // alert(token)
    // alert(this.nama)
  },
  methods: {
    logout() {
      let self = this;
      localStorage.clear();
      self.$router.go("/");
    },
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
        this.nama = response.data.info.nama
        this.level = (response.data.info.level==1?'Administrator':(response.data.info.level==2?'Admin Prodi':(response.data.info.level==3?"Mahasiswa":"Dosen")))
        localStorage.setItem('isLevel',response.data.info.level)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
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
// }
</style>
