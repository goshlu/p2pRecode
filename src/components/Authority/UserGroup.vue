<template>
  <el-container>
    <el-header>UserGroup</el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>


<script>
export default {
  name: "UserGroup",
  template: {},
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@import url("./less/UserGroup.less");
</style>

