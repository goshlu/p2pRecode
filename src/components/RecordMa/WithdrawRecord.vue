<template>
  <div id="withdraw_app">
    <Title :navArr="navArr"/>
    <div class="app_content">
      <div id="nav">
        <!-- 搜索框 -->
        <!-- <Search :searchOpt="searchOpt"/> -->
        <div class="sel" style="display: inline-block;">
          <!-- 搜索选项 -->
          <el-input placeholder="请输入内容" v-model="input5" :clearable=clearable>
            <el-select v-model="searchSel" slot="prepend" placeholder="请选择">
              <el-option
                v-for="item in searchOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button @click="getSearchList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <!-- 选择充值方式 -->
        <!-- <Mode :modeOpt="modeOpt"/> -->
        <!-- 选择状态
        <Status :statusOpt="statusOpt"/>-->
        <!-- 选择状态 -->
        <div class="status">
          <p style="display: inline-block;">状态筛选：</p>
          <el-select v-model="statusSel" @change="change">
            <el-option
              v-for="item in statusOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <!-- 导出 -->
        <div class="export">
          <el-select v-model="value" placeholder="批量导出" class="exportWidth">
            <el-option @click="exportExcel" label="导出全部" value="1"></el-option>
            <el-option label="导出选中" value="2"></el-option>
          </el-select>
        </div>
      </div>

      <!-- 穿梭框 -->

      <!-- 表格 -->
      <div id="WithdrawRecord" class="wrapper" style="padding-top: 30px;">
        <div class="wrapper-content">
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5'}"
            style="width: 100%"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="payNumber" label="提现单号"></el-table-column>
            <el-table-column prop="pePhone" label="用户手机"></el-table-column>
            <el-table-column prop="username" label="真实姓名"></el-table-column>
            <!-- <el-table-column prop="loan_ deadline" label="用户类型" ></el-table-column> -->
            <el-table-column prop="orMoney" label="提现金额"></el-table-column>
            <!-- <el-table-column prop="loan_money" label="提现手续费" ></el-table-column> -->
            <!-- <el-table-column prop="loan_money" label="到账金额"  ></el-table-column> -->
            <!-- <el-table-column prop="loan_money" label="银行账号" ></el-table-column> -->
            <!-- <el-table-column prop="loan_money" label="银行名称" ></el-table-column> -->
            <!-- <el-table-column prop="loan_money" label="银行流水号" ></el-table-column> -->
            <!-- <el-table-column label="提交时间" width="160">
              <template slot-scope="scope">
                <p>{{ scope.row.loan_date | dateFormat }}</p>
              </template>
            </el-table-column>-->
            <el-table-column prop="adName" label="审核人"></el-table-column>
            <el-table-column label="审核时间" width="160px">
              <template slot-scope="scope">
                <p>{{ scope.row.oraTime | dateFormat }}</p>
              </template>
            </el-table-column>
            <!-- <el-table-column label="到账时间" width="160">
              <template slot-scope="scope">
                <p>{{ scope.row.loan_date | dateFormat }}</p>
              </template>
            </el-table-column>-->
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <p>{{ scope.row.orStatus | wrStatusFormate }}</p>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="do" label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-view"
                  size="mini"
                  @click="handleView(scope.$index, scope.row)"
                >查看</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </div>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 8, 10, 20, 50]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "./../commonComponents/headerTitle";
import FileSaver from "file-saver";
import XLSX from "xlsx";

// import Search from "./Subassembly/Search.vue";
// import Mode from "./Subassembly/Mode";
// import Status from "./Subassembly/Status";
// import Atable from "./Subassembly/Atable";
// import Pagination from "./Subassembly/Pagination";
// import DatePicke from "./Subassembly/DatePicke";

export default {
  name: "WithdrawRecord",
  components: {
    // Search,
    // Mode,
    // Status,
    // Pagination,
    // DatePicke,
    Title
    // Atable
  },

  data() {
    return {
      clearable: true,
      input5: "",
      searchSel: 0,
      statusSel: 0,
      value: "",
      checkArr: [1, 1, 1],
      checkAll: false,
      isIndeterminate: true,
      isshow: false,
      tableData: [],
      currentPage: 1, // 当前页
      pagesize: 5, // 每页显示条数
      total: 0, // 总条数
      tableDatas: [
        {
          reId: "2017040031",
          userPhone: "13845456767",
          userName: "陈一",
          userSource: "Android注册",
          appSource: "IERFA2.0",
          reAmount: "￥1000.99",
          reHandlingFee: "￥10.99",
          arrivalAmount: "￥1000.99",
          reMode: "在线充值",
          tradingFlowNum: "1213213132132",
          orderTime: "2015-02-10 10:08:34",
          arrivalTime: "2015-02-10 11:08:34",
          status: "充值成功"
        }
      ],
      searchOpt: [
        { value: 0, label: "全部" },
        { value: 1, label: "提现单号" },
        { value: 2, label: "用户手机" }
      ],
      statusOpt: [
        { value: 0, label: "全部状态" },
        { value: 1, label: "提现成功" },
        { value: 2, label: "提现处理中" }
      ],
      navArr: ["资金管理", "提现记录"]
    };
  },

  methods: {
    // 获取搜索列表 (pageSize, currentPage)
    getSearchList() {
      // number 充值单号 phone 用户手机 status 充值状态 start 开始时间 end 结束时间
      var selOpt = this.searchSel;
      if (selOpt == 0) {
        this.Axios.get("http://172.16.6.72:8080/order/orders/info")
          .then(res => {
            this.tableData = res.data.data;
            console.log(res.data.data);
            this.total = res.data.count;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        var selOpt = this.searchSel === 1 ? "number" : "phone";
        this.Axios.get(
          "http://172.16.6.72:8080/order/orders/info?" +selOpt+`=${this.input5}&page=1&limit=5`
        )
          .then(res => {
            this.tableData = res.data.data;
            this.total = res.data.total;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 筛选
    change() {
      this.Axios.get(
        "http://172.16.6.72:8080/order/orders?status=" +
          `${this.statusSel}&page=${this.currentPage}&limit=${this.pagesize}`
      )
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
          this.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查看
    handleView: function(row) {
      window.sessionStorage.setItem("rows", JSON.stringify(row));
      console.log(this.$router);
      this.$router.push({
        name: "Details",
        params: { navArr: ["资金管理", "提现记录", "提现记录详情"] }
      });
    },
    // 筛选列 显示隐藏
    toggle() {
      this.isshow = !this.isshow;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },

    // handleClick(row) {
    //   console.log(row);
    // },

    // 分页
    // 每页显示条数
    handleSizeChange(val) {     
      this.pagesize = val;
      this.Axios.get(
        "http://172.16.6.72:8080/order/orders?" +
          `page=${this.currentPage}&limit=${val}`
      )
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
          this.total = res.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 当前页
    handleCurrentChange(val) {
      console.log(`当前页:` + val);
      console.log(this.pagesize);
      this.currentPage = val;
      this.Axios.get(
        "http://172.16.6.72:8080/order/orders?" +
          `page=${val}&limit=${this.pagesize}`
      )
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
          this.total = res.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 导出
    exportExcel() {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#WithdrawRecord")
      );
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: "application/octet-stream"
          }),
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }
  },

  created() {
    this.Axios.get("http://172.16.6.72:8080/order/orders/info")
      .then(res => {
        this.tableData = res.data.data;
        console.log(this.tableData);
        this.total = res.data.count;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
#withdraw_app {
  margin: 0 auto;
  padding: 0;
  position: relative;
}
#withdraw_app > .app_content {
  margin: 20px;
}
#withdraw_app > #nav {
  width: 100%;
}
#filterColumn {
  width: 200px;
  /* height: 300px; */
  background-color: white;
}
#nav {
  position: relative;
}
#nav .status {
  margin-left: 30px;
  display: inline-block;
}
#nav >>> .two > .dateTimePicker {
  display: inline-block;
  margin-left: 30px;
}
#nav >>> .two > .dateTimePicker > .el-date-editor {
  width: 365px;
}
#nav .two > .dateTimePicker > p {
  display: inline-block;
}
#nav >>> .el-select .el-input {
  width: 130px;
}
#nav >>> .sel .el-input-group__prepend {
  background-color: #fff;
}
.export,
.customize {
  position: absolute;
  top: 0;
  right: 0;
  /* margin-top: 15px; */
  display: inline-block;
}
.pagination {
  text-align: right;
  padding-top: 20px;
  padding-right: 10px;
  padding-bottom: 10px;
}
</style>
