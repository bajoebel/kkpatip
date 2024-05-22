<template>
  <div class="kotak" v-if="isLogin">
    <h3>Tambah Perusahaan</h3>
    <b-row class="mt-5">
        <b-col cols="12" lg="3">
            <table class="table table-bordered" style="padding:10px;">
                <tr>
                    <th>Jenis Kuota</th>
                    <td>: {{kuota.jeniskuota}}</td>
                </tr>
                <tr>
                    <th>Prodi</th>
                    <td>: {{kuota.kuotaprodinama}}</td>
                </tr>
                <tr>
                    <th>Semester</th>
                    <td>: {{kuota.kuotasemnama}}</td>
                </tr>
                <tr>
                    <th>Mulai Registrasi</th>
                    <td>: {{kuota.kuotamulairegistrasi}}</td>
                </tr>
                <tr>
                    <th>Selesai Registrasi</th>
                    <td>: {{kuota.kuotaselesairegistrasi}}</td>
                </tr>
                <tr>
                    <th>Selesai Upload</th>
                    <td>: {{kuota.kuotaselesaiuploaddokumen}}</td>
                </tr>
            </table>
        </b-col>
        <b-col cols="12" lg="9">
            <div class="kotak">
                <h3>LIST PERUSAHAAN</h3>
            </div>
        </b-col>
    </b-row>
  </div>

  <div v-else>
    <div class="kotak">
      <h3 class="text-center">
        Anda Belum Login Ya<br />
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
      id:'',
      kuota:null
    };
  },
  mounted() {
    
    // this.getData(Event, 1);
    console.clear()
    console.log(this.$route.params.id)
    this.id=this.$route.params.id;
    this.isLogin=localStorage.getItem("isLogin")
    this.kuotaById()
    // alert(this.isLogin)
  },
  methods: {
    async kuotaById() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `kuota/` + this.id,
        })
        .then((response) => {
          console.log(response.data);

          if (response.data.code == 200) {
            this.kuota=response.data.data
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
