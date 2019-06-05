<template>
  <div style="margin-top: 15px;display: inline-block;">
    <!-- 搜索选项 -->
    <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
      <el-select v-model="searchSel" slot="prepend" placeholder="请选择">
        <el-option
          v-for="item in searchOpt"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: ["searchOpt"],
  data() {
    return {
      input5: "",
      searchSel: ""
    };
  }
};
</script>  

<style scope>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.input-with-select > .el-input__inner {
  width: 160px;
}
</style>