<template>
  <div id="all-wrap">
    <h1 style="margin-bottom: 20px;">所有借款标</h1>

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
        label="借款编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="借款方"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="借款人手机"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="借款名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="借款金额"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="年化利率"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="还款方式"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="期限"
        width="90">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="借款管理费月率"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="借款管理费"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="上架时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="开售时间"
        width="80">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="状态"
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
    name: "TenderAll",
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
          { value: 1, label: "借款方" },
          { value: 2, label: "借款人手机" },
        ],
        allType:[
          { value: 0, label: "全部状态" },
          { value: 1, label: "新标待审核" },
          { value: 2, label: "初审不通过" },
          { value: 3, label: "新标待上架" },
          { value: 4, label: "满标待审" },
          { value: 5, label: "还款中" },
          { value: 6, label: "已完成" },
          { value: 7, label: "流标" },
          { value: 8, label: "撤标" }
        ],
        typeValue:0,
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

  #all-wrap{
    position: relative;
    margin: 50px auto 0;
  }
  #all-wrap >>> .pagination-dom{
    /*right: 0;
    bottom: -15%;*/
  }
  #all-wrap >>> .searchWrap{
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  #all-wrap >>> .searchWrap .searchDiff{
    /*flex-basis: 40%;*/
    flex-grow: 0;
  }
  #all-wrap >>> .searchWrap  .el-select .el-input {
    width: 130px;
  }
  #all-wrap >>> .searchWrap  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  #all-wrap .flex-item{
    display: flex;
  }
  #all-wrap .flex-item .searchDiff{
    margin-right: 20px;
  }
  #all-wrap .flex-item >>> .el-button{
    height: 40px;
  }
</style>
