<template>
  <div id="review_app">
    <Title :navArr="navArr"/>
    <div class="app_content">
      <div id="nav" style="display: block; width: 100%">
        <div class="one">
          <!-- 搜索框 -->
          <Search :searchOpt="searchOpt"/>
          <!-- 导出 -->
          <div class="export">
            <el-select v-model="value" placeholder="批量导出" class="exportWidth">
              <el-option @click="exportExcel" label="导出全部" value="1"></el-option>
              <el-option label="导出选中" value="2"></el-option>
            </el-select>
          </div>
        </div>
        <div class="two">
          <!-- 选择方式 -->
          <Mode :modeOpt="modeOpt"/>
          <!-- 日期选择器 -->
          <DatePicke/>
        </div>
      </div>

      <!-- 表格 -->
      <div id="WithdrawReview" class="wrapper" style="padding-top: 30px;display: block;">
        <div class="wrapper-content">
          <!-- <div class="title"><h2>招标管理</h2></div> -->
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5'}"
            style="width: 100%"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="loan_id" label="提现单号"></el-table-column>
            <!-- <el-table-column prop="loan_money" label="用户手机" ></el-table-column> -->
            <el-table-column prop="loan_money" label="真实姓名"></el-table-column>
            <!-- <el-table-column prop="loan_ deadline" label="用户类型" ></el-table-column> -->
            <el-table-column prop="loan_money" label="提现金额"></el-table-column>
            <el-table-column prop="loan_money" label="提现手续费"></el-table-column>
            <el-table-column prop="loan_money" label="预计到账金额"></el-table-column>
            <el-table-column prop="loan_money" label="银行账号"></el-table-column>
            <!-- <el-table-column prop="loan_money" label="银行名称" ></el-table-column> -->
            <!-- <el-table-column label="提交时间" width="160">
              <template slot-scope="scope">
                <p>{{ scope.row.loan_date | dateFormat }}</p>
              </template>
            </el-table-column>-->
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column label="操作" width="200px">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-view" 
                  @click="handleView(scope.$index, scope.row)"  >查看</el-button>
                <el-button size="mini"  type="primary" icon="el-icon-edit" 
                  @click="handleClick(scope.$index, scope.row)" >审核</el-button>
              </template>
              <!-- <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-view" size="mini" 
              @click="handleView(scope.$index, scope.row)">查看</el-button>
              <el-button type="primary" icon="el-icon-edit" size="mini" 
              @click="handleClick(scope.row)">审核</el-button>
              </template>-->
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
  </div>
</template>

<script>
import Title from "./../commonComponents/headerTitle";
import FileSaver from "file-saver";
import XLSX from "xlsx";

import Search from "./Subassembly/Search.vue";
import Mode from "./Subassembly/Mode";
import Status from "./Subassembly/Status";
// import Atable from "./Subassembly/Atable";
import Pagination from "./Subassembly/Pagination";
import DatePicke from "./Subassembly/DatePicke";

export default {
  name: "Withdraw",
  components: {
    Search,
    Mode,
    Status,
    Pagination,
    DatePicke,
    Title
    // Atable
  },
  data() {
    return {
      value: "",
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
        { value: 1, label: "提现单号" },
        { value: 2, label: "用户手机" },
        { value: 3, label: "账户名" },
        { value: 4, label: "银行账号" }
      ],
      modeOpt: [
        { value: 1, label: "全部银行" },
        { value: 2, label: "中国银行" },
        { value: 3, label: "中国农业银行" },
        { value: 4, label: "中国工商银行" },
        { value: 5, label: "中国建设银行" },
        { value: 6, label: "交通银行" },
        { value: 7, label: "中信银行" },
        { value: 8, label: "中国光大银行" },
        { value: 9, label: "招商银行" },
        { value: 10, label: "华夏银行" }
      ],
      navArr: ["资金管理", "提现审核"]
    };
  },

  methods: {
    // 查看
    handleView: function(row) {
      window.sessionStorage.setItem("rows", JSON.stringify(row));
      console.log(this.$router);
      this.$router.push({name:"Details",params:{navArr: ["资金管理", "提现审核", "审核记录详情"]}});
    },
    // 审核
    handleClick: function(row) {
      window.sessionStorage.setItem("rows", JSON.stringify(row));
      console.log(this.$router);
      this.$router.push("/Review/Reviewdetails");
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
        document.querySelector("#WithdrawReview")
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
    this.Axios.get("http://rap2api.taobao.org/app/mock/177576/borrow")
      .then(res => {
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
el-button {
  display: inline-block;
}
#review_app {
  margin: 0 auto;
  padding: 0;
  position: relative;
}
#review_app > .app_content {
  margin: 20px;
}
#review_app > #nav {
  width: 100%;
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
</style>

