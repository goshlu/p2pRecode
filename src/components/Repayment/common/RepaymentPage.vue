<template>
  <div class="block">
    <p>共{{count}}条</p>
    <el-pagination
      background
      :current-page.sync="search.page"
      :page-sizes="[5,10,20,30]"
      :page-size="search.limit"
      layout="sizes, total, prev, pager, next"
      :total="count"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: ["search", "count"],
  data(){
    return {

    }
  },
  methods:{
    handleCurrentChange(page){
      this.$emit("handleCurrentChange",page);
    },
    handleSizeChange(limit){
      console.log(limit);
      this.$emit("handleSizeChange",limit);
    }
  }
};
</script>

<style>
.block {
  padding: 20px;
  height: 40px;
}
#pages {
  display: flex;
  justify-content: center;
}
p {
  float: left;
}
.el-pagination {
  float: right;
}
</style>