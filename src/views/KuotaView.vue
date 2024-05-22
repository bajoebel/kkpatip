<template>
  <div class="kotak" v-if="isLogin">
    <h3>Data Mahasiswa</h3>
    <!-- <b-table striped hover :items="items"></b-table> -->
    <b-row>
      <b-col cols="2" lg="1">
        <select class="form-control" v-model="limit" @change="getData">
          <option value="10" selected>10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </b-col>
      <b-col cols="3" lg="3">
        <b-form-select v-model="prodiid" :options="listprodi" value-field="prodiid" text-field="prodinama" size="sm" class="form-control" @change="getData(Event, 1)"></b-form-select>
        <!-- <select class="form-control" v-model="prodiid" :options="listprodi" @change="getData">
          <option value="11" selected>TIA</option>
        </select> -->
      </b-col>
      <b-col cols="3" lg="3">
        <b-form-select v-model="semester" :options="listsemester" value-field="semid" text-field="semnama" size="sm" class="form-control" @change="getData(Event, 1)"></b-form-select>
        <!-- <select class="form-control" v-model="semester" @change="getData(Event, 1)">
          <option  v-for="item in listsemester" v-bind:key="item.semid" v-bind:value="item.semid" v-if="item.semaktif=1">{{item.semnama}}</option>
        </select> -->
      </b-col>
      <b-col cols="4" lg="5">
        <b-input-group>
          <b-form-input v-model="keyword" @keyup="getData"></b-form-input>
          <b-input-group-append>
            <b-button squared variant="success" @click="getData()"
              >Cari</b-button
            >
            <b-button squared block id="show-btn" variant="primary" @click="tambah"
              >Tambah</b-button
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
          <td rowspan="2">No</td>
          <td rowspan="2">Jenis Kuota</td>
          <td rowspan="2">Prodi</td>
          <td rowspan="2">Semester</td>
          <td colspan="3" class="text-center">Tanggal</td>
          <td style="width: 260px"  rowspan="2">#</td>
        </tr>
        <tr>
            <td>Mulai Registrasi</td>
            <td>Selesai Registrasi</td>
            <td>Upload Dokumen</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.kuotaidx">
          <td>{{ index + 1 }}</td>
          <td>{{ item.jeniskuota}}</td>
          <td>{{ item.kuotaprodinama }}</td>
          <td>{{ item.kuotasemnama }}</td>
          <td>{{ item.kuotamulairegistrasi }}</td>
          <td>{{ item.kuotaselesairegistrasi }}</td>
          <td>{{ item.kuotaselesaiuploaddokumen }}</td>
          <td>
            <b-button-group size="sm">
              <b-button squared variant="warning" @click="edit(item.kuotaidx)"
                ><b-icon icon="pencil"></b-icon></b-button
              >
              <b-button squared variant="danger" @click="hapus(item.kuotaidx)"
                ><b-icon icon="trash2"></b-icon></b-button
              >
              <!-- <b-button
                squared
                variant="primary"
                @click="rekomendasi(item.kuotaidx)"
                ><b-icon icon="plus"></b-icon> Tambah Perusahaan</b-button> -->
                <router-link :to="{ path: 'kuota/perusahaan/'+item.kuotaidx}" class="btn btn-primary rounded-0"><b-icon icon="plus"></b-icon> Tambah Perusahaan</router-link>
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
            label-for="kuotajenisid"
            class="mt-2"
          >
            <b-form-select v-model="kuotajenisid" :options="listjenis" value-field="jenisid" text-field="jeniskuota" size="sm" class="form-control"></b-form-select>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Program Studi"
            label-for="Prodi"
            class="mt-2"
            >
            <b-form-select v-model="kuotaprodiid" :options="listprodi" value-field="prodiid" text-field="prodinama" size="sm" class="form-control" @change="getProdiById"></b-form-select>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Semester"
            label-for="kuotasemid"
            class="mt-2"
            >
            <b-form-select v-model="kuotasemid" :options="listsemester" value-field="semid" text-field="semnama" size="sm" class="form-control" @change="getSemesterById"></b-form-select>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Mulai Daftar"
            label-for="kuotamulairegistrasi"
            class="mt-2"
            >
            <b-form-datepicker id="kuotamulairegistrasi" size="sm" v-model="kuotamulairegistrasi" locale="id" class="mb-2"></b-form-datepicker>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Selesai Daftar"
            label-for="kuotaselesairegistrasi"
            class="mt-2"
            >
            <b-form-datepicker id="kuotaselesairegistrasi" size="sm" v-model="kuotaselesairegistrasi" locale="id" class="mb-2"></b-form-datepicker>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Selesai Upload"
            label-for="kuotaselesairegistrasi"
            class="mt-2"
            >
            <b-form-datepicker id="kuotaselesaiuploaddokumen" size="sm" v-model="kuotaselesaiuploaddokumen" locale="id" class="mb-2"></b-form-datepicker>
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
      semester: 20231,
      page: 1,
      items: [],
      listsemester:[],
      listprodi:[],
      listjenis:[],
      urut: 0,
      currentPage: 1,
      rows: 0,
      perPage: 0,
      pageCount: 0,
      kuotaidx:'',
      kuotajenisid:'',
      kuotasemid:'',
      kuotasemnama:'',
      kuotaprodiid:null,
      kuotaprodinama:'',
      kuotapria:'',
      kuotawanita:'',
      kuotamulairegistrasi:'',
      kuotaselesairegistrasi:'',
      kuotaselesaiuploaddokumen:'',
      modaltitle:'Tambah Kuota',
      show:1,
      isnew:true
    };
  },
  mounted() {
    this.getListProdi();
    this.getListSemester();
    this.getListJenis();
    this.getData(Event, 1);
  },
  methods: {
    onCheck: () => {
      return localStorage.getItem("isLogin");
    },
    getUrut: () => {
      this.urut = this.urut + 1;
    },
    tambah() {
      console.clear();
      this.getListJenis();
      this.resetForm();
      this.$bvModal.show("bv-modal-example");
    },
    resetForm(){
      this.isnew=true
      this.kuotaidx="";
      this.kuotajenisid="";
      this.kuotasemid="";
      this.kuotasemnama="";
      this.kuotaprodiid="";
      this.kuotaprodinama="";
      this.kuotapria="";
      this.kuotawanita="";
      this.kuotamulairegistrasi="";
      this.kuotaselesairegistrasi="";
      this.kuotaselesaiuploaddokumen="";
    },
    async getListProdi() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url:`all/prodi`,
        })
        .then((response) => {
          console.log(response.data);
          this.listprodi = response.data.data;
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
    async getProdiById() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url:`prodi/`+this.kuotaprodiid,
        })
        .then((response) => {
          console.clear();
          console.log(response.data.data);
          this.kuotaprodinama = response.data.data.prodinama;
          // alert(this.kuotaprodinama)
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
    async getSemesterById() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url:`semester/`+this.kuotaprodiid+`/`+this.kuotasemid,
        })
        .then((response) => {
          console.clear();
          console.log(response.data);
          this.kuotasemnama = response.data.data.semnama;
          // alert(response.data.semnama)
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
    async getListSemester() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url:`semester/all?prodi=`+this.prodiid,
        })
        .then((response) => {
          console.log(response.data);
          this.listsemester = response.data.data;
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
          url:`all/jeniskuota`,
        })
        .then((response) => {
          console.log(response.data);
          this.listjenis = response.data.data;
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
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url:
            `kuota?page=` +
            page +
            `&limit=` +
            this.limit +
            `&keyword=` +
            this.keyword +
            `&prodi=` +
            this.prodiid +
            `&semester=` +
            this.semester,
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
    async edit(id) {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `kuota/` + id,
        })
        .then((response) => {
          console.log(response.data);

          if (response.data.code == 200) {
            this.isnew = false;
            this.modaltitle = "Update Data Kuota";
            this.kuotaidx = response.data.data.kuotaidx;
            this.kuotajenisid = response.data.data.kuotajenisid;
            this.kuotasemid = response.data.data.kuotasemid;
            this.kuotasemnama = response.data.data.kuotasemnama;
            this.kuotaprodiid = response.data.data.kuotaprodiid;
            this.kuotaprodinama = response.data.data.kuotaprodinama;
            this.kuotapria = response.data.data.kuotapria;
            this.kuotawanita = response.data.data.kuotawanita;
            this.kuotamulairegistrasi = response.data.data.kuotamulairegistrasi;
            this.kuotaselesairegistrasi = response.data.data.kuotaselesairegistrasi;
            this.kuotaselesaiuploaddokumen = response.data.data.kuotaselesaiuploaddokumen;
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
      this.formdata.append("kuotajenisid", this.kuotajenisid);
      this.formdata.append("kuotasemid", this.kuotasemid);
      this.formdata.append("kuotasemnama", this.kuotasemnama);
      this.formdata.append("kuotaprodiid", this.kuotaprodiid);
      this.formdata.append("kuotaprodinama", this.kuotaprodinama);
      this.formdata.append("kuotamulairegistrasi", this.kuotamulairegistrasi);
      this.formdata.append("kuotaselesairegistrasi", this.kuotaselesairegistrasi);
      this.formdata.append("kuotaselesaiuploaddokumen", this.kuotaselesaiuploaddokumen);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `kuota`,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 201) {
            this.getData(Event,1);
            this.resetForm()
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
      this.formdata.append("kuotajenisid", this.kuotajenisid);
      this.formdata.append("kuotasemid", this.kuotasemid);
      this.formdata.append("kuotasemnama", this.kuotasemnama);
      this.formdata.append("kuotaprodiid", this.kuotaprodiid);
      this.formdata.append("kuotaprodinama", this.kuotaprodinama);
      this.formdata.append("kuotamulairegistrasi", this.kuotamulairegistrasi);
      this.formdata.append("kuotaselesairegistrasi", this.kuotaselesairegistrasi);
      this.formdata.append("kuotaselesaiuploaddokumen", this.kuotaselesaiuploaddokumen);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `kuota/` + this.kuotaidx,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.getData();
            this.resetForm()
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
              url: `kuota/` + id,
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
