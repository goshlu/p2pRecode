<template>
<!-- 搜索 -->
   <div id="search">
    <div style="padding: 10px 0px">
      <el-input placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="memberName" 
      class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-select v-model="status">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
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
  padding:20px 20px 0px 20px;
}
.el-select{
  width: 120px;
}
body{
  padding: 0px;
  margin: 0px;
}
</style>


<script>
import { EventBus } from "../../bus";


export default {
  props:["search"],
  
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
      value:'',
      input1: '',
      input2: '',
      select: '',
    };
  }
};
</script>