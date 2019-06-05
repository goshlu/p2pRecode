<template>
  <div class="wrapper">
    <el-pagination
      background
      layout="sizes, prev, pager, next"
      :total="800" :page-sizes="[100, 200, 300, 400]">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "Pagination"
    }
</script>

<style scoped>
  .wrapper{
    position: relative;
  }
  .el-pagination{
    position: absolute;
    bottom: -60px;
    right: -10px;
  }
</style>
