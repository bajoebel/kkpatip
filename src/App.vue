<template>
  <div id="app">
    <HeaderMenu />
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
      <b-col class="konten">
        
        <router-view />
      </b-col>
    <!-- </b-container> -->

    <!-- </b-row> -->
    <footer-theme />
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
      isLogin: localStorage.getItem("isLogin"),
    };
  },
  mounted() {
    // document.title = "Aplikasi KKP Politeknik ATI Padang";
    console.clear()
    console.log(process.env.VUE_APP_BASE_URL)
    // alert(process.env.VUE_APP_BASE_URL)
  },
};
</script>
<style scoped>
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
