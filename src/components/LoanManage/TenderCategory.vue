<template>
  <div id="tender-category-home">
    <h1 style="margin-bottom: 20px;">借款标类别</h1>

    <div class="add-btn">
      <MyButton btn-type="" btn-text="添加分类" icon-class="el-icon-plus"></MyButton>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      :cell-style="{border:'none'}"
      :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5'}"
    >
      <el-table-column
        prop="zip"
        label="分类名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="zip"
        label="排序"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="zip"
        label="状态"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small">
            <router-link :to="{name:'TenderFullReviewRedo',params:{row:scope.row}}">修改</router-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination></Pagination>

  </div>
</template>

<script>
  import Pagination from './Pagination/Pagination';
  import MyButton from './Button/Button';

  export default {
    name: "TenderCategory",
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

  #tender-category-home{
    position: relative;
    margin: 50px auto 0;
  }
  #tender-category-home >>> .pagination-dom{
    /*right: 0;
    bottom: -15%;*/
  }
  #tender-category-home .add-btn{
    margin-bottom: 30px;
  }
  #tender-category-home .add-btn >>> .el-button{
    height: 40px;
  }
</style>
