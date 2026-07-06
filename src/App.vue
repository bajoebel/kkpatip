<template>
  <div id="app" :class="{ 'no-footer-gap': !showChrome }">
    <div v-if="showSplash" class="splash-screen">
      <div class="splash-bg" :style="{ backgroundImage: `url(${loginBg})` }"></div>
      <div class="splash-overlay"></div>
      <div class="splash-card">
        <img src="img/logo-login.png" alt="Logo" class="splash-logo" />
        <h4 class="splash-title">Aplikasi KKP</h4>
        <div class="splash-loader"></div>
      </div>
    </div>

    <template v-else>
    <HeaderMenu v-if="showChrome" />
    <!-- <b-row> -->
    <!-- <b-container> -->
      <!-- <b-col
        ><b-icon
          icon="arrow-right-circle"
          font-scale="3"
          style="color: #000; padding-left: 10px"
          v-b-toggle.sidebar-1
          v-if="isLogin"
        ></b-icon
      ></b-col> -->
      <b-col :class="['konten', { 'konten-login': !showChrome }]">
        
        <router-view />
      </b-col>
    <!-- </b-container> -->

    <!-- </b-row> -->
    <footer-theme v-if="showChrome" />
    </template>
  </div>
</template>
<script>
import HeaderMenu from "@/components/HeaderMenu.vue";
import FooterTheme from "@/components/FooterTheme.vue";

export default {
  components: {
    HeaderMenu,
    FooterTheme,
  },
  data: () => {
    return {
      showSplash: true,
      loginBg: (process.env.BASE_URL || "/") + "img/bg.jpg",
    };
  },
  computed: {
    showChrome() {
      return !!localStorage.getItem("isLogin");
    },
  },
  mounted() {
    // document.title = "Aplikasi KKP Politeknik ATI Padang";
    console.clear()
    console.log(process.env.VUE_APP_BASE_URL)
    setTimeout(() => {
      this.showSplash = false;
    }, 1200);
    // alert(process.env.VUE_APP_BASE_URL)
  },
};
</script>
<style scoped>
#app {
  padding-bottom: 64px;
}

#app.no-footer-gap {
  padding-bottom: 0;
}

.konten-login {
  min-height: 100vh;
  padding-bottom: 0;
}

.splash-screen {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.splash-bg {
  position: absolute;
  inset: -12px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(4px);
  transform: scale(1.05);
}

.splash-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(239, 246, 255, 0.72) 0%, rgba(224, 242, 254, 0.7) 45%, rgba(224, 231, 255, 0.7) 100%);
}

.splash-card {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 30px 28px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #dbeafe;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.16);
}

.splash-logo {
  width: 120px;
  max-width: 40vw;
}

.splash-title {
  margin-top: 10px;
  margin-bottom: 14px;
  color: #1e3a8a;
  font-weight: 700;
}

.splash-loader {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 3px solid #bfdbfe;
  border-top-color: #2563eb;
  margin: 0 auto;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.navbar-brand {
  font-size: 20pt;
}
.bg-primary {
  background-color: #ccc;
}
.list-group {
  border-radius: 0px;
}
.form-group {
  padding: 10px 15px;
}
</style>
