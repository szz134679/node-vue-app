<template>
  <div class="index">
    <head-nav></head-nav>
    <left-meun></left-meun>
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeadNav from "../components/Headnav.vue";
import LeftMeun from "../components/LeftMeun.vue";
export default {
  data() {
    return {};
  },
  components: {
    HeadNav,
    LeftMeun,
  },
};
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>