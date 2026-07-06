<template>
  <footer class="footer">
    <p class="text-center">copyright@2024 Politeknik ATI Padang</p>
  </footer>
</template>
<script>
export default {
  name: "FooterTheme",
};
</script>

<style lang="scss">
.footer {
  width: 100%;
  min-height: 56px;
  color: #334155;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1035;
  text-align: center;
  font-weight: 600;
  //   border-top: 1px solid #000;
  //   border-collapse: collapse;
  padding: 14px 12px;
  // margin-top: 10px;
  border-top: 1px solid rgba(148, 163, 184, 0.28);
  background: linear-gradient(100deg, rgba(191, 219, 254, 0.98) 0%, rgba(147, 197, 253, 0.96) 50%, rgba(129, 140, 248, 0.95) 100%);
  box-shadow: 0 -6px 18px rgba(30, 64, 175, 0.22);
}
</style>
