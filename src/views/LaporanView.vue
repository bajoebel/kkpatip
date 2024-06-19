<template>
  <b-row>
    <b-col cols="12" lg="4">
      <fieldset class="menu-border" style="margin-top:10px;">
        <legend class="menu-border">Profile Mahasiswa</legend>
        <b-img
          center
          rounded="circle"
          src="http://localhost:8081/img/male.png"
          alt="Center image"
          class="w150"
          v-if="mhsjkl == 'L'"
        ></b-img>
        <b-img
          center
          rounded="circle"
          src="http://localhost:8081/img/female.png"
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
            <td class="w175">NIK {{ mhsjkl }}</td>
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
          <tr>
            <td>Total SKS</td>
            <td>: {{ totalsks }}</td>
          </tr>
          <tr>
            <td>Total Gagal</td>
            <td>: {{ nilai_d_e }}</td>
          </tr>
        </table>
        
      </fieldset>
    </b-col>
    <b-col cols="12" lg="8">
      <div class="kotak">
        <!-- Tabs with card integration -->
        <b-tabs pills content-class="mt-3" lazy>
          <b-tab title="Input Laporan Mingguan">
            <!-- <b-row>Kuota Aktif {{ kuotaaktif }}</b-row> -->
            <b-row>
              <b-col>
                <fieldset class="menu-border">
                  <legend class="menu-border">Form Laporan Mingguan</legend>
                  <b-row>
                    <b-col>
                      <b-form-select
                          v-model="tahun"
                          :options="listtahun"
                          value-field="tahun"
                          text-field="tahun"
                        ></b-form-select>
                    </b-col>
                    <b-col>
                      <b-form-select
                          v-model="bulan"
                          :options="listbulan"
                          value-field="bulan"
                          text-field="bulan"
                        ></b-form-select>
                    </b-col>
                    <b-col>
                      <b-form-select
                          v-model="minggu"
                          :options="listminggu"
                          value-field="minggu"
                          text-field="minggu"
                        ></b-form-select>
                    </b-col>
                  </b-row>
                </fieldset>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Hasil Validasi Laporan Mingguan Oleh Dosen">
            <b-row>
              <b-col>
                <fieldset class="menu-border">
                  <legend class="menu-border">Validasi Laporan</legend>
                </fieldset>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Bimbingan Laporan Akhir Magang">
            <b-row>
              <b-col>
                <fieldset class="menu-border">
                  <legend class="menu-border">Bimbingan laporan akhir magang</legend>
                </fieldset>
              </b-col>
            </b-row>
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
          <!-- <div class="mt-2">
            <b-button
              squared
              type="button"
              @click="uploadDokumen"
              variant="primary"
              v-if="isnew"
              >Upload</b-button
            >
          </div> -->
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
    <b-modal id="bv-modal-perusahaan" size="lg" hide-footer>
      <template #modal-title> Cari Perusahaan</template>
      <div class="d-block">
        <b-row>
          <b-col>
            <b-input-group>
              <b-form-input
                v-model="keyword"
                @keyup="tampilListPerusahaan()"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  squared
                  variant="success"
                  @click="tampilListPerusahaan()"
                  >Cari</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
        <hr />
        <table responsive class="table b-table table-striped table-hover">
          <thead>
            <tr>
              <td>No</td>
              <td>Nama Perusahaan</td>
              <td>Alamat Perusahaan</td>
              <td>Email Perusahaan</td>
              <td>Telp</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in listperusahaan"
              :key="item.perusahaanid"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.perusahaannama }}</td>
              <td>{{ item.perusahaanalamat }}</td>
              <td>{{ item.perusahaanemail }}</td>
              <td>{{ item.perusahaantelp }}</td>
              <td>
                <b-button
                  squared
                  variant="warning"
                  @click="pilihPerusahaan(item.perusahaanid)"
                  ><b-icon icon="check"></b-icon
                ></b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-modal>
  </b-row>
</template>
<script>
import axios from "axios";
export default {
  name: "ProfileMahasiswa",
  data() {
    return {
      isnew: true,
      show: true,
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
      files: null,
      jenisdokumen: "",
      listperusahaan: "",
      keyword: "",
      perusahaanid: "",
      perusahaannama: "",
      perusahaanalamat: "",
      perusahaannotelp: "",
      dokumenbalasan: null,
      tahun:"",
      bulan:"",
      minggu:"",
      listtahun:"",
      listbulan:"",
      listminggu:"",
      endpoint: process.env.VUE_APP_BASE_URL,
    };
  },
  mounted() {
    console.clear();
    console.log("Profile is inisialize...");
    this.profile();
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
          url: `mahasiswa/info`,
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
          this.getTahun();
          if (this.register) {
            // alert(response.data.data.register.dokumenaktif.length)
            this.dokumenbalasan = response.data.data.register.dokumenbalasan;
            if (response.data.data.register.dokumenaktif) {
              this.idjenisdokumen =
                response.data.data.register.dokumenaktif[0].dokumenjenisid;
              if (this.idjenisdokumen == 1)
                this.jenisdokumen = "Dokumen Registrasi";
              else if (this.idjenisdokumen == 2)
                this.jenisdokumen = "Dokumen Konsultasi";
              else if (this.idjenisdokumen == 3)
                this.jenisdokumen = "Dokumen Akademik";
              else if (this.idjenisdokumen == 4)
                this.jenisdokumen = "Dokumen Keberangkatan";
              // alert(response.data.data.register.dokumenaktif[0].dokumenjenisid)
            }
          }

          this.config = response.data.data.config;
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
    async getTahun() {
      let token = localStorage.getItem("token");
      // alert('Kuota aktif')
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `jadwal/tahun/` + this.register.registerkuotaid,
        })
        .then((response) => {
          // console.clear();
          // console.log(response.data.data);

          if (response.data.code == 200) {
            this.kuotaaktif = response.data.data;
            this.kuotadetail = response.data.data.perusahaan;
          } else {
            this.kuotaaktif = null;
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
    async tampilListPerusahaan() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `perusahaan?page=20&keyword=` + this.keyword,
        })
        .then((response) => {
          // console.clear();
          // console.log(response.data.data);
          if (response.data.code == 200) {
            this.listperusahaan = response.data.data;
          } else {
            this.listperusahaan = null;
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
    async cariPerusahaan() {
      this.$bvModal.show("bv-modal-perusahaan");
      this.tampilListPerusahaan();
    },
    async upload(dokumenid, registerid, dokumentipe) {
      console.clear();
      console.log(dokumenid);
      console.log(registerid);
      // alert(dokumentipe)
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
    resetPerusahaan() {
      this.perusahaanid = "";
      this.perusahaannama = "";
      this.perusahaanalamat = "";
      this.perusahaannotelp = "";
      this.perusahaanemail = "";
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
    pilih: async function (perusahaanid, perusahaannama) {
      let token = localStorage.getItem("token");
      this.$swal
        .fire({
          title: "Apakah anda yakin?",
          text: "Anda memilih perusahaan " + perusahaannama + " Untuk magang",
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
              registerkuotaid: this.kuotaaktif.kuotaidx,
              registerperusahaanid: perusahaanid,
              registernamaperusahaan: perusahaannama,
              registernobp: this.mhsnobp,
              registermhsnama: this.mhsnama,
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
                url: `register`,
                data: this.formdata,
              })
              .then((response) => {
                console.log(response.data);
                if (response.data.code == 201) {
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
    daftarMandiri: async function () {
      let token = localStorage.getItem("token");
      this.$swal
        .fire({
          title: "Apakah anda yakin?",
          text:
            "Anda memilih perusahaan " + this.perusahaannama + " Untuk magang",
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
              registerkuotaid: this.kuotaaktif.kuotaidx,
              perusahaanid: this.perusahaanid,
              perusahaannama: this.perusahaannama,
              perusahaanalamat: this.perusahaanalamat,
              perusahaannotelp: this.perusahaannotelp,
              perusahaanemail: this.perusahaanemail,
              registernobp: this.mhsnobp,
              registermhsnama: this.mhsnama,
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
                url: `register/mandiri`,
                data: this.formdata,
              })
              .then((response) => {
                console.log(response.data);
                if (response.data.code == 201) {
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

    hapus: async function (id) {
      this.$swal
        .fire({
          title: "Apakah anda yakin?",
          text: "Anda akan menghapus data Jenis Kuota!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, Tolong Hapus!",
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
    async pilihPerusahaan(id) {
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
            this.perusahaanid = response.data.data.perusahaanid;
            this.perusahaannama = response.data.data.perusahaannama;
            this.perusahaanalamat = response.data.data.perusahaanalamat;
            this.perusahaanemail = response.data.data.perusahaanemail;
            this.perusahaannotelp = response.data.data.perusahaannotelp;
            this.$bvModal.hide("bv-modal-perusahaan");
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
  },
};
</script>
<style lang="scss">
fieldset.menu-border {
  border: 1px solid #ccc !important;
  border-radius: 15px 15px 0px 0px;
  min-height: 100px;
  padding: 10px;
}
legend.menu-border {
  font-family: cursive;
  float: none;
  width: auto;
  font-size: 1.2em !important;
  font-weight: bold !important;
  text-align: left !important;
  width: auto;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin-left: 10px;
  background: linear-gradient(
    90deg,
    rgb(65, 65, 219) 0%,
    rgb(66, 53, 66) 35%,
    rgb(65, 65, 219) 100%
  );
  color: #ccc;
}
</style>
