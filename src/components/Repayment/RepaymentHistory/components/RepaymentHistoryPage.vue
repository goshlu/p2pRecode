<template>
  <div class="block">
    <p>共100条</p>
    <el-pagination
      background
      @size-change="handleSizeChange"
      :current-page.sync="currentPage1"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="sizes, prev, pager, next" jumper :total="500">
    </el-pagination>
  </div>
</template>

<style>
.block{
  padding:20px;
  height:40px;
}
#pages{
   display: flex;
   justify-content: center;
}
p{
  float:left;
}
.el-pagination{
  float: right;
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