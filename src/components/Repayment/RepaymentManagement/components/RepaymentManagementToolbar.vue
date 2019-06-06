<template>
  <div id="search">
    <!-- 搜索借款方 -->
    <div style="padding: 10px 0">
      <el-input
        clearable
        placeholder="搜索借款方"
        prefix-icon="el-icon-search"
        v-model="search.name"
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
        v-model="search.phone"
        style="width: 200px; margin-right: 10px"
      >
      </el-input>
    </div>

    <!-- 选择状态 -->
    <div style="padding: 10px 0">
      <el-select v-model="search.state" clearable placeholder="请选择">
        <el-option
          v-for="item in stateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div>
      <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>


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
</style>

<script>
export default {
  props: ["search"],
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