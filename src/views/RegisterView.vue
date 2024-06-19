<template>
  <div class="kotak" v-if="isLogin">
    <div class="header">
      <b-row>
        <b-col>
        <h3>Data Pendaftaran</h3>
        </b-col>
        <b-col class="text-right"><b-link to="/" class="close-btn"><b-icon icon="x-circle-fill"></b-icon></b-link></b-col>
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
        <b-col cols="10" lg="11">
            <b-input-group >
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
        <tbody>
            <tr v-for="(item, index) in items" :key="item.registerid">
                <td>{{index+1}}</td>
                <td>{{item.registernobp+' - '+item.registermhsnama}}</td>
                <td>{{item.jeniskuota}}</td>
                <td>{{item.kuotaprodinama}}</td>
                <td>{{item.kuotasemnama}}</td>
                <td>{{item.registernamaperusahaan}}</td>
                <td>{{item.jmluploadregister+' / '+item.jmldokregister}}</td>
                <td>{{item.jmluploadkonsultasi+' / '+item.jmldokkonsultasi}}</td>
                <td>{{item.jmluploadberangkat+' / '+item.jmldokberangkat}}</td>
                <td v-if="item.registerdisetujui == null">Belum Diproses</td>
                <td v-else-if="item.registerdisetujui == '1'">Disetujui</td>
                <td v-else>Tidak Disetujui</td>
                <td>
                    <router-link :to="{ path: 'register/'+item.registerid}" class="btn btn-primary rounded-0"><b-icon icon="search"></b-icon> Lihat</router-link>
                </td>
            </tr>
        </tbody>
    </table>
    <b-row>
      <b-col>
        <div class="mt-2">
          <b-pagination 
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
  
  <div v-else >
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
  data: ()=>{
    return {
      isLogin: localStorage.getItem('isLogin'),
      aku: 'Aku',
      limit: 10,
      keyword: '',
      page:1,
      items: [],
      urut:0,
      currentPage:1,
      rows:0,
      perPage:0,
      pageCount:0,
    }
  },
  mounted(){
    this.getData(Event, 1)
  },
  methods:{
    onCheck:()=>{
      return localStorage.getItem('isLogin');
    },
    getUrut:()=>{
        this.urut = this.urut+1;
    },
    getData: async function(event, page) {
      let token = localStorage.getItem("token");
      await axios
      .request({
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ` + token,
        },
        method: "GET",
        url: `register?page=`+page+`&limit=`+this.limit+`&keyword=`+this.keyword,
      })
      .then((response) => {
        console.log(response.data);
        this.items = response.data.data
        this.currentPage=response.data.page.currentPage;
        this.rows=response.data.page.total
        this.perPage=response.data.page.perPage
        this.pageCount=response.data.page.pageCount
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
  }
}
</script>