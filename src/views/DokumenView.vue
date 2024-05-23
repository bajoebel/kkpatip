<template>
  <div class="kotak" v-if="isLogin">
    <h3>Data Dokumen</h3>
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
          <td>Nama Dokumen</td>
          <td>Tipe Dokumen</td>
          <td>Jenis Dokumen</td>
          <td>Status</td>
          <td style="width:50px;">#</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.dokumenid">
          <td>{{ index + 1 }}</td>
          <td>{{ item.dokumennama }}</td>
          <td>{{ item.dokumentipe }}</td>
          <td>{{ item.jenisdokumen }}</td>
          <td>{{ item.dokumenstatus==1?'Aktif':'Non Aktif' }}</td>
          <td>
            <b-button-group size="sm">
              <b-button squared variant="warning" @click="edit(item.dokumenid)"
                ><b-icon icon="pencil"></b-icon></b-button
              >
              <b-button squared variant="danger" @click="hapus(item.dokumenid)"
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
            label="Dokumen"
            label-for="dokumennama"
            class="mt-2"
          >
            <b-form-input
              id="dokumennama"
              placeholder="Masukkan Nama Dokumen"
              v-model="dokumennama"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Jenis Dokumen"
            label-for="dokumenjenisid"
            class="mt-2"
          >
            <b-form-select v-model="dokumenjenisid" :options="options" value-field="jenisidx" text-field="jenisdokumen" class="mt-3 form-control"></b-form-select>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Tipe File Yang diizinkan"
            label-for="dokumennama"
            class="mt-2"
          >
            <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="dokumentipe"
                :aria-describedby="ariaDescribedby"
                name="dokumentipe"
            >
            <!-- image/jpg,image/jpeg,image/gif,image/png,image/webp -->
                <b-form-checkbox value="image/jpg">JPG</b-form-checkbox>
                <b-form-checkbox value="image/jpeg">JPEG</b-form-checkbox>
                <b-form-checkbox value="image/gif">GIF</b-form-checkbox>
                <b-form-checkbox value="image/png">PNG</b-form-checkbox>
                <b-form-checkbox value="application/pdf">PDF</b-form-checkbox>
                <b-form-checkbox value="application/doc">DOC</b-form-checkbox>
                <b-form-checkbox value="application/docx">DOCx</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>

          <b-form-checkbox
            id="dokumenstatus"
            v-model="dokumenstatus"
            name="dokumenstatus"
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
      dokumenid: "",
      dokumennama: "",
      dokumenstatus: 0,
      dokumenjenisid:"",
      dokumentipe:[],
      options:[],
      currentPage:1,
      rows:0,
      perPage:0,
      pageCount:0,
      modaltitle: "Tambah Jenis Dokumen",
      filedata: "",
      formdata: {},
    };
  },
  mounted() {
    this.getData(Event,1);
    this.getListJenis();
  },
  methods: {
    onCheck: () => {
      return localStorage.getItem("isLogin");
    },
    resetForm() {
      this.isnew = true;
      this.dokumenid = "";
      this.dokumennama = "";
      this.dokumenjenisid = "";
      this.dokumenstatus = "0";
      this.dokumentipe=[];
      this.modaltitle = "Tambah Dokumen";
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
            `dokumen?page=`+page
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
    async getListJenis() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url:`jenis/all`,
        })
        .then((response) => {
          console.log(response.data);
          this.options = response.data.data;
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
          url: `dokumen/` + id,
        })
        .then((response) => {
          console.log(response.data);

          if (response.data.code == 200) {
            this.isnew = false;
            this.modaltitle = "Update Data Jenis Dokumen";
            this.dokumenid = response.data.data.dokumenid;
            this.dokumennama = response.data.data.dokumennama;
            this.dokumenstatus = response.data.data.dokumenstatus;
            // alert(this.dokumennama)
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
      this.formdata.append("dokumennama", this.dokumennama);
      this.formdata.append("dokumentipe", this.dokumentipe);
      this.formdata.append("dokumenjenisid", this.dokumenjenisid);
      this.formdata.append("dokumenstatus", this.dokumenstatus);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `dokumen`,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 201) {
            this.getData();
            this.dokumennama = "";
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
      this.formdata.append("dokumenid", this.dokumenid);
      this.formdata.append("dokumennama", this.dokumennama);
      this.formdata.append("dokumentipe", this.dokumentipe);
      this.formdata.append("dokumenjenisid", this.dokumenjenisid);
      this.formdata.append("dokumenstatus", this.dokumenstatus);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `dokumen/` + this.dokumenid,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.getData();
            this.dokumenid = "";
            this.dokumennama = "";
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
        text: "Anda akan menghapus data Jenis dokumen!",
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
              url: `dokumen/` + id,
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
