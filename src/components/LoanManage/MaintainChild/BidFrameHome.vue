<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <!-- <div class="title">
        <h2>标的上架</h2>
      </div> -->
    <Title nav="贷款管理" navItem="新增贷款"/>
      <!-- search -->
      <div class="searchWrap">
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="借款方" value="1"></el-option>
              <el-option label="借款方手机" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <!-- table -->
      <el-table
        :data="tableDataList"
        :stripe="true"
        :border="false"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width:100%"
        :header-cell-style="{color:'#333',backgroundColor:'#e9e9eb'}"
      >
        <el-table-column prop="id" label="编号" align="center"></el-table-column>
        <el-table-column prop="loan_user" label="借款方" align="center"></el-table-column>
        <el-table-column prop="loan_phone" label="借款人手机" align="center"></el-table-column>
        <el-table-column prop="loan_name" label="标名" align="center"></el-table-column>
        <el-table-column prop="loan_type" label="类型" align="center"></el-table-column>
        <el-table-column prop="loan_money" label="借款金额" align="center"></el-table-column>
        <el-table-column prop="payments_mode" label="还款方式" align="center"></el-table-column>
        <el-table-column prop="loan_deadline" label="期限" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-button type="text" align="center" size="small">
              <router-link :to="{name:'Maintain'}">上架</router-link>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="pagination">
        <el-pagination
          background
          v-if="paginations.total > 0"
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
import Title from "./../../commonComponents/headerTitle"

export default {
  name: "BidFrameHome",
  components: {
    Title
  },
  data() {
    return {
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next" // 翻页属性
      },
      input5: "",
      select: "",
      tableDataList: [],
      tableData: []
    };
  },
  created() {
    this.Axios.get("https://5cf615c346583900149cb2b9.mockapi.io/Loans")
      .then(res => {
        // console.log(res);
        this.tableData = res.data;
        this.setPaginations();
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    // 实现切换当前页数据长度的方法
    handleSizeChange(page_size) {
      //切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableDataList = this.tableData.filter((item, index) => {
        return index < page_size;
      });
    },

    //实现相应页面展示相应数据
    handleCurrentChange(page) {
      //获取当前页的索引
      let index = this.paginations.page_size * (page - 1);
      //获取总数
      let nums = this.paginations.page_size * page;
      //容器
      let tables = [];
      this.tableDataList = [];
      for (let i = index; i < nums; i++) {
        console.log(this.tableData[i]);
        if (this.tableData[i]) {
          this.tableDataList.push(this.tableData[i]);
        }
      }
    },

    //分页初始化
    setPaginations() {
      // 总页数
      this.paginations.total = this.tableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // console.log(this.tableData);
      // 设置默认分页数据
      this.tableDataList = this.tableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    }
  }
};
</script>

<style scoped>
/* table */
.wrapper {
  width: 100%;
  margin: 0 auto;
}
.wrapper-content {
  width: 100%;
  margin: 0 auto;
}
.el-table {
  margin-top: 20px;
}
/* .title {
  width: 100%;
  height: 40px;
  background-color: #006d75;
} */
h2 {
  color: #fff;
  line-height: 40px;
  margin-left: 10px;
}
.searchWrap {
  display: flex;
}
.searchWrap > div {
  flex-basis: 30%;
}
.searchWrap >>> .el-select .el-input {
  width: 130px;
}
.searchWrap >>> .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
/* 分页 */
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>