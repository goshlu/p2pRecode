<template>
  <div class="wrapper">
    <el-pagination
      background
      layout="total, sizes, prev, pager, next"
      :total="total"
      :page-sizes="[5, 8, 10, 20, 50]"
      :page-size="pagesize"
      :current-page="currentPage"
      @size-change="handleSizeChange"
      @current-change="current_change"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pagesize", "currentPage", "current_change", "handleSizeChange"],
  data() {
    return {
     
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
.wrapper {
  margin-top:20px; 
  text-align: right;
}

</style>
