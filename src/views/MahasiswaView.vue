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
          <td style="width: 50px">#</td>
        </tr>
      </thead>
      <tbody>
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
export default {
  data: () => {
    return {
      isLogin: localStorage.getItem("isLogin"),
      aku: "Aku",
      limit: 10,
      keyword: "",
      prodiid: "11",
      angkatan: new Date().getFullYear(),
      tahunini: new Date().getFullYear(),
      minimalsks: 0,
      maximalsksgagal: 0,
      page: 1,
      items: [],
      listangkatan: [],
      listprodi: [],
      urut: 0,
      currentPage: 1,
      rows: 0,
      perPage: 0,
      pageCount: 0,
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
    // async getListProdi() {
    //   let token = localStorage.getItem("token");
    //   await axios
    //     .request({
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ` + token,
    //       },
    //       method: "GET",
    //       url: `all/prodi`,
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //       this.listprodi = response.data.data;
    //     })
    //     .catch(function (error) {
    //       // handle error
    //       console.log(error);
    //     })
    //     .finally(function () {
    //       // always executed
    //     });
    //   return false;
    // },
    getData: async function (event, page) {
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
