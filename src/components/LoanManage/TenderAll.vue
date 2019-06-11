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
          prop="borrowName"
          label="借款方"
          width="200">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="借款人手机"
          width="130">
        </el-table-column>
        <el-table-column
          prop="iName"
          label="借款名称">
        </el-table-column>
        <el-table-column
          prop="balance"
          label="借款金额">
        </el-table-column>
        <el-table-column
          prop="yearRateName"
          label="年化利率">
        </el-table-column>
        <el-table-column
          prop="refundMethod"
          label="还款方式">
        </el-table-column>
        <el-table-column
          prop="deadline"
          label="期限">
        </el-table-column>
        <el-table-column
          prop="manageMonthRateName"
          label="借款管理费月率"
          width="130">
        </el-table-column>
        <el-table-column
          prop="refundSourceName"
          label="还款来源"
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
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">新标待审核</span>
            <span v-else-if="scope.row.status == 2">初审不通过</span>
            <span v-else-if="scope.row.status == 3">新标待上架</span>
            <span v-else-if="scope.row.status == 4">满标待审</span>
            <span v-else-if="scope.row.status == 5">进行中</span>
            <span v-else-if="scope.row.status == 6">满标待审</span>
            <span v-else-if="scope.row.status == 9">流标</span>
            <span v-else-if="scope.row.status == 10">撤标</span>
          </template>
        </el-table-column>
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
  import baseUrl from "../../api/baseUrl";

  export default {
    name: "TenderAll",
    components: {
      Title
    },
    created() {
      // this.tableDataOrigin = this.tableData;
      // 获取列表 status=1&page=1&limit=5&sName=林又武&sPhone=
      /*this.Axios.get(baseUrl.BASE_URL+'/borrow/select?status=1&page=1&limit=5&sPhone=13388080808').then(res => {
        console.log(res);
        this.tableData = res.data;
        this.paginations.total = this.tableData.length;

      }).catch((err)=>{console.log(err)});*/

      this.Axios.get(baseUrl.BASE_URL + `/getTenderAll?page=${this.paginations.page_index}&limit=${this.paginations.page_size}`).then(res => {
        this.tableData = res.data.data;
        console.log(res.total);
        // 总页数
        this.paginations.total = res.data.total;

      }).catch((err) => {
        console.log(err)
      });
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      executeSearch() {
        if (this.searchSel == 1 && this.searchText != "") { //搜索借款方
          this.paginations.page_index = 1;
          this.Axios.get(baseUrl.BASE_URL + `/getTenderAll?page=${this.paginations.page_index}
          &limit=${this.paginations.page_size}&name=${this.searchText}`).then(res => {
            this.tableData = res.data.data;
            // 总页数
            this.paginations.total = res.data.total;
          }).catch((err) => {
            console.log(err)
          });
        } else if (this.searchSel == 2 && this.searchText != "") { //搜索借款方手机
          this.paginations.page_index = 1;
          this.Axios.get(baseUrl.BASE_URL + `/getTenderAll?page=${this.paginations.page_index}
          &limit=${this.paginations.page_size}&phone=${this.searchText}`).then(res => {
            this.tableData = res.data.data;
            // 总页数
            this.paginations.total = res.data.total;
          }).catch((err) => {
            console.log(err)
          });
        } else {
          return this.$message('请选择搜索类型或输入搜索内容！');
        }
      },
      handleCurrentChange(page) {
        this.paginations.page_index = page;
        this.Axios.get(baseUrl.BASE_URL + `/getTenderAll?page=${this.paginations.page_index}&limit=${this.paginations.page_size}`).then(res => {
          this.tableData = res.data.data;
          // 总页数
          this.paginations.total = res.data.total;
        }).catch((err) => {
          console.log(err)
        });
      },
      handleSizeChange(page_size) {
        // 切换size
        this.paginations.page_index = 1;
        this.paginations.page_size = page_size;
        this.Axios.get(baseUrl.BASE_URL + `/getTenderAll?page=${this.paginations.page_index}&limit=${this.paginations.page_size}`).then(res => {
          this.tableData = res.data.data;
          // 总页数
          this.paginations.total = res.data.total;
        }).catch((err) => {
          console.log(err)
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
      searchSelectChange() {
        if (this.searchSel == 0) {
          this.paginations.page_index = 1;
          this.Axios.get(baseUrl.BASE_URL + `/getTenderAll?page=${this.paginations.page_index}&limit=${this.paginations.page_size}`).then(res => {
            this.tableData = res.data.data;
            // 总页数
            this.paginations.total = res.data.total;
          }).catch((err) => {
            console.log(err)
          });
        }
      },
      //选择框
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      }
    },
    data() {
      return {
        navArr: ['借贷管理', '所有借款标'],
        multipleSelection: [],
        allTableData: [],
        modeSel: "",
        paginations: {
          page_index: 1, // 当前位于哪页
          total: 0, // 总数
          page_size: 5, // 1页显示多少条
          page_sizes: [5, 10, 15, 20], //每页显示多少条
          layout: "total, sizes, prev, pager, next" // 翻页属性
        },
        searchText: "",
        searchSel: 0,
        searchOpt: [
          {value: 0, label: "全部"},
          {value: 1, label: "借款方"},
          {value: 2, label: "借款人手机"},
        ],
        allType: [
          {value: 0, label: "全部状态"},
          {value: 1, label: "新标待审核"},
          {value: 2, label: "初审不通过"},
          {value: 3, label: "新标待上架"},
          {value: 4, label: "满标待审"},
          {value: 5, label: "还款中"},
          {value: 6, label: "已完成"},
          {value: 9, label: "流标"},
          {value: 10, label: "撤标"}
        ],
        typeValue: 0,
        tableData: []
      }
    }
  }
</script>

<style scoped>

  #all-wrap {
    position: relative;

  }

  #all-wrap .content-wrap {
    padding: 20px;
  }

  .searchWrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  .searchWrap .searchDiff {
    /*flex-basis: 40%;*/
    flex-grow: 0;
  }

  .searchWrap >>> .el-select .el-input {
    width: 130px;
  }

  .searchWrap >>> .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .flex-item {
    display: flex;
  }

  .flex-item .searchDiff {
    margin-right: 20px;
  }

  /*分页*/
  .pagination {
    text-align: right;
    margin-top: 30px;
  }
</style>
