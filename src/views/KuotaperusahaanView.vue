<template>
  <!-- <h3 v-if="isLogin">Detail Kuota</h3>
  <h3 v-else>Anda belum login</h3> -->
  <div class="kotak" v-if="isLogin">
    <h3>Info Kuota</h3>
    <b-row class="mt-0">
      <b-col cols="12" lg="3">
        <fieldset class="menu-border">
          <legend class="menu-border">Informasi Kuota</legend>
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
        </fieldset>
      </b-col>
      <b-col cols="12" lg="9">
        <b-tabs content-class="mt-3" lazy>
          <b-tab title="List Perusahaan">
            <div>
              <b-row>
                <b-col>
                  <fieldset class="menu-border">
                    <legend class="menu-border">List Data Perusahaan</legend>
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

                              <b-button squared variant="primary" disabled v-if="isLoadingBtn">
                                <b-spinner small type="grow"></b-spinner> Loading...
                              </b-button>
                              <b-button
                                squared
                                variant="success"
                                @click="simpan()"
                                v-else
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
                          <tbody v-if="isLoading">
                            <tr>
                              <td colspan="6" class="text-center">
                                <b-spinner small type="grow"></b-spinner>
                                Loading...
                              </td>
                            </tr>
                          </tbody>
                          <tbody v-else>
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
                  </fieldset>
                </b-col>
              </b-row>
            </div>
          </b-tab>
          <b-tab title="Upload surat balasan dari perusahaan">
            <b-form id="form2">
              <b-row>
                <b-col cols="4">
                  <fieldset class="menu-border">
                    <legend class="menu-border">Form</legend>
                    <b-form-group
                      id="input-group-1"
                      label="Industri"
                      label-for="Prodi"
                      class="mt-2"
                    >
                      <b-form-select
                        v-model="balasanperusahaanidx"
                        :options="items"
                        value-field="perusahaanid"
                        text-field="perusahaannama"
                        @change="getListMahasiswa"
                      ></b-form-select>
                    </b-form-group>
                    <b-form-group
                      id="input-group-1"
                      label="Dokumen"
                      label-for="dokumen"
                      class="mt-2"
                    >
                      <b-form-file
                        v-model="balasanfiles"
                        :state="Boolean(balasanfiles)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                      ></b-form-file>
                    </b-form-group>
                  </fieldset>
                  <fieldset class="menu-border">
                    <legend class="menu-border">
                      List mahasiswa yang diterima magang
                    </legend>
                    <div
                      v-for="item in listdatamahasiswa"
                      :key="item.registerid"
                    >
                      <input
                        type="checkbox"
                        :id="item.registernobp"
                        :value="item.registernobp"
                        name="balasanmhsnobp[]"
                        v-model="pilihmahasiswa"
                      />
                      <label :for="item.registermhsnama">
                        <b>{{ item.registermhsnama }}</b></label
                      ><br />
                    </div>
                  </fieldset>
                  <div v-if="isLoadingBtn">
                    <b-button squared variant="primary" disabled>
                      <b-spinner small type="grow"></b-spinner> Loading...
                    </b-button>
                  </div>
                  <b-button
                    squared
                    block
                    variant="primary"
                    @click="simpanBalasan()"
                    v-else
                    ><b-icon icon="save"></b-icon> Simpan Balasan</b-button
                  >
                </b-col>
                <b-col cols="8">
                  <fieldset class="menu-border">
                    <legend class="menu-border">List Dokumen Balasan</legend>
                    <table
                      class="table table-bordered table-striped table-hover"
                      style="padding: 10px"
                    >
                      <tr>
                        <td>No</td>
                        <td>Nama Perusahaan</td>
                        <td>Nama Mahasiswa</td>
                        <td>Download</td>
                        <td>#</td>
                      </tr>
                      <tbody v-if="isLoading">
                        <tr>
                          <td colspan="5" class="text-center">
                            <b-spinner small type="grow"></b-spinner> Loading...
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                      <tr
                        v-for="(item, index) in listdokumenbalasan"
                        :key="item.akdidx"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.perusahaannama }}</td>
                        <td>{{ item.mahasiswa }}</td>
                        <td>
                          <a
                            :href="endpoint + item.balasanfiles"
                            class="btn btn-danger rounded-0"
                            v-if="item.balasanfiles"
                            target="_blank"
                            ><b-icon icon="eye"></b-icon> Lihat</a
                          >
                          <b-button squared variant="danger" v-else
                            ><b-icon icon="upload"></b-icon> Belum
                            Upload</b-button
                          >
                        </td>
                        <td>
                          <b-button-group size="sm">
                            <b-button
                              squared
                              variant="warning"
                              @click="editBalasan(item.balasanidx)"
                              ><b-icon icon="pencil"></b-icon
                            ></b-button>
                            <b-button
                              squared
                              variant="danger"
                              @click="hapusBalasan(item.balasanidx)"
                              ><b-icon icon="trash2"></b-icon
                            ></b-button>
                          </b-button-group>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </fieldset>
                </b-col>
              </b-row>
            </b-form>
          </b-tab>
          <b-tab title="List Dokumen Perusahaan">
            <fieldset class="menu-border">
              <legend class="menu-border">Dokumen Perusahaan</legend>
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
                        <b-button squared variant="primary" v-if="isLoadingBtn" disabled>
                          <b-spinner small type="grow"></b-spinner> Loading...
                        </b-button>
                        <b-button
                          squared
                          variant="success"
                          @click="simpanDok()"
                          v-else
                        >
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
                <tbody v-if="isLoading">
                  <tr>
                    <td colspan="5" class="text-center">
                      <b-spinner small type="grow"></b-spinner> Loading...
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
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
                </tbody>
                
              </table>
            </fieldset>
          </b-tab>
          <b-tab title="Jadwal Magang">
            <fieldset class="menu-border">
              <legend class="menu-border">Dokumen Perusahaan</legend>
              <b-form id="form2">
                <b-row>
                  <b-col cols="4">
                    <fieldset class="menu-border">
                      <legend class="menu-border">Form</legend>
                      <b-form-group
                        id="input-group-1"
                        label="Industri"
                        label-for="Prodi"
                        class="mt-2"
                      >
                        <b-form-select
                          v-model="jadwalperusahaanid"
                          :options="items"
                          value-field="perusahaanid"
                          text-field="perusahaannama"
                        ></b-form-select>
                      </b-form-group>
                      <b-form-group
                        id="input-group-1"
                        label="Mulai"
                        label-for="jadwalmulai"
                        class="mt-2"
                      >
                        <b-form-datepicker
                          id="jadwalmulai"
                          size="sm"
                          v-model="jadwalmulai"
                          locale="id"
                          class="mb-2"
                        ></b-form-datepicker>
                      </b-form-group>
                      <b-form-group
                        id="input-group-1"
                        label="Selesai"
                        label-for="jadwalselesai"
                        class="mt-2"
                      >
                        <b-form-datepicker
                          id="jadwalselesai"
                          size="sm"
                          v-model="jadwalselesai"
                          locale="id"
                          class="mb-2"
                        ></b-form-datepicker>
                      </b-form-group>
                    </fieldset>
                    <b-button squared variant="primary" v-if="isLoadingBtn" disabled>
                          <b-spinner small type="grow"></b-spinner> Loading...
                        </b-button>
                    <b-button
                      squared
                      block
                      variant="primary"
                      @click="simpanJadwal()"
                      v-else
                      ><b-icon icon="save"></b-icon> Simpan Jadwal</b-button
                    >
                  </b-col>
                  <b-col cols="8">
                    <fieldset class="menu-border">
                      <legend class="menu-border">List Jadwal Magang</legend>
                      <table
                        class="table table-bordered table-striped table-hover"
                        style="padding: 10px"
                      >
                      
                        <tr>
                          <td>No</td>
                          <td>Nama Perusahaan</td>
                          <td>Mulai</td>
                          <td>Selesai</td>
                          <td>#</td>
                        </tr>
                        <tbody v-if="isLoading">
                        <tr>
                          <td colspan="5" class="text-center">
                            <b-spinner small type="grow"></b-spinner> Loading...
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr
                          v-for="(item, index) in listjadwal"
                          :key="item.akdidx"
                        >
                          <td>{{ index + 1 }}</td>
                          <td>{{ item.perusahaannama }}</td>
                          <td>{{ item.jadwalmulai }}</td>
                          <td>{{ item.jadwalselesai }}</td>
                          <td>
                            <b-button-group size="sm">
                              <b-button
                                squared
                                variant="warning"
                                @click="editJadwal(item.jadwalid)"
                                ><b-icon icon="pencil"></b-icon
                              ></b-button>
                              <b-button
                                squared
                                variant="danger"
                                @click="hapusJadwal(item.jadwalid)"
                                ><b-icon icon="trash2"></b-icon
                              ></b-button>
                            </b-button-group>
                          </td>
                        </tr>
                      </tbody>
                        
                      </table>
                    </fieldset>
                  </b-col>
                </b-row>
              </b-form>
            </fieldset>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </div>

  <div v-else>
    <div class="kotak">
      <h3 class="text-center">
        Anda Belum Login Ya {{ isLogin }}<br />
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
      isLoading: false,
      isLoadingBtn: false,
      isLogin: localStorage.getItem("isLogin"),
      id: 0,
      kuota: null,
      listperusahaan: null,
      detailid: "",
      detailperusahaanid: "",
      detailkuotapria: "",
      detailkuotawanita: "",
      detailkuotapriawanita: "",
      akdidx: "",
      akdkuotaid: "",
      akddokumenid: "",
      akdperusahaanid: "",
      dokumenakademik: "",
      akddokumenfiles: null,
      items: null,
      dokumens: null,
      balasan: null,
      balasanidx: "",
      balasanperusahaanidx: "",
      balasanfiles: null,
      jadwalid:'',
      jadwalperusahaanid:'',
      jadwalmulai:'',
      jadwalselesai:'',
      listdokumen: null,
      listdokumenbalasan: null,
      listjadwal: null,
      listdatamahasiswa: null,
      pilihmahasiswa: [],
      endpoint: process.env.VUE_APP_BASE_URL,
    };
  },
  mounted() {
    // this.getData(Event, 1);
    // console.clear();
    console.log(this.$route.params.id);
    console.log("isLogin : "+this.isLogin);
    console.log("sudahLogin : "+this.sudahLogin);
    console.log("isLogin Storage: "+localStorage.getItem("isLogin"));
    
    this.id = this.$route.params.id;
    // alert(this.id)
    this.isLogin = localStorage.getItem("isLogin");
    // alert(this.isLogin)
    this.sudahLogin = localStorage.getItem("isLogin");
    this.kuotaById();
    console.log("Kuota : " + this.kuota);
    this.getListPerusahaan();
    this.getListDokumen();
    this.getDetailPerusahaan();
    this.getDetailDokumen();
    this.getListJadwal();
    // alert(localStorage.getItem("isLogin"))
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
            this.getListDokumenBalasan();
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
    async getListJadwal() {
      this.isLoading = true;
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `all/jadwal/` + this.id,
        })
        .then((response) => {
          console.log(response.data);
          this.isLoading = false;
          if (response.data.code == 200) {
            this.listjadwal = response.data.data;
          } else {
            this.listjadwal = null;
            // this.$swal.fire({
            //   title: "Error!",
            //   text: response.data.message,
            //   icon: "warning",
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
    async getListMahasiswa() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url:
            `listmahasiswa/` +
            this.kuota.kuotaidx +
            `/` +
            this.balasanperusahaanidx,
        })
        .then((response) => {
          console.log(response.data);
          this.listdatamahasiswa = response.data.data;
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
    async getListDokumenBalasan() {
      this.isLoading = true;
      let token = localStorage.getItem("token");
      // alert("list dokumen")
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `listdokumenbalasan/` + this.kuota.kuotaidx,
        })
        .then((response) => {
          this.isLoading = false;
          console.log(response.data);
          if (response.data.code == 200) {
            this.listdokumenbalasan = response.data.data;
          } else {
            this.listdokumenbalasan = [];
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
      this.isLoadingBtn = true;
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
      // return false;
      // alert(this.detailid);
      // return false;
      var url = this.detailid ? `kuotadetail/` + this.detailid : `kuotadetail`;
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: url,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          this.isLoadingBtn = false;
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
          this.isLoadingBtn = false;
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    simpanDok: async function () {
      this.isLoadingBtn = true;
      let token = localStorage.getItem("token");
      // this.filedata = $('#perusahaanlogo').prop('files')[0];
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("akdkuotaid", this.id);
      this.formdata.append("akdperusahaanid", this.akdperusahaanid);
      this.formdata.append("akddokumenid", this.akddokumenid);
      this.formdata.append("akddokumenfiles", this.akddokumenfiles);
      // // console.clear();
      console.log(this.formdata);
      var url = this.akdidx
        ? `simpandokumenakademik/` + this.akdidx
        : `simpandokumenakademik`;
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: url,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          this.isLoadingBtn = false;
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
    simpanBalasan: async function () {
      this.isLoadingBtn = true;
      let token = localStorage.getItem("token");
      // this.filedata = $('#perusahaanlogo').prop('files')[0];
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("balasankuotaidx", this.kuota.kuotaidx);
      this.formdata.append("balasanperusahaanidx", this.balasanperusahaanidx);
      this.formdata.append("balasanfiles", this.baslasanfiles);
      this.formdata.append("pilihmahasiswa", this.pilihmahasiswa);
      console.log(this.formdata);
      var url = this.balasanidx
        ? `dokumenbalasan/` + this.balasanidx
        : `dokumenbalasan`;
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: url,
          data: this.formdata,
        })
        .then((response) => {
          this.isLoadingBtn = false;
          console.log(response.data);
          if (response.data.code == 201) {
            this.getListDokumenBalasan();
            this.balasanperusahaanidx = null;
            this.balasanfiles = null;
            this.balasanidx = "";
            this.pilihmahasiswa = [];
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
    simpanJadwal: async function () {
      this.isLoadingBtn = true;
      let token = localStorage.getItem("token");
      // this.filedata = $('#perusahaanlogo').prop('files')[0];
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("jadwalkuotaidx", this.kuota.kuotaidx);
      this.formdata.append("jadwalperusahaanid", this.jadwalperusahaanid);
      this.formdata.append("jadwalmulai", this.jadwalmulai);
      this.formdata.append("jadwalselesai", this.jadwalselesai);
      console.log(this.formdata);
      var url = this.jadwalid ? `jadwal/` + this.jadwalid : `jadwal`;
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: url,
          data: this.formdata,
        })
        .then((response) => {
          this.isLoadingBtn = false;
          console.log(response.data);
          if (response.data.code == 201 || response.data.code == 200) {
            this.jadwalperusahaanid = null;
            this.jadwalmulai = null;
            this.jadwalid = "";
            this.jadwalselesai = "";
            this.getListJadwal();
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
      this.isLoading = true;
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
          // // console.clear();
          console.log(response.data.data);
          this.items = response.data.data;
          this.isLoading = false;
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
      this.isLoading = true;
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
          // // console.clear();
          console.log(response.data.data);
          this.dokumens = response.data.data;
          this.isLoading = false;
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
          // // console.clear();
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
          // console.clear();
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
    async editBalasan(id = null) {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `dokumenbalasan/` + id,
        })
        .then((response) => {
          // console.clear();
          console.log(response.data.data);
          this.balasanidx = response.data.data.balasanidx;
          this.balasanperusahaanidx = response.data.data.balasanperusahaanidx;
          this.getListMahasiswa();
          this.pilihmahasiswa = response.data.data.pilihanmahasiswa;
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
    async editJadwal(id = null) {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `jadwal/` + id,
        })
        .then((response) => {
          // console.clear();
          console.log(response.data.data);
          this.jadwalid = response.data.data.jadwalid;
          this.jadwalperusahaanid = response.data.data.jadwalperusahaanid;
          this.jadwalkuotaidx = response.data.data.jadwalkuotaidx;
          this.jadwalmulai = response.data.data.jadwalmulai;
          this.jadwalselesai = response.data.data.jadwalselesai;
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
      this.isLoadingBtn = true;
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
          this.isLoadingBtn = false;
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
    hapusBalasan: async function (id) {
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
                url: `dokumenbalasan/` + id,
              })
              .then((response) => {
                console.log(response.data);

                if (response.data.code == 200) {
                  this.$swal.fire({
                    title: "Deleted!",
                    text: "Data anda berhasil diapus",
                    icon: "success",
                  });
                  this.getListDokumenBalasan();
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
    hapusJadwal: async function (id) {
      this.$swal
        .fire({
          title: "Apakah anda yakin?",
          text: "Anda akan menghapus jadwal magang!",
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
                url: `jadwal/` + id,
              })
              .then((response) => {
                console.log(response.data);

                if (response.data.code == 200) {
                  this.$swal.fire({
                    title: "Deleted!",
                    text: "Data anda berhasil diapus",
                    icon: "success",
                  });
                  this.getListJadwal();
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
