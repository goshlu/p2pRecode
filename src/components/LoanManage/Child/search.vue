<template>
  <div>
    <div style="margin-top: 15px; display: inline-block">
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
    <div style="margin-top: 15px; display: inline-block">
      <el-select v-model="modeSel" placeholder="请选择" class="selectWidth">
        <el-option
          v-for="item in modeOpt"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      input5: "",
      searchSel: "",
      modeSel: "",
      searchOpt: [
        { value: 1, label: "借款名称" },
        { value: 2, label: "借款方" },
        { value: 3, label: "借款人手机" }
      ],
      modeOpt: [
        { value: 2, label: "新标待审核" },
        { value: 3, label: "新增草稿" },
        { value: 4, label: "初审不通过" }
      ]
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
div > .selectWidth {
  margin-left: 20px;
}
</style>