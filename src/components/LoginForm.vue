<template>
  <div style="background-color:#ccc;height:90vh;background:url(img/bg.jpg);background-repeat: no-repeat;background-size: cover;">
    <b-container class="h-100">
      <div
        class="d-flex justify-content-center h-100"
        style="padding-top: 150px"
      >
        <b-col cols="8">
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
                  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
                      class="t10"
                    >
                      <b-form-input
                        id="input-2"
                        v-model="form.password"
                        type="password"
                        placeholder="Masukkan Password"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <div class="t10">
                      <b-button-group>
                      <b-button type="submit" variant="primary">
                        <b-icon icon="key"></b-icon>
                        Login
                        </b-button>
                      <b-button type="reset" variant="danger">Reset</b-button>
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
export default {
  name: "LoginForm",
  props: {
    title: String,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
