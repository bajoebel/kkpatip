<template>
  <b-row>
    <b-col cols="12" lg="4">
      <div class="kotak">
        <h3 class="text-center">Profile Mahasiswa</h3>
        <b-img
          center
          rounded="circle"
          src="https://kkp.poltekatipdg.ac.id/img/male.png"
          alt="Center image"
          class="w150"
          v-if="mhsjkl == 'L'"
        ></b-img>
        <b-img
          center
          rounded="circle"
          src="https://kkp.poltekatipdg.ac.id/img/female.png"
          alt="Center image"
          class="w150"
          v-else
        ></b-img>
        <h4 class="text-center">
          <b-icon icon="arrow-left"></b-icon> {{ mhsnama }}
          <b-icon icon="arrow-right"></b-icon>
        </h4>
        <p class="text-center">({{ mhsnobp }})</p>
        <hr />
        <table class="table table-striped">
          <tr>
            <td class="w175">NIK</td>
            <td>: {{ mhsnik }}</td>
          </tr>
          <tr>
            <td>Alamat</td>
            <td>: {{ mhsalamat }}</td>
          </tr>
          <tr>
            <td>No Telp</td>
            <td>: {{ mhstelp }}</td>
          </tr>
          <tr>
            <td>Tempat / Tgl Lahir</td>
            <td>: {{ mhstmplhr + " " + mhstgllhr }}</td>
          </tr>
          <tr>
            <td>Prodi</td>
            <td>: {{ prodinama }}</td>
          </tr>

          <tr>
            <td>Angkatan</td>
            <td>: {{ mhsangkatan }}</td>
          </tr>
          <tr v-if="register">
            <td>Perusahaan</td>
            <td>: {{ register.registernamaperusahaan }}</td>
          </tr>
          <tr>
            <td>Total SKS</td>
            <td>: {{ totalsks }}</td>
          </tr>
          <tr>
            <td>Total Gagal</td>
            <td>: {{ nilai_d_e }}</td>
          </tr>
          <tr>
            <td>Status Saat Ini</td>
            <td v-if="register.registerdisetujui==null"><b>Belum Proses</b></td>
            <td v-else-if="register.registerdisetujui=='1'"><b>Disetujui</b></td>
            <td v-else-if="register.registerdisetujui=='0'"><b>Tidak Disetujui</b></td>
          </tr>
          <tr>
            <td colspan="2">
              <div v-if="islevel=='1'">
                <b-button-group
                  size="sm"
                  v-if="register.registerdisetujui == '1'"
                >
                  <b-button
                    squared
                    variant="warning"
                    @click="resetStatus(register.registerid)"
                    ><b-icon icon="check"></b-icon> Reset Status</b-button
                  >
                  <b-button
                    squared
                    variant="danger"
                    @click="batalSetujui(register.registerid)"
                    ><b-icon icon="check"></b-icon> Tidak Setuju</b-button
                  >
                </b-button-group>
                <b-button-group
                  size="sm"
                  v-else-if="register.registerdisetujui == '0'"
                >
                  <b-button
                    squared
                    variant="warning"
                    @click="resetStatus(register.registerid)"
                    ><b-icon icon="check"></b-icon> Reset Status</b-button
                  >
                  <b-button
                    squared
                    variant="success"
                    @click="setujui(register.registerid)"
                    ><b-icon icon="check"></b-icon>Setuju</b-button
                  >
                </b-button-group>
                <b-button-group size="sm" v-else>
                  <b-button
                    squared
                    variant="success"
                    @click="setujui(register.registerid)"
                    ><b-icon icon="check"></b-icon>Setuju</b-button
                  >
                  <b-button
                    squared
                    variant="danger"
                    @click="batalSetujui(register.registerid)"
                    ><b-icon icon="check"></b-icon>Tidak Setuju</b-button
                  >
                </b-button-group>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </b-col>
    <b-col cols="12" lg="8">
      <div class="kotak">
        <b-tabs content-class="mt-3" lazy>
          <b-tab title="Dosen Pembimbing">
            <div v-if="register.pembimbing == null">
              <h3>Masukkan dosen pembimbing</h3>
              <b-form id="form1">
                <b-row>
                  <b-col cols="11">
                    <vSelect
                    v-model="dosenid"
                    :options="listdosen"
                    label="dosennama"
                    :reduce="dosen => dosen.dosenid"
                    class="w-100"
                  ></vSelect>
                  </b-col>
                  <b-col>
                    <b-button
                      squared
                      variant="success"
                      class="btn-sm"
                      @click="simpanPembimbing()"
                    >
                      <b-icon icon="save"></b-icon>
                    </b-button>
                  </b-col>
                </b-row>
                
                <!-- <b-input-group>
                  <b-form-select
                    v-model="dosenid"
                    :options="listdosen"
                    value-field="dosenid"
                    text-field="dosennama"
                    class="form-control"
                  ></b-form-select>
                  <vSelect
                    v-model="dosenid"
                    :options="listdosen"
                    label="dosennama"
                    :reduce="dosen => dosen.dosenid"
                    class="w-100"
                  >
                  </vSelect>

                  <b-input-group-append>
                    
                  </b-input-group-append>
                </b-input-group> -->
                <!-- <b-input-group>
                  <b-form-select v-model="dosenid" :options="listdosen" value-field="dosenid" text-field="dosennama" class="mt-3 form-control"></b-form-select>
                  <b-input-group-btn>
                    <b-button squared variant="success" @click="setDosen">Set Dosen</b-button>
                  </b-input-group-btn>
                </b-input-group> -->
              </b-form>
            </div>
            <div v-else>
              <b-row>
                <b-col>
                  <table class="table table-striped">
                    <tr>
                      <th class="w200">KODE DOSEN</th>
                      <td>
                        : {{ register.pembimbing.pembimbingdosenid }}
                        <button
                          type="button"
                          @click="
                            hapusPembimbing(register.pembimbing.pembimbingid)
                          "
                          class="btn btn-danger btn-sm rounded-pill"
                        >
                          <b-icon icon="person-x-fill"></b-icon>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th>NAMA DOSEN</th>
                      <td>: {{ register.pembimbing.pembimbingdosennama }}</td>
                    </tr>
                  </table>
                </b-col>
              </b-row>
            </div>
          </b-tab>
          <b-tab
            title="Lihat Dokumen Register"
            v-if="register.dokumenregister.length > 0"
          >
            <table responsive class="table b-table table-striped table-hover">
              <tr>
                <th class="w50">No</th>
                <th>Nama Dokumen</th>
                <th>Aksi</th>
              </tr>
              <tr
                v-for="(item, index) in register.dokumenregister"
                :key="item.dokumenid"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  {{ item.dokumennama + " (File : " + item.dokumentipe + ")" }}
                </td>
                <td>
                  <b-button-group size="sm" v-if="islevel=='1'">
                    <!-- <b-button
                      squared
                      variant="warning"
                      @click="isValid(item.idx, item.dokumenjenisid)"
                      v-if="item.status != '1' && item.files"
                      ><b-icon icon="check"></b-icon> Belum Divalidasi</b-button
                    >
                    <b-button
                      squared
                      variant="success"
                      v-else
                      @click="unValid(item.idx, item.dokumenjenisid)"
                      ><b-icon icon="check"></b-icon> Sudah Divalidasi</b-button
                    > -->
                    <b-button
                      squared
                      variant="warning"
                      @click="isValid(item.idx, item.dokumenjenisid)"
                      v-if="item.status != '1' && item.files"
                      ><b-icon icon="check"></b-icon> Belum Divalidasi
                    </b-button>
                    <b-button
                      squared
                      variant="success"
                      v-else-if="item.status == '1' && item.files"
                      @click="unValid(item.idx, item.dokumenjenisid)"
                      ><b-icon icon="check"></b-icon> Sudah Divalidasi</b-button
                    >
                    <a
                      :href="endpoint + item.files"
                      class="btn btn-danger rounded-0"
                      v-if="item.files"
                      target="_blank"
                      ><b-icon icon="eye"></b-icon> Lihat</a
                    >
                    <b-button squared variant="danger" v-else
                      ><b-icon icon="upload"></b-icon> Belum Upload</b-button
                    >
                  </b-button-group>
                  <b-button-group size="sm" v-else>
                    
                    <b-button
                      squared
                      variant="warning"
                      v-if="item.status != '1' && item.files"
                      ><b-icon icon="check"></b-icon> Belum Divalidasi
                    </b-button>
                    <b-button
                      squared
                      variant="success"
                      v-else-if="item.status == '1' && item.files"
                      ><b-icon icon="check"></b-icon> Sudah Divalidasi</b-button
                    >
                    <a
                      :href="endpoint + item.files"
                      class="btn btn-danger rounded-0"
                      v-if="item.files"
                      target="_blank"
                      ><b-icon icon="eye"></b-icon> Lihat</a
                    >
                    <b-button squared variant="danger" v-else
                      ><b-icon icon="upload"></b-icon> Belum Upload</b-button
                    >
                  </b-button-group>
                </td>
              </tr>
            </table>
          </b-tab>
          
          <b-tab
            title="Lihat Dokumen Konsultasi"
            v-if="register.dokumenkonsultasi.length > 0"
          >
            <table responsive class="table b-table table-striped table-hover">
              <tr>
                <th class="w50">No</th>
                <th>Nama Dokumen</th>
                <th>Aksi</th>
              </tr>
              <tr
                v-for="(item, index) in register.dokumenkonsultasi"
                :key="item.dokumenid"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  {{ item.dokumennama + " (File : " + item.dokumentipe + ")" }}
                </td>
                <td>
                  <b-button-group size="sm" v-if="islevel=='1'">
                    <b-button
                      squared
                      variant="warning"
                      @click="isValid(item.idx, item.dokumenjenisid)"
                      v-if="item.status != '1' && item.files"
                      ><b-icon icon="check"></b-icon> Belum Divalidasi
                    </b-button>
                    <b-button
                      squared
                      variant="success"
                      v-else-if="item.status == '1' && item.files"
                      @click="unValid(item.idx, item.dokumenjenisid)"
                      ><b-icon icon="check"></b-icon> Sudah Divalidasi</b-button
                    >
                    <a
                      :href="endpoint + item.files"
                      class="btn btn-danger rounded-0"
                      v-if="item.files"
                      target="_blank"
                      ><b-icon icon="eye"></b-icon> Lihat</a
                    >
                    <b-button squared variant="danger" v-else
                      ><b-icon icon="upload"></b-icon> Belum Upload</b-button
                    >
                  </b-button-group>
                  <b-button-group size="sm" v-else>
                    <b-button
                      squared
                      variant="warning"
                      v-if="item.status != '1' && item.files"
                      ><b-icon icon="check"></b-icon> Belum Divalidasi
                    </b-button>
                    <b-button
                      squared
                      variant="success"
                      v-else-if="item.status == '1' && item.files"
                      ><b-icon icon="check"></b-icon> Sudah Divalidasi</b-button
                    >
                    <a
                      :href="endpoint + item.files"
                      class="btn btn-danger rounded-0"
                      v-if="item.files"
                      target="_blank"
                      ><b-icon icon="eye"></b-icon> Lihat</a
                    >
                    <b-button squared variant="danger" v-else
                      ><b-icon icon="upload"></b-icon> Belum Upload</b-button
                    >
                  </b-button-group>
                </td>
              </tr>
            </table>
          </b-tab>
          <b-tab
            title="Lihat Dokumen Keberangkatan"
            v-if="register.dokumenkeberangkatan.length > 0"
          >
            <table responsive class="table b-table table-striped table-hover">
              <tr>
                <th class="w50">No</th>
                <th>Nama Dokumen</th>
                <th>Aksi</th>
              </tr>
              <tr
                v-for="(item, index) in register.dokumenkeberangkatan"
                :key="item.dokumenid"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  {{ item.dokumennama + " (File : " + item.dokumentipe + ")" }}
                </td>
                <td>
                  <b-button-group size="sm" v-if="islevel=='1'">
                    <b-button
                      squared
                      variant="warning"
                      @click="isValid(item.idx, item.dokumenjenisid)"
                      v-if="item.status != '1' && item.files"
                      ><b-icon icon="check"></b-icon> Belum Divalidasi
                    </b-button>
                    <b-button
                      squared
                      variant="success"
                      v-else-if="item.status == '1' && item.files"
                      @click="unValid(item.idx, item.dokumenjenisid)"
                      ><b-icon icon="check"></b-icon> Sudah Divalidasi</b-button
                    >

                    <a
                      :href="endpoint + item.files"
                      class="btn btn-danger rounded-0"
                      v-if="item.files"
                      target="_blank"
                      ><b-icon icon="eye"></b-icon> Lihat</a
                    >
                    <b-button squared variant="danger" v-else
                      ><b-icon icon="upload"></b-icon> Belum Upload</b-button
                    >
                  </b-button-group>
                  <b-button-group size="sm" v-else>
                    <b-button
                      squared
                      variant="warning"
                      v-if="item.status != '1' && item.files"
                      ><b-icon icon="check"></b-icon> Belum Divalidasi
                    </b-button>
                    <b-button
                      squared
                      variant="success"
                      v-else-if="item.status == '1' && item.files"
                      ><b-icon icon="check"></b-icon> Sudah Divalidasi</b-button
                    >

                    <a
                      :href="endpoint + item.files"
                      class="btn btn-danger rounded-0"
                      v-if="item.files"
                      target="_blank"
                      ><b-icon icon="eye"></b-icon> Lihat</a
                    >
                    <b-button squared variant="danger" v-else
                      ><b-icon icon="upload"></b-icon> Belum Upload</b-button
                    >
                  </b-button-group>
                </td>
              </tr>
            </table>
          </b-tab>
        </b-tabs>
      </div>
    </b-col>
    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title> {{ modaltitle }}</template>
      <div class="d-block">
        <b-form id="form">
          <b-form-group
            id="input-group-3"
            label="Files:"
            label-for="files"
            class="mt-2"
          >
            <b-form-file
              v-model="files"
              :state="Boolean(files)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </b-form-group>
          <div class="mt-2">
            <b-button
              squared
              type="button"
              @click="uploadDokumen"
              variant="primary"
              v-if="isnew"
              >Upload</b-button
            >
          </div>
          <div class="mt-2">
            <b-button
              squared
              type="button"
              @click="uploadDokumen"
              variant="primary"
              ><b-icon icon="upload"></b-icon> Upload</b-button
            >
          </div>
        </b-form>
      </div>
    </b-modal>
  </b-row>
</template>
<script>
import axios from "axios";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
// import { is } from "core-js/core/object";
export default {
  name: "RegisterdetailMahasiswa",
  components: {
    vSelect
  },
  data() {
    return {
      isnew: true,
      show: true,
      islevel: '',
      id: "",
      mhsnobp: "",
      mhsnama: "",
      mhsnik: "",
      mhsalamat: "",
      mhstelp: "",
      mhstmplhr: "",
      mhstgllhr: "",
      prodinama: "",
      mhsangkatan: "",
      mhsjkl: "",
      prodiid: "",
      totalsks: "",
      nilai_d_e: "",
      modaltitle: "Upload Dokumen",
      kuotaaktif: null,
      kuotadetail: null,
      allkuota: null,
      config: null,
      rekomendasi: null,
      register: null,
      registerid: "",
      idjenisdokumen: "",
      dokumenid: "",
      dokumentipe: "",
      dokumenaktif: null,
      listdosen: null,
      dosenid: null,
      dosennama: null,
      files: null,
      jenisdokumen: "",
      endpoint: process.env.VUE_APP_BASE_URL,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.profile();
    this.islevel = localStorage.getItem("isLevel");
    // this.kuotaAktif();
    // alert(this.prodiid)
    // this.getDosen();
  },
  methods: {
    async profile() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `register/` + this.id,
        })
        .then((response) => {
          console.log(response.data);
          this.mhsnobp = response.data.data.mhsnobp;
          this.mhsnama = response.data.data.mhsnama;
          this.mhstelp = response.data.data.mhstelp;
          this.mhsalamat = response.data.data.mhsalamat;
          this.prodinama = response.data.data.prodinama;
          this.mhstmplhr = response.data.data.mhstmplhr;
          this.mhstgllhr = response.data.data.mhstgllhr;
          this.mhsangkatan = response.data.data.mhsangkatan;
          this.mhsjkl = response.data.data.mhsjkl;
          this.mhsnik = response.data.data.mhsnik;
          this.totalsks = response.data.data.totalsks;
          this.nilai_d_e = response.data.data.nilai_d_e;
          this.prodiid = response.data.data.mhsprodiid;
          this.rekomendasi = response.data.data.rekomendasi;
          this.register = response.data.data.register;
          this.getDosen();
          // alert(this.prodiid)
          // this.config = response.data.data.config;
          // this.kuotaAktif();
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
    async kuotaAktif() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `kuotaaktif/` + this.prodiid,
        })
        .then((response) => {
          console.clear();
          console.log(response.data.data);
          this.kuotaaktif = response.data.data;
          this.kuotadetail = response.data.data.perusahaan;
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
    async getDosen() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `listdosen/` + this.prodiid,
        })
        .then((response) => {
          console.clear();
          console.log(response.data.data);
          this.listdosen = response.data.data;
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
    async upload(dokumenid, registerid, dokumentipe) {
      console.clear();
      console.log(dokumenid);
      console.log(registerid);
      this.dokumenid = dokumenid;
      this.registerid = registerid;
      this.dokumentipe = dokumentipe;
      this.$bvModal.show("bv-modal-example");
    },
    uploadDokumen: async function () {
      let token = localStorage.getItem("token");
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("dokumenid", this.dokumenid);
      this.formdata.append("registerid", this.registerid);
      this.formdata.append("dokumentipe", this.dokumentipe);
      this.formdata.append("idjenisdokumen", this.idjenisdokumen);
      this.formdata.append("files", this.files);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `uploaddokumen`,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200 || response.data.code == 201) {
            this.profile();
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
    resetForm() {
      this.dokumenid = "";
      this.registerid = "";
      this.files = null;
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
            this.kuotaselesairegistrasi =
              response.data.data.kuotaselesairegistrasi;
            this.kuotaselesaiuploaddokumen =
              response.data.data.kuotaselesaiuploaddokumen;
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
    setujui: async function (registerid) {
      let token = localStorage.getItem("token");
      this.$swal
        .fire({
          title: "Apakah anda yakin?",
          text: "Mahasiswa atas nama "+this.register.registermhsnama+" disetujui untuk magang di "+this.register.registernamaperusahaan+'?',
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya",
          cancelButtonText: "Tidak",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.formdata = {
              registerid: registerid,
              registerdisetujui: 1,
            };
            console.clear();
            console.log(this.formdata);
            axios
              .request({
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ` + token,
                },
                method: "POST",
                url: `register/persetujuan`,
                data: this.formdata,
              })
              .then((response) => {
                console.log(response.data);
                if (response.data.code == 200) {
                  this.profile();
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
    batalSetujui: async function (registerid) {
      let token = localStorage.getItem("token");
      this.$swal
        .fire({
          title: "Apakah anda yakin?",
          text: "Mahasiswa atas nama "+this.register.registermhsnama+" tidak disetujui untuk magang di "+this.register.registernamaperusahaan+'?',
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya",
          cancelButtonText: "Tidak",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.formdata = {
              registerid: registerid,
              registerdisetujui: 0,
            };
            console.clear();
            console.log(this.formdata);
            axios
              .request({
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ` + token,
                },
                method: "POST",
                url: `register/persetujuan`,
                data: this.formdata,
              })
              .then((response) => {
                console.log(response.data);
                if (response.data.code == 200) {
                  this.profile();
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
    resetStatus: async function (registerid) {
      let token = localStorage.getItem("token");
      this.$swal
        .fire({
          title: "Apakah anda yakin?",
          text: "Akn mereset status persetujuan magang mahasiswa atas nama "+this.register.registermhsnama+" untuk perusahaan "+this.register.registernamaperusahaan+'?',
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya",
          cancelButtonText: "Tidak",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.formdata = {
              registerid: registerid,
              registerdisetujui: null,
            };
            console.clear();
            console.log(this.formdata);
            axios
              .request({
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ` + token,
                },
                method: "POST",
                url: `register/persetujuan`,
                data: this.formdata,
              })
              .then((response) => {
                console.log(response.data);
                if (response.data.code == 200) {
                  this.profile();
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
    isValid: async function (idx, idjenis) {
      let token = localStorage.getItem("token");
      // alert(idx);
      this.$swal
        .fire({
          title: "Apakah anda yakin?",
          text: "Dokumen sudah valid",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya",
          cancelButtonText: "Tidak",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.formdata = {
              idx: idx,
              idjenis: idjenis,
              status: 1,
            };
            console.clear();
            console.log(this.formdata);
            axios
              .request({
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ` + token,
                },
                method: "POST",
                url: `register/validasi`,
                data: this.formdata,
              })
              .then((response) => {
                console.log(response.data);
                if (response.data.code == 200) {
                  this.profile();
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
    unValid: async function (idx, idjenis) {
      let token = localStorage.getItem("token");
      this.$swal
        .fire({
          title: "Apakah anda yakin?",
          text: "Membatalkan validasi dokumen",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya",
          cancelButtonText: "Tidak",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.formdata = {
              idx: idx,
              idjenis: idjenis,
              status: 0,
            };
            console.clear();
            console.log(this.formdata);
            axios
              .request({
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ` + token,
                },
                method: "POST",
                url: `register/validasi`,
                data: this.formdata,
              })
              .then((response) => {
                console.log(response.data);
                if (response.data.code == 200) {
                  this.profile();
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
    simpanPembimbing: async function () {
      let token = localStorage.getItem("token");
      // this.filedata = $('#perusahaanlogo').prop('files')[0];
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("pembimbingregisterid", this.register.registerid);
      this.formdata.append("pembimbingdosenid", this.dosenid);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `pembimbing`,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 201) {
            this.profile();
            this.dosenid = "";
            this.dosennama = "";
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
    hapusPembimbing: async function (id) {
      this.$swal
        .fire({
          title: "Apakah anda yakin?",
          text: "Anda akan menghapus data pembimbing!",
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
                url: `pembimbing/` + id,
              })
              .then((response) => {
                console.log(response.data);

                if (response.data.code == 200) {
                  this.$swal.fire({
                    title: "Deleted!",
                    text: "Data anda berhasil diapus",
                    icon: "success",
                  });
                  this.profile();
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
