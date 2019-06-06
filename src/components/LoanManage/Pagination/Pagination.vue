<template>
  <div class="wrapper">
    <el-pagination
      @size-change="handleSizeChangeFun"
      @current-change="handleCurrentChangeFun"
      background
      layout="total, sizes, prev, pager, next"
      :total="total"
      :page-size="5"
      :page-sizes="[5, 10, 15, 20]">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "Pagination",
      props:{
        handleSizeChange:Function,
        handleCurrentChange:Function,
        total:Number
      },
      methods:{
        handleSizeChangeFun(){
          this.$emit("handleSizeChange");
        },
        handleCurrentChangeFun(){
          this.$emit("handleCurrentChange");
        }
      }
    }
</script>

<style scoped>
  .wrapper{
    position: relative;
  }
  .el-pagination{
    position: absolute;
    bottom: -60px;
  }
</style>
