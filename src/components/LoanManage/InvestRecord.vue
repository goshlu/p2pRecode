<template>
  <div id="all-wrap">

    <Title :navArr="navArr"/>

    <!--<h1 style="margin-bottom: 20px;">所有借款标</h1>-->
    <div class="content-wrap">
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
          <el-button size="small">自定义列</el-button>
          <el-button size="small">导出</el-button>
        </div>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        :cell-style="{border:'none',fontSize:'14px'}"
        :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5',fontSize:'14px'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="借款编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="借款方">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="借款人手机"
          width="130">
        </el-table-column>
        <el-table-column
          prop="loan_name"
          label="借款名称">
        </el-table-column>
        <el-table-column
          prop="loan_money"
          label="借款金额">
        </el-table-column>
        <el-table-column
          prop="year_mon"
          label="年化利率">
        </el-table-column>
        <el-table-column
          prop="loan_method"
          label="还款方式">
        </el-table-column>
        <el-table-column
          prop="loan_day"
          label="期限">
        </el-table-column>
        <el-table-column
          prop="mon_mon"
          label="借款管理费月率"
          width="130">
        </el-table-column>
        <el-table-column
          prop="loan_m_money"
          label="借款管理费"
          width="100">
        </el-table-column>
        <!--<el-table-column
          prop="uptime"
          label="上架时间"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.uptime | dateFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="开售时间"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.start_time | dateFormat}}</span>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="state"
          label="状态">
        </el-table-column>
        <!--<template slot-scope="scope">
          <span v-if="scope.row.state == 1">新标待审核</span>
          <span v-else-if="scope.row.state == 2">初审不通过</span>
          <span v-else-if="scope.row.state == 3">新标待上架</span>
          <span v-else-if="scope.row.state == 4">满标待审</span>
          <span v-else-if="scope.row.state == 5">还款中</span>
          <span v-else-if="scope.row.state == 6">已完成</span>
          <span v-else-if="scope.row.state == 7">流标</span>
          <span v-else-if="scope.row.state == 8">撤标</span>
        </template>-->
      </el-table>

      <!--分页-->
      <div class="pagination">
        <el-pagination
          background
          :page-sizes="paginations.page_sizes"
          :page-size="paginations.page_size"
          :layout="paginations.layout"
          :total="paginations.total"
          :current-page.sync="paginations.page_index"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import Title from "./../commonComponents/headerTitle";

  export default {
    name: "TenderAll",
    components:{
      Title
    },
    created(){
      // this.tableDataOrigin = this.tableData;
      this.Axios.get('http://19h4o94140.51mypc.cn/tenderall').then(res => {
        console.log(res);
        this.allTableData = res.data;
        this.setPaginations();
      }).catch((err)=>{console.log(err)});
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
      },
      handleCurrentChange(page) {
        // 当前页
        let sortnum = this.paginations.page_size * (page - 1);
        let table = this.allTableData.filter((item, index) => {
          return index >= sortnum;
        });
        // 设置默认分页数据
        this.tableData = table.filter((item, index) => {
          return index < this.paginations.page_size;
        });
      },
      handleSizeChange(page_size) {
        // 切换size
        this.paginations.page_index = 1;
        this.paginations.page_size = page_size;
        this.tableData = this.allTableData.filter((item, index) => {
          return index < page_size;
        });
      },
      setPaginations() {
        // 总页数
        this.paginations.total = this.allTableData.length;
        this.paginations.page_index = 1;
        this.paginations.page_size = 5;
        // 设置默认分页数据
        this.tableData = this.allTableData.filter((item, index) => {
          return index < this.paginations.page_size;
        });
      },

      //选择框
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      }
    },
    data() {
      return {
        dateRangeValue:"",
        navArr:['借贷管理','投资记录'],
        multipleSelection: [],
        allTableData: [],
        paginations: {
          page_index: 1, // 当前位于哪页
          total: 0, // 总数
          page_size: 5, // 1页显示多少条
          page_sizes: [5, 10, 15, 20], //每页显示多少条
          layout: "total, sizes, prev, pager, next" // 翻页属性
        },
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
        tableData: [{
          id:1,
          phone:13323479765,
          loan_name:"临时借",
          year_mon:"2%",
          loan_method:"按月付息",
          loan_money:1988,
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          start_time:"2017-01-01T04:23:33.000Z",
          uptime: "2017-01-01T04:23:33.000Z",
          state: 5,
          loan_m_money: "200",
          loan_day: "5天"
        }]
      }
    }
  }
</script>

<style scoped>

  #all-wrap{
    position: relative;

  }
  #all-wrap .content-wrap{
    padding: 20px;
  }
  .searchWrap{
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .searchWrap .searchDiff{
    /*flex-basis: 40%;*/
    flex-grow: 0;
  }
  .searchWrap >>> .el-select .el-input {
    width: 130px;
  }
  .searchWrap >>> .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .flex-item{
    display: flex;
  }
  .flex-item .searchDiff{
    margin-right: 20px;
  }

  .datePicker{
    width: 245px;
    margin-left: 20px;
  }

  /*分页*/
  .pagination{
    text-align: right;
    margin-top:30px;
  }
</style>
