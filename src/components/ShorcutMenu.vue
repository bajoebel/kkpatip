<template>
  <b-row>
    <b-col cols="12" md="6" class="mt10">
      <fieldset class="menu-border">
        <legend class="menu-border">Menu Utama</legend>
        <b-row>
          <b-col>
            <div class="icon-wrap">
              <div>
                <img
                  src="img/menu/buildings.png"
                />
              </div>
            </div>

            <div class="icon-wrap">
              <div>
                <img
                  src="img/menu/mahasiswa.png"
                />
              </div>
            </div>

            <!-- <div></div> -->

            <div class="icon-wrap">
              <div>
                <img
                  src="img/menu/scholarship.png"
                />
              </div>
            </div>

            <div class="icon-wrap">
              <div>
                <img
                  src="img/menu/customer-behavior.png"
                />
              </div>
            </div>
            <div class="icon-wrap">
              <div>
                <img
                  src="img/menu/jeniskuota.png"
                />
              </div>
            </div>
            <div class="icon-wrap">
              <div>
                <img
                  src="img/menu/dokumenfile.png"
                />
              </div>
            </div>
            <div class="icon-wrap">
              <div>
                <img
                  src="img/menu/majority.png"
                />
              </div>
            </div>
            <div class="icon-wrap">
              <div>
                <img
                  src="img/menu/register.png"
                />
              </div>
            </div>
          </b-col>
        </b-row>
        <!-- <b-row>
          <b-col class="text-center">
            <router-link
              :to="{ path: 'perusahaan' }"
              class="btn btn-default btn-block b1"
              ><b-icon icon="bank"></b-icon><br />Perusahaan</router-link
            >
          </b-col>
          <b-col class="text-center">
            <router-link
              :to="{ path: 'mahasiswa' }"
              class="btn btn-default btn-block b1"
              ><b-icon icon="people-fill"></b-icon><br />Mahasiswa</router-link
            >
          </b-col>
          <b-col class="text-center">
            <router-link
              :to="{ path: 'prodi' }"
              class="btn btn-default btn-block b1"
              ><b-icon icon="intersect"></b-icon><br />Prodi</router-link
            >
          </b-col>
          <b-col class="text-center">
            <router-link
              :to="{ path: 'jenis' }"
              class="btn btn-default btn-block b1"
              ><b-icon icon="folder-check"></b-icon><br />Prodi</router-link
            >
          </b-col>
          <b-col class="text-center">
            <router-link
              :to="{ path: 'jeniskuota' }"
              class="btn btn-default btn-block b1"
              ><b-icon icon="union"></b-icon><br />Jenis Kuota</router-link
            >
          </b-col>
        </b-row> -->
      </fieldset>
    </b-col>
    <b-col cols="12" md="6" class="mt10">
      <fieldset class="menu-border">
        <legend class="menu-border">Grafik</legend>
      </fieldset>
    </b-col>
  </b-row>
</template>
<style lang="scss">
// fieldset.menu-border {
//   border: 1px groove #ddd !important;
//   padding: 0 1.4em 1.4em 1.4em !important;
// //   margin: 0 0 1.5em 0 !important;
//   -webkit-box-shadow: 0px 0px 0px 0px #000;
//   box-shadow: 0px 0px 0px 0px #000;
// }

// legend.menu-border {
//   font-size: 1.2em !important;
//   font-weight: bold !important;
//   text-align: left !important;
//   width: auto;
//   padding: 0 10px;
// //   border-bottom: none;
// }
fieldset.menu-border {
  border: 1px solid #ccc !important;
  border-radius: 15px 15px 0px 0px;
  min-height: 100px;
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

body {
  margin: 0px;
}
div {
  box-sizing: border-box;
}
.icon-wrap {
  display: inline-block;
  padding: 10px;
  width: 80px;
  height: 70px;
}
.icon-wrap > div {
  position: absolute;
  background-color: lightgray;
  height: 50px;
  width: 58px;
  display: block;
  border-radius: 15px/30px;
  background: rgb(247, 247, 247);
  background: -moz-linear-gradient(
    top,
    rgba(247, 247, 247, 1) 0%,
    rgba(229, 229, 229, 1) 100%
  );
  background: -webkit-linear-gradient(
    top,
    rgba(247, 247, 247, 1) 0%,
    rgba(229, 229, 229, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(247, 247, 247, 1) 0%,
    rgba(229, 229, 229, 1) 100%
  );
//   filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#f7f7f7', endColorstr='#e5e5e5', GradientType=0);
}
.icon-wrap > div:before {
  content: "";
  display: inline-block;
  position: relative;
  z-index: -1;
  height: 59px;
  width: 48px;
  left: 5px;
  top: -5px;
  background-color: lightgray;
  border-radius: 30px/15px;
  background: rgb(247, 247, 247);
  background: -moz-linear-gradient(
    top,
    rgba(247, 247, 247, 1) 0%,
    rgba(229, 229, 229, 1) 100%
  );
  background: -webkit-linear-gradient(
    top,
    rgba(247, 247, 247, 1) 0%,
    rgba(229, 229, 229, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(247, 247, 247, 1) 0%,
    rgba(229, 229, 229, 1) 100%
  );
//   filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#f7f7f7', endColorstr='#e5e5e5', GradientType=0);
}
.icon-wrap > div > img {
  position: relative;
  width: 40px;
  height: 40px;
  top: -60px;
  left: 9px;
}
</style>
