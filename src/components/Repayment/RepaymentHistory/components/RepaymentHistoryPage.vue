<template>
  <div class="block">
      
    <el-pagination
      background
      @size-change="handleSizeChange"
      
      :current-page.sync="currentPage1"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="sizes, total, prev, pager, next" jumper :total="500">
    </el-pagination>
  </div>
</template>

<style>
#pages{
   display: flex;
   justify-content: center;
   margin: 25px;
}
.el-pagination .el-pagination__total{
    border: 1px solid #e0e0e0;
    padding: 0px 25px;
    border-radius: 5px;
    float: left;
    margin-right: 50%;
}
.el-pagination {
    margin: 20px 0px;
    margin-left: 5%;
    
}

</style>

<script>
  export default {
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      };
    }
  }
</script>