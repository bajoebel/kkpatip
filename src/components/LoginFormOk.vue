<template>
  <div style="background-color:#ccc;height:90vh;background:url(img/bg.jpg);background-repeat: no-repeat;background-size: cover;">
    <b-container class="h-50">
      <div
        class="d-flex justify-content-center h-100"
        style="padding-top: 150px"
      >
        <b-col >
          <b-card no-body class="overflow-hidden" style="background-color:rgb(36 46 129 / 36%);box-shadow:rgb(1 3 20 / 34%) 10px 10px;">
            <b-row no-gutters>
              <b-col cols="12" md="6">
                <b-card-img
                  src="img/login-bg.png"
                  alt="Image"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col cols="12" md="6">
                
                <b-card-body :title=title>
                  <b-form v-if="show">
                    <b-alert variant="danger" v-if="pesan" show>{{ pesan }}</b-alert>
                    
                    <b-form-group
                      id="input-group-1"
                      label="Level :"
                      label-for="input-1"
                      description=""
                      
                    >
                    <select class="custom-select" v-model="form.level">
                      <option value="admin">Admin prodi / Admin akademik</option>
                      <option value="mahasiswa">Mahasiswa</option>
                    </select>
                      
                    </b-form-group>
                    <b-form-group
                      id="input-group-1"
                      label="Username :"
                      label-for="input-1"
                      description=""
                      
                    >
                      <b-form-input
                        id="input-1"
                        v-model="form.username"
                        type="text"
                        placeholder="Masukkan Username"
                        class="t10"
                        required
                      ></b-form-input>
                    </b-form-group>
                    
                    <b-form-group
                      id="input-group-2"
                      label="Password:"
                      label-for="input-2"
                    >
                      <b-form-input
                        id="input-2"
                        v-model="form.password"
                        type="password"
                        placeholder="Masukkan Password"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <div >
                      <b-button-group>
                      <!-- <b-button type="submit" variant="primary">
                        <b-icon icon="key"></b-icon>
                        Login
                        </b-button> -->
                          <b-button type="button" variant="primary" @click="onLogin()" v-if="form.level=='admin'">
                          <b-icon icon="key"></b-icon>
                          Login admin
                          </b-button>
                          <b-button type="button" variant="primary" @click="onLoginMahasiswa()" v-else>
                          <b-icon icon="key"></b-icon>
                          Login Mahasiswa
                          </b-button>
                      
                      <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
                      </b-button-group>
                    </div>
                    
                  </b-form>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
          <!-- <b-card class="mt-3" :header="title"> </b-card> -->
        </b-col>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "LoginForm",
  props: {
    title: String,
    level: String
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        level:"mahasiswa"
      },
      show: true,
      pesan:null,
      listlevel:[
        {
          id:'admin',
          name:'Admin Prodi / Admin Akademik'
        },
        {
          id:'mahasiswa',
          name:'Mahasiswa'
        }
      ]
    };
  },
  methods: {
    async onLogin(){
      let self = this;
      
      try {
        console.clear();
        console.log(this.form.username);
        console.log(this.form.password);
        await axios.post('login', {
          username: this.form.username,
          userpass: this.form.password
        },{})
        .then(function (response) {
          console.log(response);
          // alert(response.data.token)
          if(response.data.status==200){
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('isLogin',true)
            self.$router.go('/')
            // location.reload()
          }
          
          return response;
        })
        .catch(function (error) {
          // console.clear();
          console.log("Caching Error : ")
          console.log(error);
        });
      } catch (error) {
        console.clear();
        console.log("Error Message : ")
        console.log(error)
      }
    },
    async onLoginMahasiswa(){
      let self = this;
      // alert(this.form.level)
      try {
        console.clear();
        console.log(this.form.username);
        console.log(this.form.password);
        await axios.post('login_mahasiswa', {
          username: this.form.username,
          userpass: this.form.password
        },{})
        .then(function (response) {
          console.log(response);
          // alert(response.data.token)
          if(response.data.status==200){
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('isLogin',true)
            // this.$router.push({ path: '/' })
            self.$router.go('/')
            // self.$router.push('/')
            // location.reload();
          }else{
            // alert(response.data.message);
            // alert('Test')
            self.pesan = response.data.message
          }
          
          return response;
        })
        .catch(function (error) {
          // console.clear();
          console.log("Caching Error : ")
          console.log(error);
        });
      } catch (error) {
        console.clear();
        console.log("Error Message : ")
        console.log(error)
      }
    }
  },
};
</script>
