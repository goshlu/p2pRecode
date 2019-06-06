<template>
<!-- 搜索 -->
  <div id="search">
    <div style="padding: 10px 0px">
      <el-input v-model="input1" class="input-with-select">
        <el-select v-model="select" slot="prepend">
          <el-option label="借款方" value="1"></el-option>
          <el-option label="是否逾期" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <!-- 选择状态 -->
    <div style="padding: 10px 0">
      <el-select v-model="value" clearable placeholder="请选择">
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
  display: flex;
  justify-content: space-between;
  margin: 5px 20px;
}

.el-select {
    width: 120px;
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
      stateOptions: [{
          value: "cuikuanzhong",
          label: "催款中"
        },
        {
          value: "daihuankuan",
          label: "待还款"
        }
      ],
      value:'',
      dialogVisible: false,
      input1: '',
      input2: '',
      select:'',
    };
  },
  methods: {
      
    }
};
</script>