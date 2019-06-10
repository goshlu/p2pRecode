<template>
<!-- 搜索 -->
  <div id="search">
    <div >
      <el-input placeholder="请输入内容" 
      prefix-icon="el-icon-search" 
      v-model="searchInput" 
      class="input-with-select"
      @input="searchImfo">
        <el-select v-model="select" slot="prepend">
          <el-option 
          v-for="item in searchOptions"
          :key="item.value"
          :label="item.lable"
          :value="item.value"
          >
          </el-option>
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
import { EventBus } from "../../bus"
export default {
  props:["search"],
  methods:{
    handleClick(row){
      console.log(row);
    },
    searchFetch(){
      if(searchOptions.label=="借款方"){
        searchInput = search.name;
        console.log("借款方");
      }
      else{
        searchInput = search.state;
        console.log("是否逾期");
      }
    },
    fetchData() {
      api(this.search).then(data => {
      this.tableData = data;
      });
    }
  },
  data() {
    return {
      searchInput: '',
      searchOptions:[
        {
          value:"借款方",
          label:"借款方"
        },
        {
          value:"是否逾期",
          label:"是否逾期"
        }
      ],
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