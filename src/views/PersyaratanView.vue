<template>
  <div class="kotak" v-if="isLogin">
    <b-tabs pills content-class="mt-3" lazy>
      <b-tab title="Pengaturan Hak akses">
        <b-tabs pills card vertical>
          <b-tab title="Hak akses admin Akademik" active>
            <fieldset class="menu-border">
              <legend class="menu-border">Menu</legend>
              <b-form id="form1" >
              <b-form-checkbox-group
                id="menuid"
                v-model="selected1"
                name="menuid"
                @change="updateRole(1)"
              >
                <div class="col" v-for="item in akademik" :key="item.menuid">
                  <b-form-checkbox
                  :value="item.menuid"
                  >
                    {{ item.menunama }}
                  </b-form-checkbox>
                </div>
              </b-form-checkbox-group>
              </b-form>
            </fieldset>
          </b-tab>
          <b-tab title="Hak akses admin prodi">
            <fieldset class="menu-border">
              <legend class="menu-border">Menu</legend>
              <b-form-checkbox-group
                id="menuid"
                v-model="selected2"
                @change="updateRole(2)"
                name="menuid"
              >
                <div class="col" v-for="item in prodi" :key="item.menuid">
                  <b-form-checkbox
                  :value="item.menuid"
                  >
                    {{ item.menunama }}
                  </b-form-checkbox>
                </div>
              </b-form-checkbox-group>
              
            </fieldset>
          </b-tab>
          <b-tab title="Dosen">
            <fieldset class="menu-border">
              <legend class="menu-border">Menu</legend>
              <b-form-checkbox-group
                id="menuid"
                v-model="selected3"
                @change="updateRole(3)"
                name="menuid"
              >
                <div class="col" v-for="item in dosen" :key="item.menuid">
                  <b-form-checkbox
                  :value="item.menuid"
                  >
                    {{ item.menunama }}
                  </b-form-checkbox>
                </div>
              </b-form-checkbox-group>
              
            </fieldset>
          </b-tab>
          <b-tab title="Mahasiswa">
            <fieldset class="menu-border">
              <legend class="menu-border">Menu</legend>
              <b-form-checkbox-group
                id="menuid"
                v-model="selected4"
                @change="updateRole(4)"
                name="menuid"
              >
                <div class="col" v-for="item in mahasiswa" :key="item.menuid">
                  <b-form-checkbox
                  :value="item.menuid"
                  >
                    {{ item.menunama }}
                  </b-form-checkbox>
                </div>
              </b-form-checkbox-group>
              
            </fieldset>
          </b-tab>
          <b-tab title="Wadir">
            <fieldset class="menu-border">
              <legend class="menu-border">Menu</legend>
              <b-form-checkbox-group
                id="menuid"
                v-model="selected5"
                @change="updateRole(9)"
                name="menuid"
              >
                <div class="col" v-for="item in wadir" :key="item.menuid">
                  <b-form-checkbox
                  :value="item.menuid"
                  >
                    {{ item.menunama }}
                  </b-form-checkbox>
                </div>
              </b-form-checkbox-group>
              
            </fieldset>
          </b-tab>
        </b-tabs>
      </b-tab>
      <b-tab title="Pengaturan Persyaratan Rekomendasi Magang">
        <b-row>
          <b-col lg="4">
            <b-form id="form" v-if="show">
              <b-form-group
                id="input-group-1"
                label="Minimal Pengambilan SKS"
                label-for="minimalsks"
                class="mt-2"
              >
                <b-form-input
                  id="minimalsks"
                  placeholder="Minimal SKS yang sudah diambil"
                  v-model="minimalsks"
                  required
                ></b-form-input>
                <span v-if="error.minimalsks" class="text-error">
                  {{ error.minimalsks }}
                </span>
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label="Minimal Pengambilan SKS"
                label-for="maximalsksgagal"
                class="mt-2"
              >
                <b-form-input
                  id="maximalsksgagal"
                  placeholder="Jumlah sks gagal tidak boleh lebih dari"
                  v-model="maximalsksgagal"
                  required
                ></b-form-input>
                <span v-if="error.maximalsksgagal" class="text-error">
                  {{ error.maximalsksgagal }}
                </span>
              </b-form-group>

              <div class="mt-2">
                <b-button
                  squared
                  type="button"
                  @click="simpan"
                  variant="primary"
                  v-if="isnew"
                  >Simpan</b-button
                >
                <b-button
                  squared
                  type="button"
                  @click="update"
                  variant="primary"
                  v-else
                  >Update</b-button
                >
              </div>
            </b-form>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>

    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title> {{ modaltitle }}</template>
      <div class="d-block"></div>
    </b-modal>
  </div>

  <div v-else>
    <div class="kotak">
      <h3 class="text-center">
        Anda Belum Login <br />
        <b-link class="text-center" to="/">Silahkan Login Disini</b-link>
      </h3>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import { Modal } from "bootstrap";
export default {
  data: () => {
    return {
      isLogin: localStorage.getItem("isLogin"),
      show: true,
      limit: 10,
      keyword: "",
      page: 1,
      items: [],
      urut: 0,
      isnew: true,
      idx: "",
      minimalsks: "",
      maximalsksgagal: 0,
      akademik: null,
      prodi: null,
      dosen: null,
      mahasiswa: null,
      wadir: null,
      selected1: [],
      selected2: [],
      selected3: [],
      selected4: [],
      selected5: [],
      currentPage: 1,
      rows: 0,
      perPage: 0,
      pageCount: 0,
      modaltitle: "Pengaturan Persyaratan Rekomendasi Magang",
      filedata: "",
      formdata: {},
      error: {
        minimalsks: "",
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    onCheck: () => {
      return localStorage.getItem("isLogin");
    },
    resetForm() {
      this.isnew = true;
      this.idx = "";
      this.minimalsks = "";
      this.maximalsksgagal = "0";
      this.modaltitle = "Pengaturan Persyaratan Rekomendasi Magang";
    },
    tambah() {
      this.resetForm();
      this.$bvModal.show("bv-modal-example");
    },
    async getData() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `persyaratan`,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.isnew = false;
            this.idx = response.data.rekomendasi.idx;
            this.minimalsks = response.data.rekomendasi.minimalsks;
            this.maximalsksgagal = response.data.rekomendasi.maximalsksgagal;
            this.akademik = response.data.hakakses.akademik;
            this.prodi = response.data.hakakses.prodi;
            this.dosen = response.data.hakakses.dosen;
            this.mahasiswa = response.data.hakakses.mahasiswa;
            this.wadir = response.data.hakakses.wadir;
            this.selected1 = response.data.hakakses.akademikrole;
            this.selected2 = response.data.hakakses.prodirole;
            this.selected3 = response.data.hakakses.dosenrole;
            this.selected4 = response.data.hakakses.mahasiswarole;
            this.selected5 = response.data.hakakses.wadirrole;
          } else {
            this.isnew = true;
          }
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
    simpan: async function () {
      let token = localStorage.getItem("token");
      // this.filedata = $('#perusahaanlogo').prop('files')[0];
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("minimalsks", this.minimalsks);
      this.formdata.append("maximalsksgagal", this.maximalsksgagal);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `persyaratan/` + this.idx,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.getData();
            this.$swal.fire({
              title: "Sukses",
              text: response.data.message,
              icon: "success",
              confirmButtonText: "Ok",
            });
          } else {
            this.error = response.data.error;
            // this.$swal.fire({
            //   title: "Gagal",
            //   text: response.data.message,
            //   icon: "error",
            //   confirmButtonText: "Ok",
            // });
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    updateRole: async function (level) {
      let token = localStorage.getItem("token");
      // this.filedata = $('#perusahaanlogo').prop('files')[0];
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("levelid", level);
      if(level==1) this.formdata.append("menuid", this.selected1);
      else if(level==2) this.formdata.append("menuid", this.selected2);
      else if(level==3) this.formdata.append("menuid", this.selected3);
      else if(level==4)this.formdata.append("menuid", this.selected4);
      else this.formdata.append("menuid", this.selected5);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `updaterole/` + level,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.getData();
            // this.$swal.fire({
            //   title: "Sukses",
            //   text: response.data.message,
            //   icon: "success",
            //   confirmButtonText: "Ok",
            // });
          } else {
            this.error = response.data.error;
            // this.$swal.fire({
            //   title: "Gagal",
            //   text: response.data.message,
            //   icon: "error",
            //   confirmButtonText: "Ok",
            // });
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    update: async function () {
      let token = localStorage.getItem("token");
      // this.filedata = $('#perusahaanlogo').prop('files')[0];
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("idx", this.idx);
      this.formdata.append("minimalsks", this.minimalsks);
      this.formdata.append("maximalsksgagal", this.maximalsksgagal);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `persyaratan/` + this.idx,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.getData();
            this.idx = "";
            this.minimalsks = "";
            this.$bvModal.hide("bv-modal-example");
            this.$swal.fire({
              title: "Sukses",
              text: response.data.message,
              icon: "success",
              confirmButtonText: "Ok",
            });
          } else {
            this.$swal.fire({
              title: "Gagal",
              text: response.data.message,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    hapus: async function (id) {
      this.$swal
        .fire({
          title: "Apakah anda yakin?",
          text: "Anda akan menghapus Persyaratan Rekomendasi Magang!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya",
          cancelButtonText: "Tidak",
        })
        .then((result) => {
          if (result.isConfirmed) {
            let token = localStorage.getItem("token");
            axios
              .request({
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ` + token,
                },
                method: "DELETE",
                url: `jenis/` + id,
              })
              .then((response) => {
                console.log(response.data);

                if (response.data.code == 200) {
                  this.$swal.fire({
                    title: "Deleted!",
                    text: "Data anda berhasil diapus",
                    icon: "success",
                  });
                  this.getData();
                } else {
                  this.$swal.fire({
                    title: "Error!",
                    text: response.data.message,
                    icon: "warning",
                    confirmButtonText: "Ok",
                  });
                }
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
        });
    },
  },
};
</script>
