<template>
  <div style="margin-top: 15px; display: inline-block;">
    <!-- 导出选择  v-model="exportSel"  -->
    <el-select placeholder="导出" class="exportWidth">
      <el-option v-for="item in exportOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "Export",
  // props: ["exportOpt"],
  data() {
    return {
      // exportSel: 1,
      exportOpt: [
        { value: 1, label: "导出全部" },
        { value: 2, label: "导出选中" }
      ],
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
</style>