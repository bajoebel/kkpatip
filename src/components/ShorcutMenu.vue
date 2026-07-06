<template>
  <b-row>
    <b-col cols="12" class="mt10">
      <fieldset class="menu-border">
        <legend class="menu-border">Menu Utama</legend>

        <div class="menu-grid" v-if="menus.length">
          <router-link
            v-for="item in menus"
            :key="item.route"
            :to="'/' + item.route"
            class="menu-card"
          >
            <div class="menu-icon-wrap">
              <b-icon :icon="resolveIcon(item.icon)" class="menu-icon" />
            </div>
            <div class="menu-title">{{ item.menunama }}</div>
          </router-link>
        </div>

        <b-alert show variant="warning" v-else>
          Menu belum tersedia untuk akun ini.
        </b-alert>
      </fieldset>
    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";

export default {
  name: "ShorcutMenu",
  data: () => ({
    menus: [],
  }),
  mounted() {
    this.loadMenus();
  },
  methods: {
    async loadMenus() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.menus = [];
        return;
      }

      await axios
        .request({
          headers: {
            Authorization: `Bearer ` + token,
          },
          method: "GET",
          url: `me`,
        })
        .then((response) => {
          this.menus = response?.data?.info?.menu || [];
        })
        .catch(() => {
          this.menus = [];
        });
    },
    resolveIcon(iconName) {
      return iconName || "grid-1x2-fill";
    },
  },
};
</script>

<style lang="scss" scoped>
fieldset.menu-border {
  border: 1px solid #dbeafe !important;
  border-radius: 14px;
  min-height: 100px;
  padding: 12px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.06);
}

legend.menu-border {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  float: none;
  font-size: 1rem !important;
  font-weight: 600 !important;
  text-align: left !important;
  padding: 6px 14px;
  border: 1px solid #c7d2fe;
  border-radius: 999px;
  margin-left: 4px;
  background: linear-gradient(90deg, #eef2ff 0%, #e0f2fe 100%);
  color: #334155;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 14px;
  margin-top: 8px;
}

.menu-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 14px 10px;
  border-radius: 16px;
  border: 1px solid #dbeafe;
  background: linear-gradient(180deg, #ffffff 0%, #eff6ff 100%);
  box-shadow: 0 8px 18px rgba(59, 130, 246, 0.14);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.menu-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 22px rgba(37, 99, 235, 0.2);
}

.menu-icon-wrap {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  margin-bottom: 8px;
}

.menu-icon {
  font-size: 1.4rem;
  color: #1d4ed8;
}

.menu-title {
  text-align: center;
  font-size: 0.78rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.2;
}
</style>
