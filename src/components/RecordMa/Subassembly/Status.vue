<template>
  <div style="margin-top: 15px; margin-left: 30px;display: inline-block;">
    <p>状态筛选：</p>
    <el-select v-model="statusSel" class="selectWidth">
      <el-option
        v-for="item in statusOpt"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "Status",
  props: ["statusOpt"],
  data() {
    return {
      statusSel: 1,
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