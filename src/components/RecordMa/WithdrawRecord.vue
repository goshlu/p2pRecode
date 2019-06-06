<template>
  <div id="withdraw_app">
    <div class="title">
      <h2>提现记录</h2>
    </div>
    <div id="nav">
      <div class="one">
        <!-- 搜索框 -->
        <Search :searchOpt="searchOpt"/>
        <!-- 导出按钮 el-icon-download -->
        <el-select size="mini" v-model="value2" filterable placeholder="导出">
            <el-option
              v-for="item in options2"
              :key="item.value2"
              :label="item.label"
              :value="item.value2"
            ></el-option>
          </el-select>
        <el-row class="export" style="margin-right: 0; margin-top: 15px; display: inline-block;">
          <el-button plain @click="exportExcel">导出</el-button>
        </el-row>
      </div>
      <div class="two">
        <!-- 选择充值方式 -->
        <Mode :modeOpt="modeOpt"/>
        <!-- 选择状态 -->
        <Status :statusOpt="statusOpt"/>
        <!-- 日期选择器 -->
        <DatePicke/>
        <!-- 自定义列 -->
        <el-row class="customize" style="margin-top: 15px; display: inline-block;">
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
        <!-- <div class="title"><h2>招标管理</h2></div> -->
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          stripe
          :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5'}"
          style="width: 100%"
        >
          <el-table-column v-show="checkArr[0]" fixed prop="loan_id" label="充值单号" width="120"></el-table-column>
          <el-table-column v-show="checkArr[1]" prop="loan_money" label="用户手机" width="120"></el-table-column>
          <el-table-column prop="loan_money" label="真实姓名" width="100"></el-table-column>
          <el-table-column prop="loan_ deadline" label="用户来源" width="120"></el-table-column>
          <el-table-column prop="loan_ deadline" label="应用来源" width="100"></el-table-column>
          <el-table-column prop="loan_money" label="充值金额" width="100"></el-table-column>
          <el-table-column prop="loan_money" label="到账金额" width="100"></el-table-column>
          <el-table-column prop="loan_money" label="手续费" width="80"></el-table-column>
          <el-table-column prop="loan_money" label="充值方式" width="100"></el-table-column>
          <el-table-column prop="loan_money" label="交易流水号" width="150"></el-table-column>
          <el-table-column label="订单时间" width="160">
            <template slot-scope="scope">
              <p>{{ scope.row.loan_date | dateFormat }}</p>
            </template>
          </el-table-column>
          <el-table-column label="到账时间" width="160">
            <template slot-scope="scope">
              <p>{{ scope.row.loan_date | dateFormat }}</p>
            </template>
          </el-table-column>
          <el-table-column fixed="right" prop="status" label="状态" width="100"></el-table-column>
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
    DatePicke
    // Atable
  },

  data() {
    return {
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
      ]
    };
  },

  methods: {
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
#withdraw_app {
  margin: 0 auto;
  padding: 0;
  position: relative;
}
#withdraw_app > #nav {
  width: 100%;
}
#filterColumn {
  width: 200px;
  /* height: 300px; */
  background-color: white;
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
#nav .one,#nav .two {
  position: relative;
}
.export,.customize {
  position: absolute;
  top: 0;
  right: 0;
}

</style>
