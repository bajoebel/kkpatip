<template>
  <div class="kotak" v-if="isLogin">
    <h3>Data Jenis Kuota</h3>
    <!-- <b-table striped hover :items="items"></b-table> -->
    <b-row>
      <b-col cols="2" lg="1">
        <select class="custom-select" v-model="limit">
          <option value="10" selected>10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </b-col>
      <b-col cols="7" lg="10">
        <b-input-group>
          <b-form-input v-model="keyword"></b-form-input>
          <b-input-group-append>
            <b-button squared variant="success" @click="getData(Event, 1)">Cari</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col cols="3" lg="1">
        <!-- <b-button pill variant="primary" v-b-modal.modal-1>Tambah</b-button> -->
        <b-button pill block id="show-btn" variant="primary" @click="tambah"
          >Tambah</b-button
        >
      </b-col>
    </b-row>
    <hr />
    <table responsive class="table b-table table-striped table-hover" id="my-table">
      <thead>
        <tr>
          <td>No</td>
          <td>Jenis</td>
          <td>Jenis Status</td>
          <td style="width:50px;">#</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.jenisid">
          <td>{{ index + 1 }}</td>
          <td>{{ item.jeniskuota }}</td>
          <td>{{ item.jenisstatus==1?'Aktif':'Non Aktif' }}</td>
          <td>
            <b-button-group size="sm">
              <b-button squared variant="warning" @click="edit(item.jenisid)"
                ><b-icon icon="pencil"></b-icon></b-button
              >
              <b-button squared variant="danger" @click="hapus(item.jenisid)"
                ><b-icon icon="trash2"></b-icon></b-button
              >
              
            </b-button-group>
          </td>
        </tr>
      </tbody>
    </table>
    <b-row>
      <b-col>
        <div class="mt-2">
          <b-pagination 
            size="lg"
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
        <b-form id="form" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Jenis Kuota"
            label-for="jeniskuota"
            class="mt-2"
          >
            <b-form-input
              id="jeniskuota"
              placeholder="Masukkan Jenis Kuota"
              v-model="jeniskuota"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-checkbox
            id="jenisstatus"
            v-model="jenisstatus"
            name="jenisstatus"
            value="1"
            unchecked-value="0"
            >
            Aktif
            </b-form-checkbox> 
          <div class="mt-2">
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
      jenisid: "",
      jeniskuota: "",
      jenisstatus: 0,
      currentPage:1,
      rows:0,
      perPage:0,
      pageCount:0,
      modaltitle: "Tambah Jenis Kuota",
      filedata: "",
      formdata: {},
    };
  },
  mounted() {
    this.getData(Event,1);
  },
  methods: {
    onCheck: () => {
      return localStorage.getItem("isLogin");
    },
    resetForm() {
      this.isnew = true;
      this.jenisid = "";
      this.jeniskuota = "";
      this.jenisstatus = "0";
      this.modaltitle = "Tambah Jenis Kuota";
    },
    tambah() {
      this.resetForm();
      this.$bvModal.show("bv-modal-example");
    },
    async getData(event,page) {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url:
            `jeniskuota?page=`+page
             +
            `&limit=` +
            this.limit +
            `&keyword=` +
            this.keyword,
        })
        .then((response) => {
          console.log(response.data);
          this.items = response.data.data;
          this.currentPage=response.data.page.currentPage;
          this.rows=response.data.page.total
          this.perPage=response.data.page.perPage
          this.pageCount=response.data.page.pageCount
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
    async edit(id) {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `jeniskuota/` + id,
        })
        .then((response) => {
          console.log(response.data);

          if (response.data.code == 200) {
            this.isnew = false;
            this.modaltitle = "Update Data Jenis Kuota";
            this.jenisid = response.data.data.jenisid;
            this.jeniskuota = response.data.data.jeniskuota;
            this.jenisstatus = response.data.data.jenisstatus;
            // alert(this.jeniskuota)
            this.$bvModal.show("bv-modal-example");
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
    simpan: async function () {
      let token = localStorage.getItem("token");
      // this.filedata = $('#perusahaanlogo').prop('files')[0];
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("jeniskuota", this.jeniskuota);
      this.formdata.append("jenisstatus", this.jenisstatus);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `jeniskuota`,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 201) {
            this.getData();
            this.jeniskuota = "";
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
    update: async function () {
      let token = localStorage.getItem("token");
      // this.filedata = $('#perusahaanlogo').prop('files')[0];
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("jenisid", this.jenisid);
      this.formdata.append("jeniskuota", this.jeniskuota);
      this.formdata.append("jenisstatus", this.jenisstatus);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `jeniskuota/` + this.jenisid,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.getData();
            this.jenisid = "";
            this.jeniskuota = "";
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
      this.$swal.fire({
        title: "Apakah anda yakin?",
        text: "Anda akan menghapus data Jenis Kuota!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Tolong Hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          let token = localStorage.getItem("token");
          axios
            .request({
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ` + token,
              },
              method: "DELETE",
              url: `jeniskuota/` + id,
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
