<template>
  <div id="recharge_app">
    <div class="title">
      <h2>充值记录</h2>
    </div>
    <div id="nav">
      <div class="one">
        <!-- 搜索框 -->
        <Search :searchOpt="searchOpt"/>
        <!-- 导出按钮 el-icon-download -->
        <!-- <el-row class="export" style="margin-right: 0; margin-top: 15px; display: inline-block;">
          <el-button plain @click="exportExcel">导出</el-button>
        </el-row> -->
      </div>
      <div class="two">
        <!-- 选择充值方式 -->
        <p>充值方式筛选：</p>
        <Mode :modeOpt="modeOpt"/>
        <!-- 选择状态 -->
        <p>状态筛选：</p>
        <Status :statusOpt="statusOpt"/>
        <!-- 日期选择器 -->
        <p>日期筛选：</p>
        <DatePicke/>
        <!-- 导出 -->
        <Export/>
      </div>
    </div>

    <!-- 表格 -->
    <div class="wrapper" style="padding-top: 30px;" id="RechargeRecord">
      <div class="wrapper-content">
        <!-- ref="multipleTable"
          tooltip-effect="dark" 
        show-summary="true"-->
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          stripe
          :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5'}"
          @selection-change="handleSelectionChange"
          style="width: 100%"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="loan_id" label="充值单号"></el-table-column>
          <el-table-column prop="loan_money" label="用户手机"></el-table-column>
          <!-- <el-table-column prop="loan_money" label="真实姓名"></el-table-column> -->
          <!-- <el-table-column prop="loan_ deadline" label="用户来源"></el-table-column> -->
          <!-- <el-table-column prop="loan_ deadline" label="应用来源"></el-table-column> -->
          <el-table-column prop="loan_money" label="充值金额"></el-table-column>
          <el-table-column prop="loan_money" label="到账金额"></el-table-column>
          <el-table-column prop="loan_money" label="手续费"></el-table-column>
          <el-table-column prop="loan_money" label="充值方式"></el-table-column>
          <el-table-column prop="loan_money" label="交易流水号"></el-table-column>
          <el-table-column label="订单时间">
            <template slot-scope="scope">
              <p>{{ scope.row.loan_date | dateFormat }}</p>
            </template>
          </el-table-column>
          <el-table-column label="到账时间">
            <template slot-scope="scope">
              <p>{{ scope.row.loan_date | dateFormat }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="do" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-view"
                size="mini"
                @click="handleView(scope.$index, scope.row)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 分页 -->
    <Pagination
      :total="total"
      :pagesize="pagesize"
      :currentPage="currentPage"
      :current_change="current_change"
      :handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";

import Search from "./Subassembly/Search.vue";
import Mode from "./Subassembly/Mode";
import Status from "./Subassembly/Status";
import Export from "./Subassembly/Export";
// import Atable from "./Subassembly/Atable";
import Pagination from "./Subassembly/Pagination";
import DatePicke from "./Subassembly/DatePicke";

export default {
  name: "RechargeRecord",
  components: {
    Search,
    Mode,
    Status,
    Export,
    Pagination,
    DatePicke
    // Atable
  },

  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 5,
      total: 0,
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
        { value: 1, label: "充值单号" },
        { value: 2, label: "用户手机" }
      ],
      modeOpt: [
        { value: 1, label: "全部" },
        { value: 2, label: "支付宝" },
        { value: 3, label: "微信" },
        { value: 4, label: "在线充值" },
        { value: 5, label: "银行转账" }
      ],
      statusOpt: [
        { value: 1, label: "全部状态" },
        { value: 2, label: "充值成功" },
        { value: 3, label: "充值失败" },
        { value: 4, label: "充值处理中" }
      ]
    };
  },

  methods: {
    // 查看
    handleView(index, row) {
        console.log(index, row);
      },
    // 全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页
    handleClick(row) {
      console.log(row);
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
    },

    // 导出
    exportExcel() {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#RechargeRecord")
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
    // http://5cf61a7646583900149cb303.mockapi.io/RechargeRecord
    this.Axios.get("http://rap2api.taobao.org/app/mock/177576/borrow")
      .then(res => {
        console.log(res);
        this.tableData = res.data.datas.data;
        this.total = this.tableData.length;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
#recharge_app {
  margin: 0 auto;
  padding: 0;
  position: relative;
}
#recharge_app > #nav {
  width: 100%;
}
.title {
  width: 100%;
  height: 40px;
  background-color: #006d75;
}
h2 {
  color: #fff;
  margin-left: 10px;
  line-height: 40px;
}
#nav .one,
#nav .two {
  position: relative;
}
.export {
  position: absolute;
  top: 0;
  right: 0;
}
.two 
</style>
