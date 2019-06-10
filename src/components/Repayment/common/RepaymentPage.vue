<template>
  <div class="block">
    <p>共{{count}}条</p>
    <el-pagination
      background
      :current-page.sync="search.page"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="search.limit"
      layout="sizes, total, prev, pager, next" jumper :total="count">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props:["search","count"],
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