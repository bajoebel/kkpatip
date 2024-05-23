<template>
  <div class="kotak" v-if="isLogin">
    <h3>Data Mahasiswa</h3>
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
      <b-col cols="3" lg="3">
        <b-form-select v-model="prodiid" :options="listprodi" value-field="prodiid" text-field="prodinama" @change="getData(Event, 1)"></b-form-select>
        <!-- <select class="form-control" v-model="prodiid" :options="listprodi" @change="getData">
          <option value="11" selected>TIA</option>
        </select> -->
      </b-col>
      <b-col cols="3" lg="3">
        <b-form-select v-model="angkatan" :options="listangkatan"  @change="getData(Event, 1)"></b-form-select>
        
      </b-col>
      <b-col cols="4" lg="5">
        <b-input-group>
          <b-form-input v-model="keyword" @keyup="getData"></b-form-input>
          <b-input-group-append>
            <b-button squared variant="success" @click="getData()"
              >Cari</b-button
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
          <td>No</td>
          <td>Nama</td>
          <td>Alamat</td>
          <td>No Telp</td>
          <td>Prodi Nama</td>
          <td>Angkatan</td>
          <td>SKS Diambil</td>
          <td>SKS Nilai D/E</td>
          <td style="width: 50px">#</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.perusahaanid">
          <td>{{ index + 1 }}</td>
          <td>{{ item.mhsnobp + " - " + item.mhsnama }}</td>
          <td>{{ item.mhsalamat }}</td>
          <td>{{ item.mhstelp }}</td>
          <td>{{ item.prodinama }}</td>
          <td>{{ item.mhsangkatan }}</td>
          <td>{{ item.totalsks }}</td>
          <td>{{ item.nilai_d_e }}</td>
          <td>
            <b-button-group size="sm">
              <b-button
                squared
                variant="primary"
                @click="rekomendasi(item.mhsnobp)"
                ><b-icon icon="check"></b-icon
              ></b-button>
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
      angkatan: new Date().getFullYear(),
      tahunini: new Date().getFullYear(),
      page: 1,
      items: [],
      listangkatan:[],
      listprodi:[],
      urut: 0,
      currentPage: 1,
      rows: 0,
      perPage: 0,
      pageCount: 0,
    };
  },
  mounted() {
    
    let la=[];
    var myobj={};
    for (let i = 2015; i <= this.tahunini; i++) {
      if(i==this.tahunini){
        myobj = {
          value: i,
          text: i,
          selected: true
        }
      }else{
        myobj = {
          value: i,
          text: i
        }
      }
      
      la.push(myobj)
    }
    this.getListProdi();
    this.listangkatan=la;
    this.getData(Event, 1);
    // console.log(this.listangkatan)
    // alert(this.angkatan)
  },
  methods: {
    onCheck: () => {
      return localStorage.getItem("isLogin");
    },
    getUrut: () => {
      this.urut = this.urut + 1;
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
            `mahasiswa?page=` +
            page +
            `&limit=` +
            this.limit +
            `&keyword=` +
            this.keyword +
            `&prodi=` +
            this.prodiid +
            `&angkatan=` +
            this.angkatan,
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
  },
};
</script>
