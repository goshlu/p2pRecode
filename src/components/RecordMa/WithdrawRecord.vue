<template>
  <div id="withdraw_app">
    <Title :navArr="navArr"/>
    <div class="app_content">
      <div id="nav">
        <div class="one">
          <!-- 搜索框 -->
          <Search :searchOpt="searchOpt"/>
          <!-- 导出 -->
          <div class="export" >
            <el-select v-model="value" placeholder="批量导出" class="exportWidth">
              <el-option @click="exportExcel" label="导出全部" value="1"></el-option>
              <el-option label="导出选中" value="2"></el-option>
            </el-select>
          </div>
        </div>
        <div class="two">
          <!-- 选择充值方式 -->
          <Mode :modeOpt="modeOpt"/>
          <!-- 选择状态
          <Status :statusOpt="statusOpt"/> -->
          <!-- 日期选择器 -->
          <DatePicke/>
          <!-- 自定义列 -->
          <el-row class="customize">
            <el-button plain @click="toggle">自定义列</el-button>
          </el-row>
        </div>
      </div>

      <!-- 穿梭框 -->
      <div id="filterColumn" v-if="isshow">
        <template>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox
              v-for="(city,index) in cities"
              :label="city"
              v-model="checkArr[index]"
              :key="city"
            >{{city}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </div>

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
            <el-table-column prop="payNumber" label="提现单号" ></el-table-column>
            <el-table-column prop="pePhone" label="用户手机" ></el-table-column>
            <el-table-column prop="username" label="真实姓名" ></el-table-column>
            <!-- <el-table-column prop="loan_ deadline" label="用户类型" ></el-table-column> -->
            <el-table-column prop="orMoney" label="提现金额" ></el-table-column>
            <!-- <el-table-column prop="loan_money" label="提现手续费" ></el-table-column> -->
            <!-- <el-table-column prop="loan_money" label="到账金额"  ></el-table-column> -->
            <!-- <el-table-column prop="loan_money" label="银行账号" ></el-table-column> -->
            <!-- <el-table-column prop="loan_money" label="银行名称" ></el-table-column> -->
            <!-- <el-table-column prop="loan_money" label="银行流水号" ></el-table-column> -->
            <!-- <el-table-column label="提交时间" width="160">
              <template slot-scope="scope">
                <p>{{ scope.row.loan_date | dateFormat }}</p>
              </template>
            </el-table-column> -->
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
            </el-table-column> -->
            <el-table-column label="状态">提现成功</el-table-column>
            <el-table-column prop="do" label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-view" size="mini"
                  @click="handleView(scope.$index, scope.row)" >查看</el-button>
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

const cityOptions = [
  "充值单号",
  "用户手机",
  "真实姓名",
  "充值金额",
  "到账金额",
  "手续费",
  "充值方式",
  "订单时间",
  "到账时间",
  "状态"
];

export default {
  name: "WithdrawRecord",
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
      checkArr: [1, 1, 1],
      checkAll: false,
      cities: cityOptions,
      isIndeterminate: true,
      isshow: false,
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
      statusOpt: [
        { value: 1, label: "全部状态" },
        { value: 2, label: "已撤销" },
        { value: 3, label: "待审核" },
        { value: 4, label: "已到账" },
        { value: 5, label: "已拒绝" },
        { value: 6, label: "提现处理中" },
        { value: 7, label: "提现失败" }
      ],
      checkedCities: [
        "充值单号",
        "用户手机",
        "真实姓名",
        "充值金额",
        "到账金额",
        "手续费",
        "充值方式",
        "订单时间",
        "到账时间",
        "状态"
      ],
      navArr: ["资金管理", "提现记录"]
    };
  },

  methods: {
    // 查看
    handleView: function(row) {
      window.sessionStorage.setItem("rows", JSON.stringify(row));
      console.log(this.$router);
      this.$router.push({name:"Details",params:{navArr: ["资金管理", "提现记录", "提现记录详情"]}});
    },
    // 筛选列 显示隐藏
    toggle() {
      this.isshow = !this.isshow;
    },
    // 筛选列 全选
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },

    //  分页
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
    this.Axios.get("http://172.16.6.60:8080/order/orders/info")
      .then(res => {
        this.tableData = res.data.data;
        console.log(this.tableData);
        this.total = this.tableData.length;
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
#nav .one,
#nav .two {
  position: relative;
}
.export,
.customize {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 15px;
  display: inline-block;
}
</style>
