<template>
  <div style="margin-top: 15px; display: inline-block;">
    <p>方式筛选：</p>
    <el-select v-model="modeSel" placeholder="请选择">
      <el-option v-for="item in modeOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "Mode",
  props: ["modeOpt"],
  data() {
    return {
      modeSel: 1
    };
  }
};
</script>

<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
p{
  display: inline-block;
}
</style>