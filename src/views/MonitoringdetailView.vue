<template>
  <b-row>
    <b-col cols="12" lg="4">
      <fieldset class="menu-border" style="margin-top: 10px">
        <legend class="menu-border">Profile Mahasiswa</legend>
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
          <tr v-if="register">
            <td>Pembimbing</td>
            <td>: {{ register.pembimbing.pembimbingdosennama +'('+register.pembimbing.pembimbingdosenid+')' }}</td>
          </tr>
        </table>
      </fieldset>
    </b-col>
    <b-col cols="12" lg="8">
      <div class="kotak">
        <!-- Tabs with card integration -->
        <b-tabs pills content-class="mt-3" lazy>
          <b-tab title="Laporan Mingguan">
            <!-- <b-row>Kuota Aktif {{ kuotaaktif }}</b-row> -->
            <b-row>
              <b-col>
                <fieldset class="menu-border">
                  <legend class="menu-border">Laporan Mingguan</legend>
                  <b-row>
                    <b-col>
                      <b-form-select
                        v-model="tahun"
                        :options="listtahun"
                        value-field="tahun"
                        text-field="tahun"
                        @change="getBulan()"
                      ></b-form-select>
                    </b-col>
                    <b-col>
                      <b-form-select
                        v-model="bulan"
                        :options="listbulan"
                        value-field="bulan"
                        text-field="bulanlabel"
                        @change="getMinggu()"
                      ></b-form-select>
                    </b-col>
                    <b-col>
                      <b-form-select
                        v-model="minggu"
                        :options="listminggu"
                        value-field="minggu"
                        text-field="minggulabel"
                        @change="getTanggal()"
                      ></b-form-select>
                    </b-col>
                  </b-row>
                  <hr />
                  <b-row>
                    <b-col>
                      <table
                        responsive
                        class="table b-table table-striped table-hover"
                      >
                        <thead>
                          <tr>
                            <th style="width: 200px">Hari / Tanggal</th>
                            <th>Laporan</th>
                            <th style="width: 100px">Lampiran</th>
                            <th style="width: 200px">Status</th>
                          </tr>
                        </thead>
                        <tbody >
                          <tr
                            v-for="item in listtanggal"
                            :key="item.periode_idx"
                          >
                            <td>
                              {{ item.periode_hari + " / " + item.periode_tgl }}
                            </td>
                            <td>{{ item.detail_isi }}</td>
                            <td v-if="item.detail_lampiran == null"></td>
                            <td v-else-if="item.detail_lampiran == ''">
                              Tidak Ada
                            </td>
                            <td v-else>
                              <b-link
                                :href="endpoint + item.detail_lampiran"
                                class="btn btn-danger btn-sm"
                                target="_blank"
                              >
                                Download
                              </b-link>
                            </td>
                            <td v-if="item.detail_idx == null">
                              <b-button squared variant="danger" size="sm"
                                >Belum Dibuat</b-button
                              >
                            </td>
                            <td v-else>
                              <b-button
                                squared
                                variant="success"
                                size="sm"
                                v-if="item.detail_verifikasi == '1'"
                                ><b-icon icon="check"></b-icon> Sudah
                                Divalidasi</b-button
                              >
                              <b-button
                                squared
                                variant="warning"
                                size="sm"
                                v-else
                                ><b-icon icon="check"></b-icon>Belum
                                Divalidasi</b-button
                              >
                            </td>
                            
                          </tr>
                        </tbody>
                      </table>
                    </b-col>
                  </b-row>
                </fieldset>
                <fieldset class="menu-border" v-if="listtanggal.length > 0">
                  <legend class="menu-border">Tanggapan</legend>

                  <b-row
                    v-for="item in listtanggapan"
                    :key="item.tanggapan_idx"
                  >
                    <div
                      class="col-md-12"
                      v-if="item.tanggapan_sebagai == 'Mahasiswa'"
                    >
                      <div class="media g-mb-30 media-comment">
                        <!-- <img
                          class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          alt="Image Description"
                        /> -->
                        <b-img
                          center
                          rounded="circle"
                          src="../img/male.png"
                          alt="Center image"
                          class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                          v-if="mhsjkl == 'L'"
                        ></b-img>
                        <b-img
                          center
                          rounded="circle"
                          src="../img/female.png"
                          alt="Center image"
                          class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                          v-else
                        ></b-img>

                        <div class="media-body u-shadow-v18 g-bg-secondary">
                          <div class="g-mb-15">
                            <h5 class="h5 g-color-gray-dark-v1 mb-0">
                              {{ item.tanggapan_nama }}
                            </h5>
                          </div>

                          <p>
                            {{ item.tanggapan_isi }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12" v-else>
                      <div class="media g-mb-30 media-comment">
                        <div class="media-body u-shadow-v18 g-bg-secondary">
                          <div class="g-mb-15">
                            <h5 class="h5 g-color-gray-dark-v1 mb-0 text-right">
                              {{ item.tanggapan_nama }}
                            </h5>
                          </div>

                          <p class="text-right">
                            {{ item.tanggapan_isi }}
                          </p>
                        </div>
                        <b-img
                          center
                          rounded="circle"
                          src="../img/dosen.png"
                          alt="Center image"
                          class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                        ></b-img>
                      </div>
                    </div>
                  </b-row>
                </fieldset>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Laporan Akhir Magang">
            <b-row>
              <b-col>
                <fieldset class="menu-border">
                  <legend class="menu-border">
                    Laporan akhir magang
                  </legend>
                  <div v-if="showformlaporan">
                  <b-alert show variant="warning">Laporan akhir belum di upload</b-alert>
                  </div>
                  <div v-else>
                    
                  <b-row >
                    
                    <b-col>
                      <table
                        responsive
                        class="table b-table table-striped table-hover"
                      >
                        <thead>
                          <tr>
                            <th style="width: 200px">Hari / Tanggal</th>
                            <th>Keterangan</th>
                            <th style="width: 100px">Download</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in listlaporanakhir.detail"
                            :key="item.detail_idx"
                          >
                            <td>
                              {{ item.detail_hari + " / " + item.detail_tgl }}
                            </td>
                            <td>{{ item.detail_isi }}</td>
                            <td v-if="item.detail_lampiran == null"></td>
                            <td v-else-if="item.detail_lampiran == ''">
                              Tidak Ada
                            </td>
                            <td v-else>
                              <b-link
                                :href="endpoint + item.detail_lampiran"
                                class="btn btn-danger btn-sm"
                                target="_blank"
                              >
                                Download
                              </b-link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </b-col>
                  </b-row>
                  <b-row
                    v-for="item in listtanggapanakhir"
                    :key="item.tanggapan_idx"
                  >
                    <div
                      class="col-md-12"
                      v-if="item.tanggapan_sebagai == 'Mahasiswa'"
                    >
                      <div class="media g-mb-30 media-comment">
                        <!-- <img
                          class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          alt="Image Description"
                        /> -->
                        <b-img
                          center
                          rounded="circle"
                          src="../img/male.png"
                          alt="Center image"
                          class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                          v-if="mhsjkl == 'L'"
                        ></b-img>
                        <b-img
                          center
                          rounded="circle"
                          src="../img/female.png"
                          alt="Center image"
                          class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                          v-else
                        ></b-img>

                        <div class="media-body u-shadow-v18 g-bg-secondary">
                          <div class="g-mb-15">
                            <h5 class="h5 g-color-gray-dark-v1 mb-0">
                              {{ item.tanggapan_nama }}
                            </h5>
                          </div>

                          <p>
                            {{ item.tanggapan_isi }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12" v-else>
                      <div class="media g-mb-30 media-comment">
                        <div class="media-body u-shadow-v18 g-bg-secondary">
                          <div class="g-mb-15">
                            <h5 class="h5 g-color-gray-dark-v1 mb-0 text-right">
                              {{ item.tanggapan_nama }}
                            </h5>
                          </div>

                          <p class="text-right">
                            {{ item.tanggapan_isi }}
                          </p>
                        </div>
                        <b-img
                          center
                          rounded="circle"
                          src="../img/dosen.png"
                          alt="Center image"
                          class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                        ></b-img>
                      </div>
                    </div>
                  </b-row>
                  </div>
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
            <b-form-textarea
              id="textarea"
              v-model="detail_isi"
              placeholder="Masukkan isi laporan"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
          <b-form-group
            id="input-group-3"
            label="Files:"
            label-for="files"
            class="mt-2"
          >
            <b-form-file
              v-model="detail_lampiran"
              :state="Boolean(detail_lampiran)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </b-form-group>
          <div class="mt-2">
            <b-button
              squared
              type="button"
              @click="simpanLaporan"
              variant="primary"
              ><b-icon icon="upload"></b-icon> Simpan</b-button
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
  name: "LaporanDetail",
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
      tahun: "",
      bulan: "",
      minggu: "",
      listtahun: "",
      listbulan: null,
      listminggu: null,
      listtanggal: [],
      detail_idx: "",
      detail_laporanidx: "",
      detail_hari: "",
      detail_tgl: "",
      detail_isi: "",
      detail_lampiran: "",
      periode_idx: "",
      periode_kuotaidx: "",
      periode_tahun: "",
      periode_bulan: "",
      periode_labelbulan: "",
      periode_pekan: "",
      periode_labelpekan: "",
      periode_hari: "",
      periode_tgl: "",
      tanggapan_isi: "",
      listtanggapan: null,
      listlaporanakhir: null,
      listtanggapanakhir: null,
      showformlaporan: true,
      laporanakhiridx:'',
      endpoint: process.env.VUE_APP_BASE_URL,
    };
  },
  mounted() {
    console.clear();
    console.log("Profile is inisialize...");
    this.id = this.$route.params.id;
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
          this.getTahun();
          this.getLaporanAkhir();
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
    async getLaporanAkhir() {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `laporanakhir/` + this.register.registerid,
        })
        .then((response) => {
          console.clear();
          console.log(response.data.code);
          console.log(response.data.data);
          if (response.data.code == 200) {
            this.listlaporanakhir = response.data.data;
            this.laporanakhiridx = response.data.data.laporan_idx;
            this.listtanggapanakhir = response.data.data.tanggapan;
            this.showformlaporan=false;
            // alert(this.laporanakhiridx)
            // this.show = false;
          }else{
            this.showformlaporan = true;
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
          url: `jadwal/tahun/` + this.register.registerkuotaid+`/`+this.register.registerperusahaanid,
        })
        .then((response) => {
          // console.clear();
          // console.log(response.data.data);

          if (response.data.code == 200) {
            this.listtahun = response.data.data;
          } else {
            this.listtahun = null;
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
    async getBulan() {
      let token = localStorage.getItem("token");
      // alert('Kuota aktif')
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url:
            `jadwal/bulan/` + this.register.registerkuotaid + "/" + this.tahun+ "/" + this.register.registerperusahaanid,
        })
        .then((response) => {
          // console.clear();
          // console.log(response.data.data);

          if (response.data.code == 200) {
            this.listbulan = response.data.data;
          } else {
            this.listbulan = null;
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
    async getMinggu() {
      let token = localStorage.getItem("token");
      // alert('Kuota aktif')
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url:
            `jadwal/minggu/` + this.register.registerkuotaid + "/" + this.bulan+ "/" + this.register.registerperusahaanid,
        })
        .then((response) => {
          // console.clear();
          // console.log(response.data.data);

          if (response.data.code == 200) {
            this.listminggu = response.data.data;
          } else {
            this.listminggu = null;
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
    async getTanggal() {
      let token = localStorage.getItem("token");
      // alert('Kuota aktif')
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url:
            `jadwal/tanggal/` +
            this.register.registerkuotaid +
            "/" +
            this.minggu +
            "/" +
            this.register.registerid+
            "/"+this.register.registerperusahaanid,
        })
        .then((response) => {
          // console.clear();
          // console.log(response.data.data);

          if (response.data.code == 200) {
            this.listtanggal = response.data.data;
            if (response.data.laporan != null) {
              this.detail_laporanidx = response.data.laporan.laporan_idx;
              this.listtanggapan = response.data.laporan.tanggapan;
            }
          } else {
            this.listtanggal = null;
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
      this.detail_idx = "";
      this.detail_hari = "";
      this.detail_tgl = "";
      this.detail_isi = "";
      this.files = null;
    },
    tambahLaporanAkhir(){
      this.showformlaporan=true;
    },
    async editLaporan(id) {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `laporan/` + id,
        })
        .then((response) => {
          console.log(response.data);

          if (response.data.code == 200) {
            this.isnew = false;
            this.modaltitle = "Update Data Kuota";
            this.detail_idx = response.data.data.detail_idx;
            this.detail_laporanidx = response.data.data.detail_laporanidx;
            this.detail_hari = response.data.data.detail_hari;
            this.detail_tgl = response.data.data.detail_tgl;
            this.detail_isi = response.data.data.detail_isi;
            this.detail_lampiran = response.data.data.detail_lampiran;
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
    async buatLaporan(id) {
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `jadwal/periode/` + id,
        })
        .then((response) => {
          console.log(response.data);

          if (response.data.code == 200) {
            this.isnew = false;
            this.modaltitle = "Buat Laporan";
            this.periode_idx = response.data.data.periode_idx;
            this.periode_kuotaidx = response.data.data.periode_kuotaidx;
            this.periode_tahun = response.data.data.periode_tahun;
            this.periode_bulan = response.data.data.periode_bulan;
            this.periode_labelbulan = response.data.data.periode_labelbulan;
            this.periode_labelpekan = response.data.data.periode_labelpekan;
            this.periode_hari = response.data.data.periode_hari;
            this.periode_tgl = response.data.data.periode_tgl;
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
    simpanLaporan: async function () {
      let token = localStorage.getItem("token");
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("laporan_registeridx", this.register.registerid);
      this.formdata.append("laporan_nobp", this.mhsnobp);
      this.formdata.append("laporan_tahun", this.periode_tahun);
      this.formdata.append("laporan_bulan", this.periode_bulan);
      this.formdata.append("laporan_bulanlabel", this.periode_labelbulan);
      this.formdata.append("laporan_pekan", this.periode_pekan);
      this.formdata.append("laporan_pekanlabel", this.periode_labelpekan);
      this.formdata.append("detail_idx", this.detail_idx);
      this.formdata.append("detail_laporanidx", this.detail_laporanidx);
      this.formdata.append("detail_hari", this.periode_hari);
      this.formdata.append("detail_tgl", this.periode_tgl);
      this.formdata.append("detail_isi", this.detail_isi);
      this.formdata.append("detail_lampiran", this.detail_lampiran);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `laporan/` + this.detail_idx,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200 || response.data.code == 201) {
            this.getTanggal();
            this.resetForm();
            this.detail_laporanidx = response.data.laporanidx;
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
    simpanLaporanAkhir: async function () {
      let token = localStorage.getItem("token");
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("laporan_registeridx", this.register.registerid);
      this.formdata.append("laporan_nobp", this.mhsnobp);
      this.formdata.append("detail_idx", this.detail_idx);
      this.formdata.append("detail_isi", this.detail_isi);
      this.formdata.append("detail_laporanidx", this.laporanakhiridx);
      this.formdata.append("detail_lampiran", this.detail_lampiran);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `laporanakhir`,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200 || response.data.code == 201) {
            this.getLaporanAkhir();
            this.resetForm();
            this.laporanakhiridx = response.data.laporanidx;
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
    simpanTanggapan: async function () {
      let token = localStorage.getItem("token");
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("tanggapan_laporanidx", this.detail_laporanidx);
      this.formdata.append("tanggapan_isi", this.tanggapan_isi);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `tanggapan`,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200 || response.data.code == 201) {
            this.getTanggal();
            this.tanggapan_isi = "";
            this.resetForm();
            this.detail_laporanidx = response.data.laporanidx;
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
    simpanTanggapanAkhir: async function () {
      let token = localStorage.getItem("token");
      const form = document.querySelector("form");
      this.formdata = new FormData(form);
      this.formdata.append("tanggapan_laporanidx", this.laporanakhiridx);
      this.formdata.append("tanggapan_isi", this.tanggapan_isi);
      console.log(this.formdata);
      await axios
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + token,
          },
          method: "POST",
          url: `tanggapan`,
          data: this.formdata,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200 || response.data.code == 201) {
            this.getLaporanAkhir();
            this.tanggapan_isi = "";
            this.resetForm();
            // this.laporanakhiridx = response.data.laporanidx;
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
    isValid: async function (idx) {
      let token = localStorage.getItem("token");
      // alert(idx);
      this.$swal
        .fire({
          title: "Apakah anda yakin?",
          text: "Akan memvalidasi laporan ini",
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
              detail_idx: idx,
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
                url: `validasilaporan`,
                data: this.formdata,
              })
              .then((response) => {
                console.log(response.data);
                if (response.data.code == 200) {
                  this.getTanggal();
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
    unValid: async function (idx) {
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
              detail_idx: idx,
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
                url: `validasilaporan`,
                data: this.formdata,
              })
              .then((response) => {
                console.log(response.data);
                if (response.data.code == 200) {
                  this.getTanggal();
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
