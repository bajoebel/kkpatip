<template>
  <div class="kotak" v-if="isLogin">
    <h3>Data Perusahaan</h3>
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
          <td>Nama Perusahaan</td>
          <td>Alamat</td>
          <td>No Telp</td>
          <td style="width:50px;">#</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.perusahaanid">
          <td>{{ index + 1 }}</td>
          <td>{{ item.perusahaannama }}</td>
          <td>{{ item.perusahaanalamat }}</td>
          <td>{{ item.perusaahaannotelp }}</td>
          <td>
            <b-button-group size="sm">
              <b-button squared variant="warning" @click="edit(item.perusahaanid)"
                ><b-icon icon="pencil"></b-icon></b-button
              >
              <b-button squared variant="danger" @click="hapus(item.perusahaanid)"
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
            label="Nama Perusahaan"
            label-for="perusahaannama"
            class="mt-2"
          >
            <b-form-input
              id="perusahaannama"
              placeholder="Masukkan Nama Perusahaan"
              v-model="perusahaannama"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Alamat:"
            label-for="perusahaanalamat"
            class="mt-2"
          >
            <b-form-input
              id="perusahaanalamat"
              placeholder="Masukkan alamat "
              v-model="perusahaanalamat"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Nama Perusahaan"
            label-for="perusahaanemail"
            class="mt-2"
          >
            <b-form-input
              id="perusahaanemail"
              type="email"
              placeholder="Masukkan Email Perusahaan"
              v-model="perusahaanemail"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="No Telp:"
            label-for="perusahaannotelp"
            class="mt-2"
          >
            <b-form-input
              id="perusahaannotelp"
              placeholder="Masukkan No Telp "
              v-model="perusahaannotelp"
              required
            ></b-form-input>
            
          </b-form-group>
          
          <b-form-group
          
            id="input-group-3"
            label="Logo:"
            label-for="perusahaanlogo"
            class="mt-2"
          >
            <!-- <b-form-file
              v-model="perusahaanlogo"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file> -->
            <b-form-file
              v-model="perusahaanlogo"
              :state="Boolean(perusahaanlogo)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
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
        <b-link class="text-center" to="/login">Silahkan Login Disini</b-link>
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
      perusahaanid: "",
      perusahaannama: "",
      perusahaanalamat: "",
      perusahaannotelp: "",
      perusahaanemail: "",
      perusahaanlogo: null,
      uniqueModal: null,
      currentPage:1,
      rows:0,
      perPage:0,
      pageCount:0,
      modaltitle: "Tambah Perusahaan",
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
      this.perusahaanid = "";
      this.perusahaannama = "";
      this.perusahaanalamat = "";
      this.perusahaannotelp = "";
      this.perusahaanemail = "";
      this.perusahaanlogo = null;
      this.modaltitle = "Tambah Perusahaan";
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
            `perusahaan?page=`+page
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
    onPageClick(event, page) {
      console.log("Clicked page", page);
      alert("Clicked page"+page)
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
          url: `perusahaan/` + id,
        })
        .then((response) => {
          console.log(response.data);

          if (response.data.code == 200) {
            this.isnew = false;
            this.modaltitle = "Update Data Perusahaan";
            this.perusahaanid = response.data.data.perusahaanid;
            this.perusahaannama = response.data.data.perusahaannama;
            this.perusahaanalamat = response.data.data.perusahaanalamat;
            this.perusahaanemail = response.data.data.perusahaanemail;
            this.perusahaannotelp = response.data.data.perusahaannotelp;
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
      this.formdata.append("perusahaannama", this.perusahaannama);
      this.formdata.append("perusahaanemail", this.perusahaanemail);
      this.formdata.append("perusahaanalamat", this.perusahaanalamat);
      this.formdata.append("perusahaannotelp", this.perusahaannotelp);
      this.formdata.append("perusahaanlogo", this.perusahaanlogo);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `perusahaan`,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 201) {
            this.getData();
            this.perusahaannama = "";
            this.perusahaanalamat = "";
            this.perusahaannotelp = "";
            this.perusahaanemail = "";
            this.perusahaanlogo = null;
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
      this.formdata.append("perusahaanid", this.perusahaanid);
      this.formdata.append("perusahaannama", this.perusahaannama);
      this.formdata.append("perusahaanemail", this.perusahaanemail);
      this.formdata.append("perusahaanalamat", this.perusahaanalamat);
      this.formdata.append("perusahaannotelp", this.perusahaannotelp);
      this.formdata.append("perusahaanlogo", this.perusahaanlogo);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `perusahaan/` + this.perusahaanid,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.getData();
            this.perusahaanid = "";
            this.perusahaannama = "";
            this.perusahaanalamat = "";
            this.perusahaannotelp = "";
            this.perusahaanemail = "";
            this.perusahaanlogo = null;
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
        text: "Anda akan menghapus data perusahaan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
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
              url: `perusahaan/` + id,
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
