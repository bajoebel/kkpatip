<template>
  <div class="kotak" v-if="isLogin">
    <div class="header">
      <b-row>
        <b-col>
        <h3>Data Mahasiswa</h3>
        </b-col>
        <b-col class="text-right"><b-link to="/" class="close-btn"><b-icon icon="x-circle-fill"></b-icon></b-link></b-col>
      </b-row>
    </div>
    <!-- <b-table striped hover :items="items"></b-table> -->
    <b-row>
      <b-col cols="2" lg="1">
        <select class="custom-select" v-model="limit" @change="getData">
          <option value="10" selected>10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </b-col>
      <b-col cols="3" lg="3">
        <b-form-select
          v-model="prodiid"
          :options="listprodi"
          value-field="prodiid"
          text-field="prodinama"
          @change="getData(Event, 1)"
        ></b-form-select>
        <!-- <select class="form-control" v-model="prodiid" :options="listprodi" @change="getData">
          <option value="11" selected>TIA</option>
        </select> -->
      </b-col>
      <b-col cols="3" lg="3">
        <b-form-select
          v-model="angkatan"
          :options="listangkatan"
          @change="getData(Event, 1)"
        ></b-form-select>
      </b-col>
      <b-col cols="4" lg="5">
        <b-input-group>
          <b-form-input v-model="keyword" @keyup="getData"></b-form-input>
          <b-input-group-append>
            <b-button squared variant="success" @click="getData()"
              >Cari</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- <b-col cols="1"><b-button pill variant="primary">Tambah</b-button></b-col> -->
    </b-row>
    <hr />
    <table responsive class="table b-table table-striped table-hover">
      <thead>
        <tr>
          <td>No</td>
          <td>Nama</td>
          <td>Alamat</td>
          <td>No Telp</td>
          <td>Prodi Nama</td>
          <td>Angkatan</td>
          <td>SKS Diambil</td>
          <td>SKS Nilai D/E</td>
          <td>Di Rekomendasi Sistem</td>
          <td style="width: 150px">#</td>
        </tr>
      </thead>
      <tbody v-if="isLoading">
        <tr>
          <td colspan="10" class="text-center">
            <b-spinner small type="grow"></b-spinner> Loading...
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(item, index) in items" :key="item.perusahaanid">
          <td>{{ index + 1 }}</td>
          <td>{{ item.mhsnobp + " - " + item.mhsnama }}</td>
          <td>{{ item.mhsalamat }}</td>
          <td>{{ item.mhstelp }}</td>
          <td>{{ item.prodinama }}</td>
          <td>{{ item.mhsangkatan }}</td>
          <td>{{ item.totalsks }}</td>
          <td>{{ item.nilai_d_e }}</td>
          <td>
            <b-button
              variant="success"
              size="sm"
              squared
              v-if="
                item.totalsks >= minimalsks && item.nilai_d_e < maximalsksgagal
              "
              >Ya</b-button
            >
            <b-button variant="danger" size="sm" squared v-else>Tidak</b-button>
          </td>
          <td>
            <b-button-group size="sm">
              <b-button
                squared
                variant="primary"
                @click="rekomendasi(item.mhsnobp)"
                v-if="item.mhsrekommagang=='0'"
                ><b-icon icon="person-check"></b-icon
              ></b-button>
              <b-button
                squared
                variant="danger"
                @click="hapusRekomendasi(item.mhsnobp)"
                v-else
                ><b-icon icon="person-x"></b-icon
              ></b-button>
              <b-button
                squared
                variant="warning"
                @click="registerPasien(item.mhsnobp)"
                ><b-icon icon="person-plus"></b-icon
              > Register</b-button>
            </b-button-group>
          </td>
        </tr>
      </tbody>
    </table>
    <b-row>
      <b-col>
        <div class="mt-2">
          <b-pagination
            pills
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            @page-click="getData"
          ></b-pagination>
        </div>
      </b-col>
    </b-row>

    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title> {{ modaltitle }}</template>
      <div class="d-block">
        <b-form id="form">
          <b-alert show variant="success">{{ this.registerkuotadesc }}</b-alert>
          <b-form-group
            id="input-group-1"
            label="Nobp"
            label-for="registernobp"
            class="mt-2"
          >
            <b-form-input
              id="registernobp"
              placeholder="NoBP"
              v-model="registernobp"
              required
            ></b-form-input>
            <span v-if="error.registernobp" class="text-error"> {{ error.registernobp }} </span>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Nama :"
            label-for="registermhsnama"
            class="mt-2"
          >
            <b-form-input
              id="registermhsnama"
              placeholder="Masukkan Nama "
              v-model="registermhsnama"
              required
            ></b-form-input>
            <span v-if="error.registermhsnama" class="text-error"> {{ error.registermhsnama }} </span>
          </b-form-group>
          
          <!-- <b-form-group
            id="input-group-1"
            label="Periode Kuota"
            label-for="registerkuotaid"
            class="mt-2"
          >
          <b-form-input
              id="registerkuotadesc"
              placeholder="Kuota ID"
              v-model="registerkuotadesc"
              required
            ></b-form-input>
            
            <span v-if="error.registerkuotaid" class="text-error"> {{ error.registerkuotaid }} </span>
          </b-form-group> -->
          <b-form-group
            id="input-group-2"
            label="Perusahaan:"
            label-for="registerperusahaanid"
            class="mt-2"
          >
            
            <b-form-select
                          v-model="registerperusahaanid"
                          :options="perusahaan"
                          value-field="perusahaanid"
                          text-field="perusahaannama"
                          @change="getPerusahaanById()"
                        ></b-form-select>
            <span v-if="error.registerperusahaanid" class="text-error"> {{ error.registerperusahaanid }} </span>
          </b-form-group>
          
          <div class="mt-2" v-if="isLoadingBtn==true">
            <b-button squared variant="primary" disabled>
              <b-spinner small type="grow"></b-spinner>
              Loading...
            </b-button>
          </div>
          <div class="mt-2" v-else>
            <b-button
              squared
              type="button"
              @click="simpan"
              variant="primary"
              v-if="isnew"
              >Simpan</b-button
            >
            <b-button squared type="button" @click="update" variant="primary" v-else
              >Update</b-button
            >
            <b-button squared type="reset" variant="danger">Reset</b-button>
          </div>
        </b-form>
      </div>
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
// import { register } from "register-service-worker";
export default {
  data: () => {
    return {
      isLogin: localStorage.getItem("isLogin"),
      aku: "Aku",
      registernobp: "",
      registermhsnama: "",
      registerkuotaid: "",
      registerkuotadesc: "",
      registerperusahaanid: "",
      registernamaperusahaan: "",
      mhsprodiid: "",
      isnew: true,
      isLoadingBtn: false,
      // isLoadingBtn: false,
      modaltitle: "Register Magang Mahasiswa",
      isLoading: false,
      limit: 10,
      keyword: "",
      prodiid: "11",
      angkatan: new Date().getFullYear(),
      tahunini: new Date().getFullYear(),
      minimalsks: 0,
      maximalsksgagal: 0,
      page: 1,
      items: [],
      kuota: [],
      perusahaan: [],
      listangkatan: [],
      listprodi: [],
      urut: 0,
      currentPage: 1,
      rows: 0,
      perPage: 0,
      pageCount: 0,
      error: {},
    };
  },
  mounted() {
    let la = [];
    var myobj = {};
    for (let i = 2015; i <= this.tahunini; i++) {
      if (i == this.tahunini) {
        myobj = {
          value: i,
          text: i,
          selected: true,
        };
      } else {
        myobj = {
          value: i,
          text: i,
        };
      }

      la.push(myobj);
    }
    this.getConfig();
    //this.getListProdi();
    this.getAksesRuang();
    this.listangkatan = la;
    this.getData(Event, 1);
    // console.log(this.listangkatan)
    // alert(this.minimalsks)
  },
  methods: {
    onCheck: () => {
      return localStorage.getItem("isLogin");
    },
    async getConfig() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `syaratmagang`,
        })
        .then((response) => {
          console.log(response.data);
          this.minimalsks = response.data.data.minimalsks;
          this.maximalsksgagal = response.data.data.maximalsksgagal;
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
      this.isLoadingBtn = true;
      let token = localStorage.getItem("token");
      // this.filedata = $('#perusahaanlogo').prop('files')[0];
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("registerkuotaid", this.registerkuotaid);
      this.formdata.append("registerperusahaanid", this.registerperusahaanid);
      this.formdata.append("registernamaperusahaan", this.registernamaperusahaan);
      this.formdata.append("registernobp", this.registernobp);
      this.formdata.append("registermhsnama", this.registermhsnama);
      this.formdata.append("registerstatus", 1);
      console.log(this.formdata);
      // alert(this.registernobp)
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `register`,
          data: this.formdata
        })
        .then((response) => {
          this.isLoadingBtn = false;
          console.clear();
          console.log(response.data);
          
          if (response.data.code == 201) {
            // this.getData();
            this.isLoadingBtn = false;
            this.registerkuotaid = "";
            this.registerperusahaanid = "";
            this.registernamaperusahaan = "";
            this.registernobp = "";
            this.registermhsnama = '';
            this.$bvModal.hide("bv-modal-example");
            this.$swal.fire({
              title: "Sukses",
              text: response.data.message,
              icon: "success",
              confirmButtonText: "Ok",
            });
          } else {
            // alert("error")
            this.isLoadingBtn = false;
            this.error = response.data.error;
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
          //this.isLoadingBtn = false;
          // alert("error");
          console.log(error);
        })
        .finally(function () {
          // this.isLoadingBtn = false;
          // always executed
          // alert("finally");
          
        });
    },
    getAksesRuang: async function () {
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
            this.listprodi = response.data.info.prodi;
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
    getPerusahaanById: async function () {
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
            url: `perusahaan/`+this.registerperusahaanid ,
          })
          .then((response) => {
            console.log(response.data.data);
            // alert(response.data.data.perusahaannama)
            this.registernamaperusahaan = response.data.data.perusahaannama;
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
    getPeriodeKuota: async function () {
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
            url: `kuotaaktif/`+this.mhsprodiid ,
          })
          .then((response) => {
            console.log(response.data);
            this.registerkuotaid = response.data.data.kuotaidx;
            this.perusahaan = response.data.data.perusahaan;
            this.registerkuotadesc = `Kuota `+response.data.data.jeniskuota+` Untuk Prodi `+response.data.data.kuotaprodinama+` - Periode `+response.data.data.kuotasemnama+` (`+response.data.data.kuotamulairegistrasi+` - ` +response.data.data.kuotaselesairegistrasi+`)`;
            // this.kuota = response.data.data;
          })
          .catch((error) => {
            this.registerkuotaid = '';
            this.perusahaan = '';
            this.registerkuotadesc = '';
            console.log(error);
          })
          // .catch(function (error) {
          //   // handle error
          //   alert("error");
          //   this.registerkuotaid = '';
          //   this.perusahaan = '';
          //   this.registerkuotadesc =''
          //   console.log(error);
          // })
          .finally(function () {
            // always executed
          });
      }

      return false;
    },
    registerPasien: async function(nobp) {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `mahasiswa/edit/`+nobp,
        })
        .then((response) => {
          if (response.data.code == 200) {
            this.isnew = true;
            this.modaltitle = "Register Magang Mahasiswa";
            this.registernobp = response.data.data.mhsnobp;
            this.registermhsnama = response.data.data.mhsnama;
            this.mhsprodiid = response.data.data.mhsprodiid;
            this.$bvModal.show("bv-modal-example");
            this.getPeriodeKuota();
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
    },
    getData: async function (event, page) {
      this.isLoading = true;
      let token = localStorage.getItem("token");
      this.page = page;
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url:
            `mahasiswa?page=` +
            page +
            `&limit=` +
            this.limit +
            `&keyword=` +
            this.keyword +
            `&prodi=` +
            this.prodiid +
            `&angkatan=` +
            this.angkatan,
        })
        .then((response) => {
          console.log(response.data);
          this.items = response.data.data;
          this.currentPage = response.data.page.currentPage;
          this.rows = response.data.page.total;
          this.perPage = response.data.page.perPage;
          this.pageCount = response.data.page.pageCount;
          this.isLoading = false;
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
    rekomendasi: async function (mhsnobp = null) {
      let token = localStorage.getItem("token");

      // this.filedata = $('#perusahaanlogo').prop('files')[0];
      this.formdata = {
        mhsnobp: mhsnobp,
      };
      console.clear();
      console.log(this.formdata);
      // return false;
      this.$swal
          .fire({
            title: "Apakah anda yakin?",
            text: "Anda akan merekomendasikan mahasiswa ini untuk magang?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
          })
          .then((result) => {
            if (result.isConfirmed) {
              axios
                .request({
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ` + token,
                  },
                  method: "POST",
                  url: `mahasiswa/rekomendasi`,
                  data: this.formdata,
                })
                .then((response) => {
                  console.log(response.data);
                  if (response.data.code == 201) {
                    this.getData(Event, this.page);
                    this.formdata=null;
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
            }
          });
    },
    hapusRekomendasi: async function (mhsnobp = null) {
      let token = localStorage.getItem("token");

      // this.filedata = $('#perusahaanlogo').prop('files')[0];
      this.formdata = {
        mhsnobp: mhsnobp,
      };
      console.clear();
      console.log(this.formdata);
      // return false;
      this.$swal
          .fire({
            title: "Apakah anda yakin?",
            text: "Anda akan membatalkan rekomendasi mahasiswa ini untuk magang?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
          })
          .then((result) => {
            if (result.isConfirmed) {
              axios
                .request({
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ` + token,
                  },
                  method: "POST",
                  url: `mahasiswa/hapusrekomendasi`,
                  data: this.formdata,
                })
                .then((response) => {
                  console.log(response.data);
                  if (response.data.code == 200) {
                    this.getData(Event, this.page);
                    this.formdata=null;
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
            }
          });
    },
  },
};
</script>
