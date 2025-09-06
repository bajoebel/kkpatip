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
          <tr>
            <td>Perusahaan</td>
            <td>
              <b-form-select
                        v-model="registerid"
                        :options="listregister"
                        value-field="registerid"
                        text-field="registernamaperusahaan"
                        @change="getRegister()"
                      ></b-form-select>
            </td>
          </tr>
        </table>
        <b-link
          :href="endpoint + dokumenbalasan.balasanfiles"
          v-if="dokumenbalasan"
          class="btn btn-primary btn-block"
          target="_blank"
        >
          Download Surat Balasan Dari Perusahaan</b-link
        >
        <b-button squared block variant="danger" v-else
          >Belum ada Surat Balasan</b-button
        >
      </div>
    </b-col>
    <b-col cols="12" lg="8">
      <div class="kotak">
        <!-- Tabs with card integration -->
        <b-tabs pills content-class="mt-3" lazy>
          <b-tab title="Registrasi Magang">
            <!-- <b-row>Kuota Aktif {{ kuotaaktif }}</b-row> -->
            <b-row>
              <b-col>
                <div v-if="kuotaaktif == null">
                  <b-alert show variant="danger"
                    >Tidak ada kuota magang yang dibuka</b-alert
                  >
                </div>
                <div v-else>
                  <div v-if="rekomendasi == null">
                    <b-alert
                      show
                      variant="danger"
                      v-if="
                        totalsks < config.minimalsks ||
                        nilai_d_e >= config.maximalsksgagal
                      "
                      >Maaf anda belum masuk dalam list mahasiswa yang
                      direkomendasikan untuk magang</b-alert
                    >
                    <b-alert show variant="info" v-else
                      >System mendeteksi anda sudah bisa direkomendasikan untuk
                      magang, silahkan hubungi admin prodi anda untuk memasukkan
                      anda kedalam list mahasiswa yag direkomendasikan
                      magang</b-alert
                    >
                  </div>
                  <div v-else>
                    <!-- <h3>
                      <b>
                        Kuota Magang {{ kuotaaktif.jeniskuota }} Prodi
                        {{ kuotaaktif.kuotaprodinama }} Periode
                        {{ kuotaaktif.kuotasemnama }}
                      </b>
                    </h3> -->
                    <fieldset class="menu-border">
                      <legend class="menu-border">
                        Kuota Magang {{ kuotaaktif.jeniskuota }} Prodi
                        {{ kuotaaktif.kuotaprodinama }} Periode
                        {{ kuotaaktif.kuotasemnama }}
                      </legend>

                      <div v-if="!register">
                        <b-row v-if="kuotaaktif.jenismou == '1'">
                          <b-col
                            cols="12"
                            lg="3"
                            v-for="item in kuotadetail"
                            :key="item.idx"
                          >
                            <div class="kotak-relative shadow">
                              <img
                                :src="endpoint + item.perusahaanlogo"
                                :alt="item.perusahaannama"
                                class="w150 rounded-circle mx-auto d-block"
                              />
                              <br />
                              <h3 class="text-center">
                                <b> {{ item.perusahaannama }} </b>
                              </h3>
                              <table class="table b-table table-hover">
                                <tr>
                                  <td>Pria</td>
                                  <td>{{ item.kuotapria }}</td>
                                </tr>
                                <tr>
                                  <td>Wanita</td>
                                  <td>{{ item.kuotawanita }}</td>
                                </tr>
                                <tr>
                                  <td>Pria / Wanita</td>
                                  <td>{{ item.kuotapriawanita }}</td>
                                </tr>
                                <tr>
                                  <td>Terisi</td>
                                  <td>{{ item.jmlregister }}</td>
                                </tr>
                              </table>
                              <div v-if="mhsjkl == 'L'">
                                <b-button
                                  squared
                                  block
                                  variant="primary"
                                  @click="
                                    pilih(
                                      item.perusahaanid,
                                      item.perusahaannama
                                    )
                                  "
                                  v-if="
                                    item.kuotapria +
                                      item.kuotapriawanita -
                                      item.jmlregister >
                                    0
                                  "
                                >
                                  <b-icon icon="check"></b-icon> Pilih</b-button
                                >
                                <b-button squared block variant="danger" v-else>
                                  <b-icon icon="file-x"></b-icon>
                                  Penuh</b-button
                                >
                              </div>
                              <div v-else>
                                <b-button
                                  squared
                                  block
                                  variant="primary"
                                  @click="
                                    pilih(
                                      item.perusahaanid,
                                      item.perusahaannama
                                    )
                                  "
                                  v-if="
                                    item.kuotawanita +
                                      item.kuotapriawanita -
                                      item.jmlregister >
                                    0
                                  "
                                >
                                  <b-icon icon="check"></b-icon> Pilih</b-button
                                >
                                <b-button squared block variant="danger" v-else>
                                  <b-icon icon="file-x"></b-icon>
                                  Penuh</b-button
                                >
                              </div>
                            </div>
                          </b-col>
                        </b-row>
                        <b-row v-else>
                          <b-col>
                            <b-form id="form" v-if="show">
                              <b-form-group
                                id="input-group-1"
                                label="Nama Perusahaan"
                                label-for="perusahaannama"
                                class="mt-2"
                              >
                                <b-input-group>
                                  <b-form-input
                                    id="perusahaannama"
                                    placeholder="Masukkan Nama Perusahaan"
                                    v-model="perusahaannama"
                                    required
                                    readonly
                                    v-if="perusahaanid"
                                  ></b-form-input>
                                  <b-form-input
                                    id="perusahaannama"
                                    placeholder="Masukkan Nama Perusahaan"
                                    v-model="perusahaannama"
                                    required
                                    v-else
                                  ></b-form-input>
                                  <b-input-group-append>
                                    <b-button
                                      squared
                                      variant="primary"
                                      @click="cariPerusahaan()"
                                      >Cari Perusahaan</b-button
                                    >
                                  </b-input-group-append>
                                </b-input-group>
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
                                  readonly
                                  required
                                  v-if="this.perusahaanid"
                                ></b-form-input>
                                <b-form-input
                                  id="perusahaanalamat"
                                  placeholder="Masukkan alamat "
                                  v-model="perusahaanalamat"
                                  required
                                  v-else
                                ></b-form-input>
                              </b-form-group>
                              <b-form-group
                                id="input-group-1"
                                label="Email Perusahaan"
                                label-for="perusahaanemail"
                                class="mt-2"
                              >
                                <b-form-input
                                  id="perusahaanemail"
                                  type="email"
                                  placeholder="Masukkan Email Perusahaan"
                                  v-model="perusahaanemail"
                                  required
                                  readonly
                                  v-if="perusahaanid"
                                ></b-form-input>
                                <b-form-input
                                  id="perusahaanemail"
                                  type="email"
                                  placeholder="Masukkan Email Perusahaan"
                                  v-model="perusahaanemail"
                                  required
                                  v-else
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
                                  readonly
                                  v-if="perusahaanid"
                                ></b-form-input>
                                <b-form-input
                                  id="perusahaannotelp"
                                  placeholder="Masukkan No Telp "
                                  v-model="perusahaannotelp"
                                  required
                                  v-else
                                ></b-form-input>
                              </b-form-group>

                              <div class="mt-2">
                                <b-button
                                  squared
                                  type="button"
                                  @click="daftarMandiri"
                                  variant="primary"
                                  >Daftar</b-button
                                >
                                <b-button
                                  squared
                                  type="button"
                                  @click="resetPerusahaan"
                                  variant="danger"
                                  >Reset Form</b-button
                                >
                              </div>
                            </b-form>
                          </b-col>
                        </b-row>
                      </div>
                      <div v-else>
                        <div v-if="register.registerdisetujui != 0">
                          
                          <b-row>
                            <b-col>
                              <!-- <b-alert variant="success" show
                                >Anda terdaftar untuk magang di
                                {{ register.registernamaperusahaan }}
                              </b-alert> -->
                              <b-alert
                                variant="warning"
                                show
                                v-if="register.registerdisetujui == null"
                                >Status permintaan magang di
                                {{ register.registernamaperusahaan }} sedang
                                menunggu proses dari admin prodi</b-alert
                              >
                              <b-alert
                                variant="success"
                                show
                                v-if="register.registerdisetujui == 1"
                                >Status permintaan magang di
                                {{ register.registernamaperusahaan }} sudah
                                disetujui admin prodi</b-alert
                              >
                              
                              <b-alert
                                variant="warning"
                                show
                                v-else-if="!register.pembimbing"
                                >Menunggu penetapan pembimbing magang oleh admin
                                prodi</b-alert
                              >
                              <!-- <b-alert variant="warning" v-if="register.registerdisetujui == null">Status registrasi magang saat ini sedang menunggu proses dari admin prodi</b-alert> -->
                              <b-tabs content-class="mt-3" lazy>
                                <b-tab
                                  :title="jenisdokumen"
                                  v-if="register.dokumenaktif"
                                >
                                  <div v-if="dokumenbalasan">
                                    <fieldset class="menu-border">
                                      <legend class="menu-border">
                                        Dokumen Balasan
                                      </legend>
                                      <table
                                        responsive
                                        class="table b-table table-striped table-hover"
                                      >
                                        <tr>
                                          <th class="w50">No</th>
                                          <th>Nama Dokumen</th>
                                          <th style="width:260px;">Aksi</th>
                                        </tr>
                                        <tr
                                          v-for="(
                                            item, index
                                          ) in register.dokumenaktif"
                                          :key="item.dokumenid"
                                        >
                                          <td>{{ index + 1 }}</td>
                                          <td>
                                            {{
                                              item.dokumennama +
                                              " (File : " +
                                              item.dokumentipe +
                                              ")"
                                            }}
                                          </td>
                                          <td>
                                            <b-button-group size="sm">
                                              <b-button
                                                squared
                                                variant="primary"
                                                @click="
                                                  upload(
                                                    item.dokumenid,
                                                    register.registerid,
                                                    item.dokumentipe
                                                  )
                                                "
                                                v-if="item.status != '1'"
                                                ><b-icon icon="upload"></b-icon>
                                                Upload</b-button
                                              >
                                              <b-button
                                                squared
                                                variant="success"
                                                v-else
                                                ><b-icon icon="check"></b-icon>
                                                Sudah Divalidasi</b-button
                                              >
                                              <!-- <b-button
                                            squared
                                            variant="danger"
                                            @click="lihat(item.files)"
                                            v-if="item.files"
                                          >
                                            <b-icon icon="eye"></b-icon> Lihat
                                          </b-button> -->
                                              <a
                                                :href="endpoint + item.files"
                                                class="btn btn-danger rounded-0"
                                                v-if="item.files"
                                                target="_blank"
                                                ><b-icon icon="eye"></b-icon>
                                                Lihat</a
                                              >
                                            </b-button-group>
                                          </td>
                                        </tr>
                                      </table>
                                    </fieldset>
                                  </div>
                                  <div v-else>
                                    <b-alert
                                      variant="warning"
                                      show
                                      v-if="this.idjenisdokumen != '1'"
                                      >Menunggu surat balasan dari
                                      perusahaan</b-alert
                                    >
                                    <table
                                      responsive
                                      class="table b-table table-striped table-hover"
                                      v-else
                                    >
                                      <tr>
                                        <th class="w50">No</th>
                                        <th>Nama Dokumen</th>
                                        <th style="width:260px;">Aksi</th>
                                      </tr>
                                      <tr
                                        v-for="(
                                          item, index
                                        ) in register.dokumenaktif"
                                        :key="item.dokumenid"
                                      >
                                        <td>{{ index + 1 }}</td>
                                        <td>
                                          {{
                                            item.dokumennama +
                                            " (File : " +
                                            item.dokumentipe +
                                            ")"
                                          }}
                                        </td>
                                        <td>
                                          <b-button-group size="sm">
                                            <b-button
                                              squared
                                              variant="primary"
                                              @click="
                                                upload(
                                                  item.dokumenid,
                                                  register.registerid,
                                                  item.dokumentipe
                                                )
                                              "
                                              v-if="item.status != '1'"
                                              ><b-icon icon="upload"></b-icon>
                                              Upload</b-button
                                            >
                                            <b-button
                                              squared
                                              variant="success"
                                              v-else
                                              ><b-icon icon="check"></b-icon> Sudah
                                              Divalidasi</b-button
                                            >
                                            <!-- <b-button
                                            squared
                                            variant="danger"
                                            @click="lihat(item.files)"
                                            v-if="item.files"
                                          >
                                            <b-icon icon="eye"></b-icon> Lihat
                                          </b-button> -->
                                            <a
                                              :href="endpoint + item.files"
                                              class="btn btn-danger rounded-0"
                                              v-if="item.files"
                                              target="_blank"
                                              ><b-icon icon="eye"></b-icon> Lihat</a
                                            >
                                          </b-button-group>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </b-tab>
                                <b-tab
                                  title="Lihat Dokumen Register"
                                  v-if="register.dokumenregister.length > 0"
                                >
                                  <fieldset class="menu-border">
                                    <legend class="menu-border">
                                      List Dokumen
                                    </legend>
                                    <table
                                      responsive
                                      class="table b-table table-striped table-hover"
                                    >
                                      <tr>
                                        <th calass="w50">No</th>
                                        <th>Nama Dokumen</th>
                                        <th style="width:260px;">Aksi</th>
                                      </tr>
                                      <tr
                                        v-for="(
                                          item, index
                                        ) in register.dokumenregister"
                                        :key="item.dokumenid"
                                      >
                                        <td>{{ index + 1 }}</td>
                                        <td>
                                          {{
                                            item.dokumennama +
                                            " (File : " +
                                            item.dokumentipe +
                                            ")"
                                          }}
                                        </td>
                                        <td>
                                          <b-button-group size="sm">
                                            <b-button
                                              squared
                                              variant="info"
                                              v-if="item.status != '1'"
                                              ><b-icon icon="upload"></b-icon> Belum
                                              Validasi</b-button
                                            >
                                            <b-button
                                              squared
                                              variant="success"
                                              v-else
                                              ><b-icon icon="check"></b-icon> Sudah
                                              Divalidasi</b-button
                                            >

                                            <a
                                              :href="endpoint + item.files"
                                              class="btn btn-danger rounded-0"
                                              v-if="item.files"
                                              target="_blank"
                                              ><b-icon icon="eye"></b-icon> Lihat</a
                                            >
                                          </b-button-group>
                                        </td>
                                      </tr>
                                    </table>
                                  </fieldset>
                                </b-tab>
                                <b-tab
                                  title="Lihat Dokumen Konsultasi"
                                  v-if="register.dokumenkonsultasi"
                                >
                                  <fieldset class="menu-border">
                                    <legend class="menu-border">
                                      List Dokumen
                                    </legend>
                                    <table
                                      responsive
                                      class="table b-table table-striped table-hover"
                                    >
                                      <tr>
                                        <th class="w50">No</th>
                                        <th>Nama Dokumen</th>
                                        <th style="width:260px;">Aksi</th>
                                      </tr>
                                      <tr
                                        v-for="(
                                          item, index
                                        ) in register.dokumenkonsultasi"
                                        :key="item.dokumenid"
                                      >
                                        <td>{{ index + 1 }}</td>
                                        <td>
                                          {{
                                            item.dokumennama +
                                            " (File : " +
                                            item.dokumentipe +
                                            ")"
                                          }}
                                        </td>
                                        <td>
                                          <b-button-group size="sm">
                                            <b-button
                                              squared
                                              variant="info"
                                              v-if="item.status != '1'"
                                              ><b-icon icon="upload"></b-icon> Belum
                                              Validasi</b-button
                                            >
                                            <b-button
                                              squared
                                              variant="success"
                                              v-else
                                              ><b-icon icon="check"></b-icon> Sudah
                                              Divalidasi</b-button
                                            >

                                            <a
                                              :href="endpoint + item.files"
                                              class="btn btn-danger rounded-0"
                                              v-if="item.files"
                                              target="_blank"
                                              ><b-icon icon="eye"></b-icon> Lihat</a
                                            >
                                          </b-button-group>
                                        </td>
                                      </tr>
                                    </table>
                                  </fieldset>
                                </b-tab>
                                <b-tab
                                  title="Lihat Dokumen Keberangkatan"
                                  v-if="register.dokumenkeberangkatan"
                                >
                                  <fieldset class="menu-border">
                                    <legend class="menu-border">
                                      List Dokumen
                                    </legend>
                                    <table
                                      responsive
                                      class="table b-table table-striped table-hover"
                                    >
                                      <tr>
                                        <th class="w50">No</th>
                                        <th>Nama Dokumen</th>
                                        <th style="width:260px;">Aksi</th>
                                      </tr>
                                      <tr
                                        v-for="(
                                          item, index
                                        ) in register.dokumenkeberangkatan"
                                        :key="item.dokumenid"
                                      >
                                        <td>{{ index + 1 }}</td>
                                        <td>
                                          {{
                                            item.dokumennama +
                                            " (File : " +
                                            item.dokumentipe +
                                            ")"
                                          }}
                                        </td>
                                        <td>
                                          <b-button-group size="sm">
                                            <b-button
                                              squared
                                              variant="info"
                                              v-if="item.status != '1'"
                                              ><b-icon icon="upload"></b-icon> Belum
                                              Validasi</b-button
                                            >
                                            <b-button
                                              squared
                                              variant="success"
                                              v-else
                                              ><b-icon icon="check"></b-icon> Sudah
                                              Divalidasi</b-button
                                            >

                                            <a
                                              :href="endpoint + item.files"
                                              class="btn btn-info rounded-0"
                                              v-if="item.files"
                                              target="_blank"
                                              ><b-icon icon="eye"></b-icon> Lihat</a
                                            >
                                          </b-button-group>
                                        </td>
                                      </tr>
                                    </table>
                                  </fieldset>
                                </b-tab>
                              </b-tabs>
                            </b-col>
                          </b-row>
                        </div>
                        <div v-else>
                          <b-row>
                            <b-col>
                              <b-alert
                                variant="danger"
                                show
                                v-if="register.registerdisetujui == 0"
                                >Status permintaan magang di
                                {{ register.registernamaperusahaan }} tidak
                                disetujui admin prodi silahkan pilih perusahaan lain</b-alert
                              >
                            </b-col>
                          </b-row>
                          <b-row v-if="kuotaaktif.jenismou == '1'">
                          <b-col
                            cols="12"
                            lg="3"
                            v-for="item in kuotadetail"
                            :key="item.idx"
                          >
                            <div class="kotak-relative shadow">
                              <img
                                :src="endpoint + item.perusahaanlogo"
                                :alt="item.perusahaannama"
                                class="w150 rounded-circle mx-auto d-block"
                              />
                              <br />
                              <h3 class="text-center">
                                <b> {{ item.perusahaannama }} </b>
                              </h3>
                              <table class="table b-table table-hover">
                                <tr>
                                  <td>Pria</td>
                                  <td>{{ item.kuotapria }}</td>
                                </tr>
                                <tr>
                                  <td>Wanita</td>
                                  <td>{{ item.kuotawanita }}</td>
                                </tr>
                                <tr>
                                  <td>Pria / Wanita</td>
                                  <td>{{ item.kuotapriawanita }}</td>
                                </tr>
                                <tr>
                                  <td>Terisi</td>
                                  <td>{{ item.jmlregister }}</td>
                                </tr>
                              </table>
                              <div v-if="mhsjkl == 'L'">
                                <b-button
                                  squared
                                  block
                                  variant="primary"
                                  @click="
                                    pilih(
                                      item.perusahaanid,
                                      item.perusahaannama
                                    )
                                  "
                                  v-if="
                                    item.kuotapria +
                                      item.kuotapriawanita -
                                      item.jmlregister >
                                    0
                                  "
                                >
                                  <b-icon icon="check"></b-icon> Pilih</b-button
                                >
                                <b-button squared block variant="danger" v-else>
                                  <b-icon icon="file-x"></b-icon>
                                  Penuh</b-button
                                >
                              </div>
                              <div v-else>
                                <b-button
                                  squared
                                  block
                                  variant="primary"
                                  @click="
                                    pilih(
                                      item.perusahaanid,
                                      item.perusahaannama
                                    )
                                  "
                                  v-if="
                                    item.kuotawanita +
                                      item.kuotapriawanita -
                                      item.jmlregister >
                                    0
                                  "
                                >
                                  <b-icon icon="check"></b-icon> Pilih</b-button
                                >
                                <b-button squared block variant="danger" v-else>
                                  <b-icon icon="file-x"></b-icon>
                                  Penuh</b-button
                                >
                              </div>
                            </div>
                          </b-col>
                        </b-row>
                        <b-row v-else>
                          <b-col>
                            <b-form id="form" v-if="show">
                              <b-form-group
                                id="input-group-1"
                                label="Nama Perusahaan"
                                label-for="perusahaannama"
                                class="mt-2"
                              >
                                <b-input-group>
                                  <b-form-input
                                    id="perusahaannama"
                                    placeholder="Masukkan Nama Perusahaan"
                                    v-model="perusahaannama"
                                    required
                                    readonly
                                    v-if="perusahaanid"
                                  ></b-form-input>
                                  <b-form-input
                                    id="perusahaannama"
                                    placeholder="Masukkan Nama Perusahaan"
                                    v-model="perusahaannama"
                                    required
                                    v-else
                                  ></b-form-input>
                                  <b-input-group-append>
                                    <b-button
                                      squared
                                      variant="primary"
                                      @click="cariPerusahaan()"
                                      >Cari Perusahaan</b-button
                                    >
                                  </b-input-group-append>
                                </b-input-group>
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
                                  readonly
                                  required
                                  v-if="this.perusahaanid"
                                ></b-form-input>
                                <b-form-input
                                  id="perusahaanalamat"
                                  placeholder="Masukkan alamat "
                                  v-model="perusahaanalamat"
                                  required
                                  v-else
                                ></b-form-input>
                              </b-form-group>
                              <b-form-group
                                id="input-group-1"
                                label="Email Perusahaan"
                                label-for="perusahaanemail"
                                class="mt-2"
                              >
                                <b-form-input
                                  id="perusahaanemail"
                                  type="email"
                                  placeholder="Masukkan Email Perusahaan"
                                  v-model="perusahaanemail"
                                  required
                                  readonly
                                  v-if="perusahaanid"
                                ></b-form-input>
                                <b-form-input
                                  id="perusahaanemail"
                                  type="email"
                                  placeholder="Masukkan Email Perusahaan"
                                  v-model="perusahaanemail"
                                  required
                                  v-else
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
                                  readonly
                                  v-if="perusahaanid"
                                ></b-form-input>
                                <b-form-input
                                  id="perusahaannotelp"
                                  placeholder="Masukkan No Telp "
                                  v-model="perusahaannotelp"
                                  required
                                  v-else
                                ></b-form-input>
                              </b-form-group>

                              <div class="mt-2">
                                <b-button
                                  squared
                                  type="button"
                                  @click="daftarMandiri"
                                  variant="primary"
                                  >Daftar</b-button
                                >
                                <b-button
                                  squared
                                  type="button"
                                  @click="resetPerusahaan"
                                  variant="danger"
                                  >Reset Form</b-button
                                >
                              </div>
                            </b-form>
                          </b-col>
                        </b-row>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Dokumen Pengumuman Akademik" v-if="register">
            <b-row>
              <b-col>
                <fieldset class="menu-border">
                  <legend class="menu-border">Pengumuman</legend>
                  <table
                    responsive
                    class="table b-table table-striped table-hover"
                  >
                    <tr>
                      <th class="w50">No</th>
                      <th>Nama Dokumen</th>
                      <th style="width:260px;">Aksi</th>
                    </tr>
                    <tr
                      v-for="(item, index) in register.dokumenakademik"
                      :key="item.dokumenid"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>
                        {{ item.dokumennama }}
                      </td>
                      <td>
                        <b-button-group size="sm">
                          <a
                            :href="endpoint + item.files"
                            class="btn btn-success rounded-0"
                            v-if="item.files"
                            target="_blank"
                            ><b-icon icon="eye"></b-icon> Lihat</a
                          >
                          <b-button squared variant="danger" v-else
                            ><b-icon icon="warning"></b-icon> Dokumen Belum
                            Ada</b-button
                          >
                        </b-button-group>
                      </td>
                    </tr>
                  </table>
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
      listregister: null,
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
          
          if(response.data.data.register != null){
            
            var lr = response.data.data.register;
            lr.push({
              "registerid":0,
              "registernamaperusahaan":"Daftarkan ke perusahaan lain"
            })
            console.clear();
            console.log(lr)
            this.listregister = lr;
            // alert(lr.length)
            if(lr.length>1){
              let idx = lr.length - 2;
              this.registerid = response.data.data.register[idx].registerid;
              this.getRegister()
            }
          }else{
            // alert(response.data.data.register)
          }
          
          // alert('kuota Aktif')
          this.kuotaAktif();
          

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
    async kuotaAktif() {
      let token = localStorage.getItem("token");
      // alert('Kuota aktif')
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
    async getRegister() {
      let token = localStorage.getItem("token");
      // alert('Kuota aktif')
      await axios
        .request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `register/detail/` + this.registerid,
        })
        .then((response) => {
          console.clear();
          // console.log(response.data.data);
          // alert(response.data.code)
          if(response.data.code==200){
            this.register = response.data.data.register
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
          }else{
            this.dokumenbalasan = null;
            this.register = null;
          }
          
          console.log("Response : ")
          console.log(response.data.data)
          // console.log(response)
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
              registerid: this.registerid,
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
                if (response.data.code == 201 || response.data.code == 200) {
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
  margin-bottom: 10px;
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
