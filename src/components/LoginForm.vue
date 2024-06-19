<template>
  <b-row>
    <b-col lg="3" >
      <b-form v-if="show" class="kotak-login center-vertikal">
        <p class="text-center">
          <!-- <b-icon icon="arrow-left" /> -->
          <b-img src="img/logo-login.png" alt="Image" class="rounded-0"></b-img>
          <!-- <b-icon icon="arrow-right" /> -->
        </p>
        <p class="title-login text-center">
          Silahkan masukkan username dan password anda untuk masuk ke dashboard aplikasi
        </p>
        <b-alert variant="danger" v-if="pesan" show>{{ pesan }}</b-alert>

        <b-input-group>
          <b-input-group-prepend>
            <b-input-group-text>
              <b-icon icon="diagram2" />
            </b-input-group-text>
          </b-input-group-prepend>

          <select
            class="custom-select form-control-lg"
            v-model="form.level"
            size="lg"
            style="border-radius: 0px"
          >
            <option value="admin">Admin prodi / Admin akademik</option>
            <option value="mahasiswa">Mahasiswa</option>
          </select>
        </b-input-group>
        <b-input-group class="mt10">
          <b-input-group-prepend>
            <b-input-group-text>
              <b-icon icon="person" />
            </b-input-group-text>
          </b-input-group-prepend>

          <b-form-input
            id="input-1"
            v-model="form.username"
            type="text"
            placeholder="Masukkan Username"
            class="t10"
            size="lg"
            required
            style="border-radius: 0px"
          ></b-form-input>
        </b-input-group>
        <b-input-group class="mt10">
          <b-input-group-prepend>
            <b-input-group-text>
              <b-icon icon="key" />
            </b-input-group-text>
          </b-input-group-prepend>

          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Masukkan Password"
            size="lg"
            required
            style="border-radius: 0px"
          ></b-form-input>
        </b-input-group>

        <div>
          <b-button-group class="mt10">
            <b-button
              type="button"
              variant="danger"
              @click="onLogin()"
              v-if="form.level == 'admin'"
            >
              <b-icon icon="key"></b-icon>
              Login Admin
            </b-button>
            <b-button
              type="button"
              variant="primary"
              @click="onLoginMahasiswa()"
              v-else
            >
              <b-icon icon="key"></b-icon>
              Login Mahasiswa
            </b-button>

            <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
          </b-button-group>
        </div>
      </b-form>
    </b-col>
    <!-- <b-col lg="9"  style="background-color:#ccc;background:url(img/bg.jpg);background-repeat: no-repeat;background-size: cover;"></b-col> -->
    <b-col
      lg="9"
      style="
        background-color: #ccc;
        height: 90vh;
        background: url(img/bg.jpg);
        background-repeat: no-repeat;
        background-size: cover;
      "
    >
    <div class="footer-label">
      <marquee behavior="" direction="">Selamat Datang di aplikasi KKP Politeknik ATI Padang</marquee>
    </div>
    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  props: {
    title: String,
    level: String,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        level: "mahasiswa",
      },
      show: true,
      pesan: null,
      listlevel: [
        {
          id: "admin",
          name: "Admin Prodi / Admin Akademik",
        },
        {
          id: "mahasiswa",
          name: "Mahasiswa",
        },
      ],
    };
  },
  methods: {
    async onLogin() {
      let self = this;

      try {
        console.clear();
        console.log(this.form.username);
        console.log(this.form.password);
        await axios
          .post(
            "login",
            {
              username: this.form.username,
              userpass: this.form.password,
            },
            {}
          )
          .then(function (response) {
            console.log(response);
            // alert(response.data.token)
            if (response.data.status == 200) {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("isLogin", true);
              self.$router.go("/");
              // location.reload()
            }

            return response;
          })
          .catch(function (error) {
            // console.clear();
            console.log("Caching Error : ");
            console.log(error);
          });
      } catch (error) {
        console.clear();
        console.log("Error Message : ");
        console.log(error);
      }
    },
    async onLoginMahasiswa() {
      let self = this;
      // alert(this.form.level)
      try {
        console.clear();
        console.log(this.form.username);
        console.log(this.form.password);
        await axios
          .post(
            "login_mahasiswa",
            {
              username: this.form.username,
              userpass: this.form.password,
            },
            {}
          )
          .then(function (response) {
            console.log(response);
            // alert(response.data.token)
            if (response.data.status == 200) {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("isLogin", true);
              // this.$router.push({ path: '/' })
              self.$router.go("/");
              // self.$router.push('/')
              // location.reload();
            } else {
              // alert(response.data.message);
              // alert('Test')
              self.pesan = response.data.message;
            }

            return response;
          })
          .catch(function (error) {
            // console.clear();
            console.log("Caching Error : ");
            console.log(error);
          });
      } catch (error) {
        console.clear();
        console.log("Error Message : ");
        console.log(error);
      }
    },
  },
};
</script>
