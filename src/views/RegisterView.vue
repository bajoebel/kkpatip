<template>
  <div class="kotak" v-if="isLogin">
    
      <div class="header">
        <b-row>
          <b-col>
            <h3>Data Pendaftaran</h3>
          </b-col>
          <b-col class="text-right"><b-link to="/" class="close-btn"><b-icon
                icon="x-circle-fill"></b-icon></b-link></b-col>
        </b-row>
      </div>
      <!-- <b-table striped hover :items="items"></b-table> -->
      <b-row>
        <b-col cols="2" lg="1">
          <select class="custom-select" v-model="limit" @change="getData">
            <option value="10" selected>10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </b-col>
        <b-col cols="3" lg="2">
          <b-form-select v-model="prodiid" :options="prodi" value-field="prodiid" text-field="prodinama" class="form-control"></b-form-select>
          <!-- <select class="custom-select" v-model="prodi" @change="getData">

          </select> -->
        </b-col>
        <b-col cols="7" lg="9">
          <b-input-group>
            <b-form-input v-model="keyword" @keyup="getData"></b-form-input>
            <b-input-group-append>
              <b-button squared variant="success" @click="getData()">Cari</b-button>

            </b-input-group-append>
          </b-input-group>
        </b-col>
        <!-- <b-col cols="1"><b-button pill variant="primary">Tambah</b-button></b-col> -->
      </b-row>
      <hr>
      <table responsive class="table b-table table-striped table-hover">
        <thead>
          <tr>
            <td rowspan="2">No</td>
            <td rowspan="2">Mahasiswa</td>
            <td rowspan="2">Jenis Kuota</td>
            <td rowspan="2">Prodi</td>
            <td rowspan="2">Periode</td>
            <td rowspan="2">Nama Perusahaan</td>
            <td colspan="3">Upload Dokumen</td>
            <td rowspan="2">Persetujuan</td>
          </tr>
          <tr>
            <td>Register</td>
            <td>Konsul</td>
            <td>Berangkat</td>
          </tr>
        </thead>
        <tbody v-if="isLoading">
          <tr>
            <td colspan="11" class="text-center">
              <div class="text-center">
                <b-spinner small type="grow"></b-spinner> Loading...
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(item, index) in items" :key="item.registerid">
            <td>{{ index + 1 }}</td>
            <td>{{ item.registernobp + ' - ' + item.registermhsnama }}</td>
            <td>{{ item.jeniskuota }}</td>
            <td>{{ item.kuotaprodinama }}</td>
            <td>{{ item.kuotasemnama }}</td>
            <td>{{ item.registernamaperusahaan }}</td>
            <td>{{ item.jmluploadregister + ' / ' + item.jmldokregister }}</td>
            <td>{{ item.jmluploadkonsultasi + ' / ' + item.jmldokkonsultasi }}</td>
            <td>{{ item.jmluploadberangkat + ' / ' + item.jmldokberangkat }}</td>
            <td v-if="item.registerdisetujui == null">Belum Diproses</td>
            <td v-else-if="item.registerdisetujui == '1'">Disetujui</td>
            <td v-else>Tidak Disetujui</td>
            <td>
              <b-button-group size="sm">
                <router-link :to="{ path: 'register/' + item.registerid }" class="btn btn-primary rounded-0"><b-icon
                  icon="search"></b-icon> Lihat</router-link>
                <b-button squared variant="danger" @click="hapus(item.registerid)"
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
            <b-pagination pills v-model="currentPage" :total-rows="rows" :per-page="perPage"
              @page-click="getData"></b-pagination>
          </div>
        </b-col>
      </b-row>
  </div>

  <div v-else>
    <div class="kotak">
      <h3 class="text-center">
        Anda Belum Login <br>
        <b-link class="text-center" to="/">Silahkan Login Disini</b-link>
      </h3>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data: () => {
    return {
      isLogin: localStorage.getItem('isLogin'),
      aku: 'Aku',
      prodi: '',
      isLoading: false,
      isLoadingBtn: false,
      prodiid: '',
      limit: 10,
      keyword: '',
      page: 1,
      items: [],
      urut: 0,
      currentPage: 1,
      rows: 0,
      perPage: 0,
      pageCount: 0,
    }
  },
  mounted() {
    this.page = 1;
    this.getData(1)
    this.getAksesRuang()
  },
  methods: {
    onCheck: () => {
      return localStorage.getItem('isLogin');
    },
    getUrut: () => {
      this.urut = this.urut + 1;
    },
    getData: async function (page=1) {
      this.isLoading = true;
      let token = localStorage.getItem("token");
      await axios
        .request({
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `register?page=` + page + `&limit=` + this.limit + `&keyword=` + this.keyword+ `&prodi=` + this.prodiid,
        })
        .then((response) => {
          console.log(response.data);
          this.items = response.data.data
          this.currentPage = response.data.page.currentPage;
          this.rows = response.data.page.total
          this.perPage = response.data.page.perPage
          this.pageCount = response.data.page.pageCount
          this.isLoading = false;
        })
        .catch(function (error) {
          // handle error
          // this.isLoading = false;
          console.log(error);
        })
        .finally(function () {
          // always executed
          
        });
      return false;
    },
    getAksesRuang: async function () {
      let token = localStorage.getItem("token");
      console.clear();
      console.log('Token ' + token)
      if (token != null) {
        await axios
          .request({
            headers: {
              Authorization: `Bearer ` + token,
            },
            method: "GET",
            url: `me`,
          })
          .then((response) => {
            console.log(response.data);
            this.prodi = response.data.info.prodi;
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
      }

      return false;
    },
    hapus: async function (id) {
      this.$swal.fire({
        title: "Apakah anda yakin?",
        text: "Anda akan menghapus data Jenis dokumen!",
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
              url: `register/` + id,
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
  }
}
</script>