<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <Title :navArr="navArr"/>
      <div class="searchWrap">
        <div style="margin-top: 20px;margin-left: 20px">
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" clearable>
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="借款方" value="1"></el-option>
              <el-option label="借款方手机" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="serachShow"></el-button>
          </el-input>
        </div>
        <div style="margin-top: 20px;margin-left: 20px">
          <el-select
            v-model="modeSel"
            placeholder="状态筛选"
            class="selectWidth"
            @change="statusChange"
          >
            <el-option v-for="item in modeOpt" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <!-- 导出 -->
        <div class="export" style>
          <el-select v-model="value" placeholder="批量导出" class="exportWidth">
            <el-option label="导出全部" value="1"></el-option>
            <el-option label="导出选中" value="2"></el-option>
          </el-select>
        </div>
      </div>
      <el-table
        v-if="getDataModule1.data"
        :data="getDataModule1.data"
        :stripe="true"
        :border="false"
        ref="multipleTable"
        tooltip-effect="dark"
        :header-cell-style="{color:'#333',backgroundColor:'#e9e9eb'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号" align="center"></el-table-column>
        <el-table-column prop="borrowName" label="借款方" align="center" width="180"></el-table-column>
        <el-table-column prop="phone" label="借款人手机" align="center"></el-table-column>
        <el-table-column prop="iName" label="标名" align="center"></el-table-column>
        <el-table-column prop="borrowTypeName" label="类型" align="center"></el-table-column>
        <el-table-column prop="balance" label="借款金额" align="center"></el-table-column>
        <el-table-column prop="refundMethod" label="还款方式" align="center" width="160"></el-table-column>
        <el-table-column prop="deadline" label="期限" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.deadline + scope.row.deadlineTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">新标待审核</span>
            <span v-else-if="scope.row.status == 2">新标草稿</span>
            <span v-else>初审不通过</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              icon="el-icon-view"
              size="mini"
            >审核</el-button>
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
import Title from "./../../commonComponents/headerTitle";
import baseUrl from "../../../api/baseUrl";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Stence",
  components: {
    Title
  },
  data() {
    return {
      tableData: [
        {
          id: "1"
        }
      ],
      allTableData: [],
      value: "",
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next" // 翻页属性
      },
      navArr: ["借贷管理", "借款审核"],
      modeOpt: [
        { id: 0, name: "全部状态" },
        { id: 1, name: "新标待审核" },
        { id: 2, name: "新增草稿" },
        { id: 3, name: "初审不通过" }
      ],
      modeSel: "",
      input5: "",
      select: ""
    };
  },
  created() {
    if (this.getDataModule1.total > 0) {
      console.log(this.getDataModule1);
      // 总页数
      this.paginations.total = this.getDataModule1.total;
    } else {
      this.getTableList();
    }
  },
  computed: {
    ...mapGetters(["getDataModule1"])
  },
  methods: {
    ...mapActions(["doUpdateDataModule1"]),
    handleClick(row) {
      this.$router.push({ path: "/LoanAuid/Examine", query: { row: row } });
    },
    getTableList() {
      /*this.Axios.get("https://5cf615c346583900149cb2b9.mockapi.io/Loans").then(
          res => {
            this.allTableData = res.data;
            this.setPaginations();
          }
        );*/

      // 获取列表 status=1&page=1&limit=5 sName sPhone getTenderAll /borrow/borrows?page=1&limit=5
      this.Axios.get(
        baseUrl.BASE_URL +
          `/getTenderAll?page=${this.paginations.page_index}&limit=${
            this.paginations.page_size
          }&moduleTypeId=2`
      )
        .then(res => {
          console.log(res);
          this.doUpdateDataModule1(res.data);
          console.log(this.getDataModule1);
          // 总页数
          this.paginations.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(page) {
      /*// 当前页
        let sortnum = this.paginations.page_size * (page - 1);
        let table = this.allTableData.filter((item, index) => {
          return index >= sortnum;
        });
        // 设置默认分页数据
        this.tableData = table.filter((item, index) => {
          return index < this.paginations.page_size;
        });*/

      // 当前页
      this.paginations.page_index = page;
      this.Axios.get(
        baseUrl.BASE_URL +
          `/getTenderAll?page=${this.paginations.page_index}&limit=${
            this.paginations.page_size
          }&moduleTypeId=1`
      )
        .then(res => {
          console.log(res);
          this.doUpdateDataModule1(res.data);
          // 总页数
          this.paginations.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      /*this.tableData = this.allTableData.filter((item, index) => {
          return index < page_size;
        });*/
      this.Axios.get(
        baseUrl.BASE_URL +
          `/getTenderAll?page=${this.paginations.page_index}&limit=${
            this.paginations.page_size
          }&moduleTypeId=1`
      )
        .then(res => {
          console.log(res);
          this.doUpdateDataModule1(res.data);
          // 总页数
          this.paginations.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
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
    serachShow() {
      let name, phone, status;
      this.paginations.page_index = 1;
      if (this.select == 1) {
        name = this.input5;
      } else {
        phone = this.input5;
      }
      status = this.modeSel;
      this.Axios.get(
        baseUrl.BASE_URL +
          `/getTenderAll?page=${this.paginations.page_index}&limit=${
            this.paginations.page_size
          }&moduleTypeId=1&name=${name}&phone=${phone}&status=${status}`
      )
        .then(res => {
          console.log(res);
          this.doUpdateDataModule1(res.data);
          // 总页数
          this.paginations.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    statusChange() {
      let name, phone, status;
      this.paginations.page_index = 1;
      status = this.modeSel;
      phone = this.input5;
      name = this.input5;
      this.Axios.get(
        baseUrl.BASE_URL +
          `/getTenderAll?page=${this.paginations.page_index}&limit=${
            this.paginations.page_size
          }&moduleTypeId=1&name=${name}&phone=${phone}&status=${status}`
      )
        .then(res => {
          console.log(res);
          this.doUpdateDataModule1(res.data);
          // 总页数
          this.paginations.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
table {
  border-spacing: 0;
}

.wrapper {
  width: 100%;
  margin: 0 auto;
}

.wrapper-content {
  width: 100%;
  margin: 0 auto;
}

/* 搜索 */
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

.export {
  display: inline-block;
  text-align: right;
  margin-top: 20px;
  margin-left: 90px;
}

.el-table {
  padding: 20px 20px 0 20px;
}

h2 {
  color: #fff;
  line-height: 40px;
  margin-left: 10px;
}

/* 分页 */
.pagination {
  text-align: right;
  padding-top: 20px;
  padding-right: 10px;
  padding-bottom: 10px;
}
</style>
