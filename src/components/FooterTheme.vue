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
  height: 50px;
  color: #ccc;
  position: relative;
  bottom: 0;
  text-align: center;
  font-weight: bold;
  //   border-top: 1px solid #000;
  //   border-collapse: collapse;
  padding-top: 10px;
  // margin-top: 10px;
  background: rgb(2, 0, 36);

  background: linear-gradient(
    90deg,
    rgb(65, 65, 219) 0%,
    rgb(60, 20, 60) 35%,
    rgb(65, 65, 219) 100%
  );
}
</style>
