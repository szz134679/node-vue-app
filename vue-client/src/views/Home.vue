<template>
  <div class="home">
    <div class="container">
      <h1 class="title">无聊后台</h1>
      <p class="lead">学习测试</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  background: url("../assets/showcase.png") no-repeat;
  background-size: 100% 100%;
  .container {
    width: 100%;
    height: 100%;
    padding-top: 100px;
    box-sizing: border-box;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    .title {
      font-size: 24px;
    }
    .lead {
      font-size: 16px;
      margin: 20px;
    }
  }
}
</style>