<template>
  <div id="search">
    <!-- 搜索借款方 -->
    <div style="padding: 10px 0">
      <el-input
        clearable
        placeholder="搜索借款方"
        prefix-icon="el-icon-search"
        style="width: 200px; margin-right: 10px"
      >
      </el-input>
    </div>

    <!-- 搜索借款电话 -->
    <div style="padding: 10px 0">
      <el-input
        clearable
        placeholder="搜索借款电话"
        prefix-icon="el-icon-search"
        style="width: 200px; margin-right: 10px"
      >
      </el-input>
    </div>

    <!-- 选择状态 -->
    <div style="padding: 10px 0">
      <el-select clearable placeholder="请选择">
        <el-option
          v-for="item in stateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<style>
#search{
  width: 100%;
  display: flex;
  justify-content: space-around;
}
#search>div{
  float: left;
}
body{
  padding: 0px;
  margin: 0px;
}
</style>

<script>
export default {

  data() {
    return {
      stateOptions: [
        {
          value: "cuikuanzhong",
          label: "催款中"
        },
        {
          value: "daihuankuan",
          label: "待还款"
        }
      ],
      dialogVisible: false
    };
  },
  methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
};
</script>