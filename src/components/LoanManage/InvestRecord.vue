<template>
  <div id="invest-wrap">
    <h1 style="margin-bottom: 20px;">投资记录</h1>

    <div class="searchWrap">
      <div class="flex-item">
        <div class="searchDiff">
          <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
            <el-select v-model="searchSel" slot="prepend" placeholder="请选择" @change="searchSelectChange">
              <el-option
                v-for="item in searchOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="executeSearch"></el-button>
          </el-input>
        </div>

        <div class="searchTypes">
          <el-select v-model="typeValue" slot="prepend" placeholder="请选择" @change="">
            <el-option
              v-for="item in allType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <el-date-picker
          v-model="dateRangeValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="datePicker"
        >
        </el-date-picker>
      </div>
      <div class="flex-item">
        <MyButton btn-type="" btn-text="自定义列" ></MyButton>
        <MyButton btn-type="" btn-text="导出" ></MyButton>
      </div>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      :cell-style="{border:'none'}"
      :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5'}"
    >
      <el-table-column
        fixed
        prop="date"
        label="标的编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="投资人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="投资人手机"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="标名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="投资金额"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="利息"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="利息管理费"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="收益方式"
        width="90">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="已收金额"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="待收总额"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="投资渠道"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="投资时间"
        width="80">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="投资状态"
        width="80">
      </el-table-column>
    </el-table>

    <Pagination></Pagination>

  </div>
</template>

<script>
  import Pagination from './Pagination/Pagination';
  import MyButton from './Button/Button';

  export default {
    name: "InvestRecord",
    components:{
      Pagination,
      MyButton
    },
    created(){
      this.tableDataOrigin = this.tableData;

    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      executeSearch(){
        if(this.searchSel == 0){
          this.tableData = this.tableDataOrigin;
        }else if(this.searchSel == 1 && this.searchText != ""){ //搜索借款方
          this.tableData = this.tableDataOrigin.filter(item => {
            return item.name.includes(this.searchText);
          })
        }else if(this.searchSel == 2 && this.searchText != ""){ //搜索借款方手机

        }else{
          return this.$message('请输入搜索内容！');
        }
      },
      searchSelectChange(){
        if(this.searchSel == 0) this.executeSearch();
      }
    },
    data() {
      return {
        searchText:"",
        searchSel:0,
        searchOpt: [
          { value: 0, label: "全部" },
          { value: 1, label: "投资人手机" },
          { value: 2, label: "借款名称" },
        ],
        allType:[
          { value: 0, label: "全部状态" },
          { value: 1, label: "待回款" },
          { value: 2, label: "已结算" },
          { value: 3, label: "撤标" },
          { value: 4, label: "流标" },
          { value: 5, label: "投资中" },
          { value: 6, label: "投资失败" }
        ],
        typeValue:0,
        dateRangeValue:"",
        tableDataOrigin:[],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王大虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王大虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]
      }
    }
  }
</script>

<style scoped>

  #invest-wrap{
    position: relative;
    margin: 50px auto 0;
  }
  #invest-wrap >>> .pagination-dom{
    right: 0;
    bottom: -15%;
  }
  #invest-wrap >>> .searchWrap{
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  #invest-wrap >>> .searchWrap .searchDiff{
    /*flex-basis: 40%;*/
    flex-grow: 0;
  }
   #invest-wrap .searchWrap .searchDiff >>> .el-select .el-input {
     width: 80px;
   }
  #invest-wrap .searchWrap .searchTypes >>> .el-select .el-input {
    width: 110px;
    margin: 0 10px;
  }

  #invest-wrap >>> .searchWrap  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  #invest-wrap .flex-item{
    display: flex;
  }
  #invest-wrap .flex-item:nth-child(1){
    justify-content: space-around;
  }
  #invest-wrap .flex-item >>> .el-button{
    height: 40px;
  }
  #invest-wrap .datePicker{
    width: 245px;
  }
</style>
