<template>
  <div class="kotak" v-if="isLogin">
    <h3>Tambah Perusahaan</h3>
    <b-row class="mt-0">
      <b-col cols="12" lg="3">
        <table
          class="table table-bordered table-striped table-hover"
          style="padding: 10px"
        >
          <tr>
            <th>Jenis Kuota</th>
            <td>: {{ kuota.jeniskuota }}</td>
          </tr>
          <tr>
            <th>Prodi</th>
            <td>: {{ kuota.kuotaprodinama }}</td>
          </tr>
          <tr>
            <th>Semester</th>
            <td>: {{ kuota.kuotasemnama }}</td>
          </tr>
          <tr>
            <th>Mulai Registrasi</th>
            <td>: {{ kuota.kuotamulairegistrasi }}</td>
          </tr>
          <tr>
            <th>Selesai Registrasi</th>
            <td>: {{ kuota.kuotaselesairegistrasi }}</td>
          </tr>
          <tr>
            <th>Selesai Upload</th>
            <td>: {{ kuota.kuotaselesaiuploaddokumen }}</td>
          </tr>
        </table>
      </b-col>
      <b-col cols="12" lg="9">
        <b-tabs content-class="mt-3" lazy>
          <b-tab title="List Perusahaan">
            <div>
              <b-row>
                <b-col>
                  <div class="kotak mt-0">
                    <b-form id="form">
                      <b-row>
                        <b-col cols="5">
                          <label for="">Perusahaan</label>
                          <b-form-select
                            v-model="detailperusahaanid"
                            :options="listperusahaan"
                            value-field="perusahaanid"
                            text-field="perusahaannama"
                          ></b-form-select>
                        </b-col>
                        <b-col cols="2">
                          <label for="">Kuota Pria</label>
                          <b-form-input
                            v-model="detailkuotapria"
                            placeholder="Kuota Pria"
                          ></b-form-input>
                        </b-col>
                        <b-col cols="2">
                          <label for="">Kuota Wanita</label>
                          <b-form-input
                            v-model="detailkuotawanita"
                            placeholder="Kuota Wanita"
                          ></b-form-input>
                        </b-col>
                        <b-col cols="3">
                          <label for="">Kuota Pria/Wanita</label>
                          <b-input-group>
                            <b-form-input
                              v-model="detailkuotapriawanita"
                              placeholder="Kuota Pria/Wanita"
                            ></b-form-input>
                            <b-input-group-append>
                              <b-button
                                squared
                                variant="success"
                                @click="simpan()"
                              >
                                <b-icon icon="save"></b-icon>
                              </b-button>
                            </b-input-group-append>
                          </b-input-group>
                        </b-col>
                      </b-row>
                    </b-form>
                    <hr />
                    <b-row>
                      <b-col>
                        <table
                          responsive
                          class="table b-table table-striped table-hover"
                        >
                          <thead class="bg-primary">
                            <tr>
                              <td rowspan="2">No</td>
                              <td rowspan="2">Nama Perusahaan</td>
                              <td colspan="3" class="text-center">Kuota</td>
                              <td style="width: 100px" rowspan="2">#</td>
                            </tr>
                            <tr>
                              <td>Pria</td>
                              <td>Wanita</td>
                              <td>Pria / Wanita</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(item, index) in items"
                              :key="item.detailid"
                            >
                              <td>{{ index + 1 }}</td>
                              <td>{{ item.perusahaannama }}</td>
                              <td>{{ item.detailkuotapria }}</td>
                              <td>{{ item.detailkuotawanita }}</td>
                              <td>{{ item.detailkuotapriawanita }}</td>
                              <td>
                                <b-button-group size="sm">
                                  <b-button
                                    squared
                                    variant="warning"
                                    @click="edit(item.detailid)"
                                    ><b-icon icon="pencil"></b-icon
                                  ></b-button>
                                  <b-button
                                    squared
                                    variant="danger"
                                    @click="hapus(item.detailid)"
                                    ><b-icon icon="trash2"></b-icon
                                  ></b-button>
                                </b-button-group>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-tab>
          <b-tab title="List Dokumen Perusahaan">
            <div class="kotak">
              <b-form id="form1">
                <b-row>
                  <b-col cols="4">
                    <label for="">Perusahaan</label>
                    <b-form-select
                      v-model="akdperusahaanid"
                      :options="items"
                      value-field="perusahaanid"
                      text-field="perusahaannama"
                    ></b-form-select>
                  </b-col>
                  <b-col cols="4">
                    <label for="">Dokumen</label>
                    <b-form-select
                      v-model="akddokumenid"
                      :options="listdokumen"
                      value-field="dokumenid"
                      text-field="dokumennama"
                    ></b-form-select>
                  </b-col>

                  <b-col cols="4">
                    <label for="">Files</label>
                    <b-input-group>
                      <b-form-file
                        v-model="akddokumenfiles"
                        :state="Boolean(akddokumenfiles)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                      ></b-form-file>
                      <b-input-group-append>
                        <b-button squared variant="success" @click="simpanDok()">
                          <b-icon icon="save"></b-icon>
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                </b-row>
              </b-form>
              <hr />
              <table
                class="table table-bordered table-striped table-hover"
                style="padding: 10px"
              >
                <tr>
                  <td>No</td>
                  <td>Nama Perusahaan</td>
                  <td>Nama Dokumen</td>
                  <td>Download</td>
                  <td>#</td>
                </tr>
                <tr v-for="(item, index) in dokumens" :key="item.akdidx">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.perusahaannama }}</td>
                  <td>{{ item.dokumennama }}</td>
                  <td>
                    <a
                      :href="endpoint + item.akddokumenfiles"
                      class="btn btn-danger rounded-0"
                      v-if="item.akddokumenfiles"
                      target="_blank"
                      ><b-icon icon="eye"></b-icon> Lihat</a
                    >
                    <b-button squared variant="danger" v-else
                      ><b-icon icon="upload"></b-icon> Belum Upload</b-button
                    >
                  </td>
                  <td>
                    <b-button-group size="sm">
                      <b-button
                        squared
                        variant="warning"
                        @click="editDok(item.akdidx)"
                        ><b-icon icon="pencil"></b-icon
                      ></b-button>
                      <b-button
                        squared
                        variant="danger"
                        @click="hapusDok(item.akdidx)"
                        ><b-icon icon="trash2"></b-icon
                      ></b-button>
                    </b-button-group>
                  </td>
                </tr>
              </table>
            </div>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </div>

  <div v-else>
    <div class="kotak">
      <h3 class="text-center">
        Anda Belum Login Ya<br />
        <b-link class="text-center" to="/login">Silahkan Login Disini</b-link>
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
      id: "",
      kuota: null,
      listperusahaan: null,
      detailid: "",
      detailperusahaanid: "",
      detailkuotapria: "",
      detailkuotawanita: "",
      detailkuotapriawanita: "",
      akdidx:"",
      akdkuotaid:"",
      akddokumenid:"",
      dokumenakademik:"",
      akddokumenfiles:null,
      items: null,
      dokumens: null,
      listdokumen:null,
      endpoint:process.env.VUE_APP_BASE_URL
    };
  },
  mounted() {
    // this.getData(Event, 1);
    console.clear();
    console.log(this.$route.params.id);
    this.id = this.$route.params.id;
    this.isLogin = localStorage.getItem("isLogin");
    this.kuotaById();
    this.getListPerusahaan();
    this.getListDokumen();
    this.getDetailPerusahaan();
    this.getDetailDokumen();
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
            this.kuota = response.data.data;
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
    resetForm() {
      this.isnew = true;
      this.detailid = "";
      this.detailperusahaanid = "";
      this.detailkuotapria = "";
      this.detailkuotawanita = "";
      this.detailkuotapriawanita = "";
    },
    resetFormDokumen() {
      this.isnew = true;
      this.akdidx = "";
      this.akdperusahaanid = "";
      this.akddokumenid = "";
      this.akddokumenfiles = null;
    },
    async getListPerusahaan() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `all/perusahaan`,
        })
        .then((response) => {
          console.log(response.data);
          this.listperusahaan = response.data.data;
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
    async getListDokumen() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `listdokumen/3`,
        })
        .then((response) => {
          console.log(response.data);
          this.listdokumen = response.data.data;
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
      this.formdata.append("detailkuotaidx", this.id);
      this.formdata.append("detailperusahaanid", this.detailperusahaanid);
      this.formdata.append("detailkuotapria", this.detailkuotapria);
      this.formdata.append("detailkuotawanita", this.detailkuotawanita);
      this.formdata.append("detailkuotapriawanita", this.detailkuotapriawanita);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `kuotadetail/` + this.detailid,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 201 || response.data.code == 200) {
            this.getDetailPerusahaan();
            this.resetForm();
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
    simpanDok: async function () {
      let token = localStorage.getItem("token");
      // this.filedata = $('#perusahaanlogo').prop('files')[0];
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("akdkuotaid", this.id);
      this.formdata.append("akdperusahaanid", this.akdperusahaanid);
      this.formdata.append("akddokumenid", this.akddokumenid);
      this.formdata.append("akddokumenfiles", this.akddokumenfiles);
      console.clear();
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `simpandokumenakademik/` + this.akdidx,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 201 || response.data.code == 200) {
            this.getDetailDokumen();
            this.resetFormDokumen();
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
    async getDetailPerusahaan() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `all/kuotadetail/` + this.id,
        })
        .then((response) => {
          console.clear();
          console.log(response.data.data);
          this.items = response.data.data;
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
    async getDetailDokumen() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `all/kuotadokumen/` + this.id,
        })
        .then((response) => {
          console.clear();
          console.log(response.data.data);
          this.dokumens = response.data.data;
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
    async edit(id = null) {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `kuotadetail/` + id,
        })
        .then((response) => {
          console.clear();
          console.log(response.data.data);
          this.detailid = response.data.data.detailid;
          this.detailperusahaanid = response.data.data.detailperusahaanid;
          this.detailkuotapria = response.data.data.detailkuotapria;
          this.detailkuotawanita = response.data.data.detailkuotawanita;
          this.detailkuotapriawanita = response.data.data.detailkuotapriawanita;
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
    async editDok(id = null) {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `dokumenakademik/` + id,
        })
        .then((response) => {
          console.clear();
          console.log(response.data.data);
          this.akdidx = response.data.data.akdidx;
          this.akdperusahaanid = response.data.data.akdperusahaanid;
          // alert(this.akdperusahaanid)
          this.akddokumenid = response.data.data.akddokumenid;
          this.akddokumenfiles = response.data.data.akddokumenfiles;
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
    update: async function () {
      let token = localStorage.getItem("token");
      // this.filedata = $('#perusahaanlogo').prop('files')[0];
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("detailkuotaidx", this.id);
      this.formdata.append("detailperusahaanid", this.detailperusahaanid);
      this.formdata.append("detailkuotapria", this.detailkuotapria);
      this.formdata.append("detailkuotawanita", this.detailkuotawanita);
      this.formdata.append("detailkuotapriawanita", this.detailkuotapriawanita);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `kuotadetail/` + this.detailid,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.getData();
            this.resetForm();
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
          text: "Anda akan menghapus data Jenis Kuota!",
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
                url: `kuotadetail/` + id,
              })
              .then((response) => {
                console.log(response.data);

                if (response.data.code == 200) {
                  this.$swal.fire({
                    title: "Deleted!",
                    text: "Data anda berhasil diapus",
                    icon: "success",
                  });
                  this.getDetailPerusahaan();
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
    hapusDok: async function (id) {
      this.$swal
        .fire({
          title: "Apakah anda yakin?",
          text: "Anda akan menghapus data dokumen ini!",
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
                url: `dokumenakademik/` + id,
              })
              .then((response) => {
                console.log(response.data);

                if (response.data.code == 200) {
                  this.$swal.fire({
                    title: "Deleted!",
                    text: "Data anda berhasil diapus",
                    icon: "success",
                  });
                  this.getDetailDokumen();
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
