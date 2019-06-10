<template>
  <div class="block">
    <p>共{{count}}条</p>
    <el-pagination
      background
      :current-page.sync="search.limit"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="search.page"
      layout="sizes, total, prev, pager, next" jumper :total="count">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props:["search","count"],
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