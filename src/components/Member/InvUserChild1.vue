<template>
  <el-container>
    <h1>InvUser</h1>
    <el-header>
      <el-row :gutter="15">
        <!-- 搜索框 -->
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-input
              size="mini"
              v-model="input_phone"
              suffix-icon="el-icon-search"
              placeholder="搜索手机/用户名"
            ></el-input>
          </div>
        </el-col>

        <el-col :span="3">
          <el-select size="mini" v-model="value" filterable placeholder="全部状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" :offset="16">
          <el-button plain size="mini">导出</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width:100%"
      >
        <el-table-column prop="id" label="用户编号" width="120"></el-table-column>
        <el-table-column prop="per_name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="per_phone" label="手机/用户名" width="120"></el-table-column>
        <el-table-column prop="real_name.real" label="实名状态" width="100"></el-table-column>
        <el-table-column prop="int_entitle" label="身份证号码" width="220"></el-table-column>
        <el-table-column prop="per_sex" label="性别" width="100"></el-table-column>
        <el-table-column prop="per_bCard" label="银行卡" width="200"></el-table-column>
        <el-table-column prop="sharer" label="推荐人" width="100"></el-table-column>
        <el-table-column prop="per_source" label="锁定状态" width="100"></el-table-column>
        <el-table-column fixed prop="reg_time" label="注册时间" width="220"></el-table-column>
        <el-table-column fixed prop="register" label="最近登录" width="220"></el-table-column>
        <el-table-column fixed prop="sharer" label="用户来源" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="update(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-pagination
      background
      layout="total,sizes,prev, pager, next"
      :page-sizes="[5, 8, 10, 20, 50]"
      :page-size="pagesize"
      :current-page="currentPage"
      @size-change="handleSizeChange"
      @current-change="current_change"
      :total="total"
    ></el-pagination>
  </el-container>
</template>

<script>
export default {
  name: "InvUser",
  components: {},

  data() {
    return {
      input1: "",
      info: "",
      input2: "",
      isNotChild: true,
      input_phone: "",
      currentPage: 1,
      pagesize: 5,
      total: 0,
      options: [
        {
          value: "选项1",
          label: "锁定"
        },
        {
          value: "选项2",
          label: "正常"
        }
      ],
      value: "",

      tableData: [],
      rows: {}
    };
  },

  // axios
  created() {
    this.Axios.get("http://rap2api.taobao.org/app/mock/177576/user")
      .then(response => {
        let arrList = response.data.datas.data;
        this.tableData = arrList;
        this.total = this.tableData.length;
        console.log(this.tableData);
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    handleClick: function(row) {
      window.sessionStorage.setItem("rows", JSON.stringify(row));
      this.$router.push("/inv_update");
    },
    update(row) {
      window.sessionStorage.setItem("rows", JSON.stringify(row));
      this.$router.push("/inv_pwd");
    },

    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
    }
  }
};
</script>

<style scoped>
</style>
