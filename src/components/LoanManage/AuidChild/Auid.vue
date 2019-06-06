<template>
  <!-- 表格 -->
  <div class="wrapper">
    <div class="wrapper-content">
      <div class="title">
        <h2>借款审核</h2>
      </div>
      <search></search>
      <el-table
        :data="tableData"
        :stripe="true"
        :border="false"
        ref="multipleTable"
        tooltip-effect="dark"
        align="center"
        style="width:100%"
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
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" algin="center" size="small">
              <router-link :to="{name:'Examine'}">审核</router-link>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
import search from "../Child/search";
export default {
  name: "Auid",
  data() {
    return {
      tableData: [],
      allTableData: [],
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next" // 翻页属性
      }
    };
  },
  components: {
    search
  },
  beforeMount() {
    this.getTableList();
  },
  methods: {
    handleClick(row) {
      this.$router.push("/NewLoans");
    },
    getTableList() {
      this.Axios.get("https://5cf615c346583900149cb2b9.mockapi.io/Loans").then(
        res => {
          this.allTableData = res.data;
          this.setPaginations();
        }
      );
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
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  /* padding-top: 20px; */
  margin: 0 auto;
}
.wrapper-content {
  width: 100%;
  margin: 0 auto;
}
.el-table {
  margin-top: 20px;
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
.pagination{
  text-align: left;
  margin-top:10px;
}
</style>