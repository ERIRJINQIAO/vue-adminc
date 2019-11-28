<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        213213
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";

#main-wrap {
  height: 100vh;
//       position: fixed;
//       left: $navMeau;
//       top: 75px;
  //     right: 0;
  //     bottom: 0;
  //     border: 30px solid #f7f7f7;
  //     -webkit-box-sizing: border;
}
.main-content {
  padding-left: $navMeau;
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-right: 30px;
  background-color: #f7f7f7;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  background-color: #f7f7f7;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>