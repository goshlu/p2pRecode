<template>
  <div id="recharge_app">
    <Title :navArr="navArr"/>
    <div class="app_content">
      <div id="nav">
        <div class="sel">
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
        <!-- 筛选 -->
        <!-- 选择充值方式 -->
        <div class="mode">
          <p style="display: inline-block;">方式筛选：</p>
          <el-select v-model="modeSel" placeholder="请选择" @change="change" style="width: 130px;">
            <el-option
              v-for="item in modeOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
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
        <!-- 日期选择器  :start-placeholder="dateStart" :end-placeholder="dateEnd" -->
        <!-- <div class="dateTimePicker">
            <p>日期筛选：</p>
            <el-date-picker
              v-model="value5"
              type="datetimerange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              @change="change"
            ></el-date-picker>
        </div>-->
        <!-- 导出 -->
        <div class="export">
          <el-select v-model="value" placeholder="批量导出" class="exportWidth">
            <el-option @click="exportExcel" label="导出全部" value="1"></el-option>
            <el-option label="导出选中" value="2"></el-option>
          </el-select>
        </div>
      </div>

      <!-- 表格 -->
      <div class="wrapper" style="padding-top: 30px;" id="RechargeRecord">
        <div class="wrapper-content">
          <!-- ref="multipleTable"
          tooltip-effect="dark" 
          show-summary="true"-->
          <!-- .slice((currentPage-1)*pagesize,currentPage*pagesize) -->
          <el-table
            :data="tableData"
            stripe
            :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5'}"
            @selection-change="handleSelectionChange"
            style="width: 100%"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="payNumber" label="充值单号" width="145px"></el-table-column>
            <el-table-column prop="pePhone" label="用户手机"></el-table-column>
            <el-table-column prop="username" label="真实姓名"></el-table-column>
            <!-- <el-table-column prop="loan_ deadline" label="用户来源"></el-table-column> -->
            <!-- <el-table-column prop="loan_ deadline" label="应用来源"></el-table-column> -->
            <el-table-column prop="orMoney" label="充值金额"></el-table-column>
            <!-- <el-table-column prop="" label="到账金额"></el-table-column> -->
            <!-- <el-table-column prop="" label="手续费"></el-table-column> -->
            <el-table-column prop="payName" label="充值方式"></el-table-column>
            <el-table-column prop="number" label="交易流水号"></el-table-column>
            <el-table-column label="订单时间" width="160px">
              <template slot-scope="scope">
                <p>{{ scope.row.oraTime | dateFormat }}</p>
              </template>
            </el-table-column>
            <el-table-column label="到账时间" width="160px">
              <template slot-scope="scope">
                <p>{{ scope.row.accountTime | dateFormat }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <p>{{ scope.row.orStatus | orStatusFormate }}</p>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="do" label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button
                  type="primary "
                  icon="el-icon-view"
                  size="mini"
                  @click="handleView(scope.$index, scope.row)"
                >查看</el-button>
              </template>
            </el-table-column>-->
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

export default {
  name: "RechargeRecord",
  components: {
    // Mode,
    // Status,
    // Paginations,
    // DatePicke,
    Title
  },

  data() {
    return {
      // dateStart: "开始日期",
      // dateEnd: "结束日期",
      clearable: true,
      input5: "",
      searchSel: 0,
      modeSel: 0,
      statusSel: 0,
      tableData: [],
      currentPage: 1, // 当前页
      pagesize: 5, // 每页显示条数
      total: 0, // 总条数
      value: "",
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
        { value: 1, label: "充值单号" },
        { value: 2, label: "用户手机" }
      ],
      modeOpt: [
        { value: 0, label: "全部" },
        { value: 1, label: "支付宝支付" },
        { value: 2, label: "微信支付" },
        { value: 3, label: "银联闪付" },
        { value: 4, label: "现金" }
      ],
      statusOpt: [
        { value: 0, label: "全部状态" },
        { value: 1, label: "充值成功" },
        { value: 2, label: "充值失败" },
        // { value: 3, label: "充值处理中" }
      ],
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value5: "",
      navArr: ["资金管理", "充值记录"]
    };
  },

  methods: {
    update() {
      var sub = {
        id: "1"
      };
      this.Axios.post("http://172.16.6.72:8080/member/borrow/members", sub, {
        header: {}
      }).then(res => {
        if (res.status == 200) {
        }
      });
    },
    //  获取日期
    dateChange() {
      console.log("this.value5");
      console.log(this.value5[0]);
    },
    // 获取搜索列表 (pageSize, currentPage)
    getSearchList() {
      // number 充值单号 phone 用户手机 status 充值状态 start 开始时间 end 结束时间
      var selOpt = this.searchSel;
      if (selOpt == 0) {
        this.Axios.get("http://172.16.6.72:8080/order/orders")
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
           "http://172.16.6.72:8080/order/orders?" + selOpt + `=${this.input5}&page=1&limit=5`
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
      console.log("this.modeSel");
      console.log(this.modeSel);
      console.log("this.statusSel");
      console.log(this.statusSel);
      this.Axios.get(
        "http://172.16.6.72:8080/order/orders?type=" +
          `${this.modeSel}&status=${this.statusSel}&page=${this.currentPage}&limit=${this.pagesize}`
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
    handleView: function(index, row) {
      console.log(row);
      /* let arr = row;
      console.log("arr");
      console.log(arr); */
      window.sessionStorage.setItem("rows", JSON.stringify(row));
      // console.log(this.$router);
      this.$router.push({
        name: "Details",
        params: {
          navArr: ["资金管理", "充值记录", "充值记录详情"],
          formArr: row
        }
      });
    },
    // 全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
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
    // http://5cf61a7646583900149cb303.mockapi.io/RechargeRecord  &page=1&limit=5
    this.Axios.get(
      "http://172.16.6.72:8080/order/orders?" +
        `page=${this.currentPage}&limit=${this.pagesize}`
    )
      .then(res => {
        console.log(res);
        this.tableData = res.data.data;
        // console.log(this.tableData);
        this.total = res.data.count;
        //  this.paginations.total = res.data.total;
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
#recharge_app > .app_content {
  margin: 20px;
}
#recharge_app > #nav {
  width: 100%;
}
#nav {
  position: relative;
}
#nav .status {
  margin-left: 30px;
  display: inline-block;
}
#nav >>> .sel {
  width: 390px;
  display: inline-block;
}
#nav >>> .sel .el-select .el-input__inner {
  width: 130px;
}
#nav >>> .mode {
  margin-left: 30px;
  display: inline-block;
}
#nav > .mode > .el-select .el-input {
  width: 130px;
}
#nav >>> .dateTimePicker {
  display: inline-block;
  margin-left: 30px;
}
#nav >>> .dateTimePicker > .el-date-editor {
  width: 365px;
}
#nav >>> .dateTimePicker > p {
  display: inline-block;
}
#nav >>> .el-select .el-input {
  width: 130px;
}
#nav >>> .sel .el-input-group__prepend {
  background-color: #fff;
}
#nav >>> .input-with-select > .el-input__inner {
  width: 202px;
}
.export {
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
