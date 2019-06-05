<template>
  <div class="wrapper">
    <el-pagination
      background
      layout="sizes, prev, pager, next"
      :total="10"
      :page-sizes="[5, 10, 15, 20]"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination"
};
</script>

<style scoped>
.wrapper {
  position: relative;
}
.el-pagination {
  position: absolute;
  bottom: -100%;
  right: -10px;
  top: 10px;
}
</style>
