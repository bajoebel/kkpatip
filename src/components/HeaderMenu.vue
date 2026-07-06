<template>
  <nav class="top-nav-wrap">
    <div>
      <b-navbar toggleable="lg" type="light" variant="default" class="header modern-navbar">
        <b-navbar-brand href="#" class="brand-wrap">

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

          <b-navbar-nav class="ml-auto logout-nav">
            <a class="nav-link logout-link" @click="logout()" v-if="isLogin"><b-icon icon="power"
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
  padding: 0;
}

.top-nav-wrap {
  position: sticky;
  top: 0;
  z-index: 1040;
}

.modern-navbar {
  border-bottom: 1px solid rgba(148, 163, 184, 0.28);
  background: rgba(147, 197, 253, 0.98);
  backdrop-filter: blur(6px);
  box-shadow: 0 10px 24px rgba(30, 64, 175, 0.24);
  position: relative;
}

.brand-wrap {
  padding-left: 12px;
}

.brand-wrap img {
  max-height: 44px;
  width: auto;
  filter: drop-shadow(0 2px 6px rgba(30, 64, 175, 0.18));
}

ul .nav-link {
  margin: 6px 6px;
  padding: 10px 16px;
  font-size: 11pt;
  font-weight: 500;
  color: #1f2937 !important;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(255, 255, 255, 0.55);
  transition: all 0.25s ease;
}

ul .nav-link:hover {
  color: #0f172a !important;
  border: 1px solid rgba(125, 211, 252, 0.5);
  background: linear-gradient(90deg, rgba(186, 230, 253, 0.6) 0%, rgba(199, 210, 254, 0.55) 100%);
  box-shadow: 0 8px 16px rgba(56, 189, 248, 0.18);
}

.router-link-exact-active {
  color: #ffffff !important;
  border: 1px solid rgba(37, 99, 235, 0.75);
  background: linear-gradient(90deg, rgba(37, 99, 235, 0.96) 0%, rgba(59, 130, 246, 0.92) 100%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14), 0 10px 20px rgba(37, 99, 235, 0.28);
}

ul .nav-item {
  padding: 20px;
  font-size: 14pt;
}

.dropdown-menu li {
  font-size: 14pt;
}

.logout-link {
  color: #b91c1c !important;
}

.logout-link:hover {
  color: #991b1b !important;
  background: linear-gradient(90deg, rgba(254, 202, 202, 0.6) 0%, rgba(254, 205, 211, 0.55) 100%);
}

.logout-nav {
  margin-left: auto;
}

@media (max-width: 991.98px) {
  .modern-navbar :deep(.navbar-collapse) {
    position: absolute;
    top: calc(100% + 6px);
    left: 10px;
    right: 10px;
    z-index: 2000;
    padding: 10px;
    border: 1px solid rgba(148, 163, 184, 0.35);
    border-radius: 14px;
    background: linear-gradient(120deg, rgba(248, 250, 252, 0.98) 0%, rgba(239, 246, 255, 0.97) 100%);
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.16);
  }

  .modern-navbar :deep(.navbar-nav) {
    flex-direction: column;
  }

  .modern-navbar :deep(.navbar-nav .nav-link) {
    display: block;
    width: 100%;
    font-size: 10pt;
    padding: 8px 12px;
  }

  .modern-navbar :deep(.navbar-brand img) {
    max-height: 34px;
  }
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
